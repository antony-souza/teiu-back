import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthJwtService } from 'src/middleware/jwt/jwt-auth.service';
import { UserService } from 'src/models/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private authJwtService: AuthJwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = this.authJwtService.getToken(authorizationHeader);
    const getUserIdFromToken = this.authJwtService.verifyToken(token);

    const user = await this.userService.getUserByIdRole(getUserIdFromToken.id);
    if (!user) {
      throw new UnauthorizedException(
        'Usuário não autenticado ou token inválido',
      );
    }

    request.user = {
      token: token,
      role: user.role,
    };

    return true;
  }
}
