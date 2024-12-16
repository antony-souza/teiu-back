import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { environment } from 'environment/environment';

@Injectable()
export class AuthJwtService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: User): string {
    const payload = {
      id: user.id,
    };
    return this.jwtService.sign(payload, {
      secret: environment.secreatKey,
      expiresIn: '1h',
    });
  }

  verifyToken(token: string): User {
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

    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Tipo de token inválido ou token não fornecido',
      );
    }
    return token;
  }
}
