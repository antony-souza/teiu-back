import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { environment } from 'environment/environment';

@Injectable()
export class AuthJwtService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: Users): string {
    const payload = {
      id: user.id,
    };
    return this.jwtService.sign(payload, { secret: environment.secreatKey });
  }

  verifyToken(token: string): Users {
    try {
      return this.jwtService.verify(token, { secret: environment.secreatKey });
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }

  getToken(authorizationHeader: string): string {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const [type, token] = authorizationHeader.split(' ') ?? [];
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Tipo de token inválido ou token não fornecido',
      );
    }
    return token;
  }
}
