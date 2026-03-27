import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

type LoginBody = {
  account: string
  password: string
  captcha: string
  uniqId: string
}

type LogoutBody = {
  token: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('ping')
  ping() {
    return 'auth ok'
  }

  @Get('captcha')
  generateCaptcha() {
    return this.authService.generateCaptcha()
  }

  @Post('login')
  login(@Body() body: LoginBody) {
    return this.authService.login(body.account, body.password, body.captcha, body.uniqId)
  }

  @Post('logout')
  logout(@Body() body: LogoutBody) {
    return this.authService.logout(body.token)
  }
}
