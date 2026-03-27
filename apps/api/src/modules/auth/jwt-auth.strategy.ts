import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { jwtConfig } from '../../config/jwt.config'
import { User } from '../../entities/user.entity'
import { AdminSession } from '../../entities/admin-session.entity'

type JwtPayload = {
  sub: number
  account?: string
}

type LoginUser = {
  userId: number
  account: string
  role: number
  nickName?: string
}

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AdminSession)
    private readonly adminSessionRepository: Repository<AdminSession>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: JwtPayload): Promise<LoginUser> {
    if (!payload?.sub) {
      throw new UnauthorizedException('未登录或登录已过期')
    }

    const authorization = req.headers.authorization || ''
    const token = authorization.startsWith('Bearer ') ? authorization.substring(7) : ''

    if (!token) {
      throw new UnauthorizedException('未登录或登录已过期')
    }

    const session = await this.adminSessionRepository.findOne({
      where: {
        token,
        userId: payload.sub,
      },
    })

    if (!session || session.expireTime <= Date.now()) {
      throw new UnauthorizedException('未登录或登录已过期')
    }

    const user = await this.userRepository.findOne({ where: { userId: payload.sub } })

    if (!user) {
      throw new UnauthorizedException('用户不存在')
    }

    if (user.status !== 1) {
      throw new UnauthorizedException('账号已被禁用')
    }

    return {
      userId: user.userId,
      account: user.account,
      role: user.role,
      nickName: user.nickname,
    }
  }
}
