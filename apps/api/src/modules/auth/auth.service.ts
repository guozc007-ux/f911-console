import { randomBytes, randomInt } from 'node:crypto'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { User } from '../../entities/user.entity'
import { Captcha } from '../../entities/captcha.entity'
import { AdminSession } from '../../entities/admin-session.entity'
import { BusinessCode } from '../../responses'
import { BusinessException } from '../../common/filters/business.exception'
import appConfig from '../../config/app.config'
import { jwtConfig } from '../../config/jwt.config'

type SafeUser = Omit<User, 'deletedAt'>
type LoginResult = {
  token: string
  expireTime: number
  user: SafeUser
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Captcha)
    private readonly captchaRepository: Repository<Captcha>,
    @InjectRepository(AdminSession)
    private readonly adminSessionRepository: Repository<AdminSession>,
    private readonly jwtService: JwtService,
  ) {}

  async generateCaptcha(): Promise<{ uniqId: string; image: string; expireTime: number }> {
    const uniqId = `${Date.now()}_${randomBytes(8).toString('hex')}`
    const code = Array.from({ length: 4 }, () => String(randomInt(0, 10))).join('')
    const expireTime = Date.now() + appConfig.captcha.expireSeconds * 1000
    const captcha = this.captchaRepository.create({
      uniqId,
      code,
      expireTime,
      used: 0,
    })

    await this.captchaRepository.save(captcha)

    const image = this.renderCaptchaImage(code)
    return {
      uniqId,
      image,
      expireTime,
    }
  }

  async verifyCaptcha(uniqId: string, code: string): Promise<void> {
    if (!uniqId || !code) {
      throw new BusinessException(BusinessCode.CAPTCHA_REQUIRED)
    }

    const captcha = await this.captchaRepository.findOne({ where: { uniqId } })
    if (!captcha) {
      throw new BusinessException(BusinessCode.CAPTCHA_ERROR)
    }

    if (captcha.used === 1) {
      throw new BusinessException(BusinessCode.CAPTCHA_ERROR)
    }

    if (captcha.expireTime <= Date.now()) {
      throw new BusinessException(BusinessCode.CAPTCHA_EXPIRED)
    }

    if (captcha.code !== String(code).trim()) {
      throw new BusinessException(BusinessCode.CAPTCHA_ERROR)
    }

    captcha.used = 1
    await this.captchaRepository.save(captcha)
  }

  async login(account: string, password: string, captcha: string, uniqId: string): Promise<LoginResult> {
    await this.verifyCaptcha(uniqId, captcha)

    const user = await this.userRepository.findOne({
      where: { account },
    })

    if (!user) {
      throw new BusinessException(BusinessCode.USER_NOT_FOUND)
    }

    if (user.status !== 1) {
      throw new BusinessException(BusinessCode.USER_DISABLED)
    }

    const isMatch = await compare(password, user.password)
    if (!isMatch) {
      throw new BusinessException(BusinessCode.PARAM_ERROR, '账号或密码错误')
    }

    const payload = {
      sub: user.userId,
      account: user.account,
      role: user.role,
    }
    const token = this.jwtService.sign(payload)
    const expireTime = this.getJwtExpireTimestamp(jwtConfig.expiresIn)

    const adminSession = this.adminSessionRepository.create({
      userId: user.userId,
      token,
      expireTime,
      ip: '',
      userAgent: '',
    })

    await this.adminSessionRepository.save(adminSession)

    return {
      token,
      expireTime,
      user: this.toSafeUser(user),
    }
  }

  async logout(token: string): Promise<void> {
    if (!token) {
      return
    }

    const adminSession = await this.adminSessionRepository.findOne({ where: { token } })
    if (!adminSession) {
      return
    }

    await this.adminSessionRepository.softDelete(adminSession.id)
  }

  private getJwtExpireTimestamp(expiresIn = '365d'): number {
    const match = String(expiresIn).match(/^(\d+)([smhd])$/i)
    if (!match) {
      return Date.now() + Number.parseInt(String(expiresIn), 10) * 1000
    }

    const value = Number.parseInt(match[1], 10)
    const unit = match[2].toLowerCase()
    const unitMap = {
      s: 1,
      m: 60,
      h: 60 * 60,
      d: 24 * 60 * 60,
    }

    return Date.now() + value * (unitMap[unit as keyof typeof unitMap] || 24 * 60 * 60) * 1000
  }

  private renderCaptchaImage(code: string): string {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="140" height="48" viewBox="0 0 140 48">
        <rect width="140" height="48" fill="#f7f7f7"/>
        <text x="22" y="32" font-size="28" font-family="Arial, Helvetica, sans-serif" fill="#333" tracking="8">
          ${code}
        </text>
      </svg>
    `
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
  }

  private toSafeUser(user: User): SafeUser {
    const { deletedAt, ...safe } = user
    return safe
  }
}
