import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const can = super.canActivate(context)
    return can as boolean | Promise<boolean>
  }

  handleRequest<TUser>(err: unknown, user: unknown): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('未登录或登录已过期')
    }

    return user as TUser
  }
}
