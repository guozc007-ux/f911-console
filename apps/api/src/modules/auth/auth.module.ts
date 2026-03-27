import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAuthStrategy } from './jwt-auth.strategy'
import { User } from '../../entities/user.entity'
import { Captcha } from '../../entities/captcha.entity'
import { AdminSession } from '../../entities/admin-session.entity'
import { jwtConfig } from '../../config/jwt.config'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Captcha, AdminSession]),
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    } as never),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
