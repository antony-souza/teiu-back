import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Users } from '@prisma/client';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthJwtService } from 'src/middleware/jwt/jwt-auth.service';
import { AuthRepository } from 'src/repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly AuthToken: AuthJwtService,
    private readonly authRepository: AuthRepository,
  ) {}
  async authUser(dto: CreateAuthDto) {
    const user = await this.authRepository.authUser(dto);

    if (!user) {
      throw new ConflictException('Invalid email or password');
    }

    if (
      !user.password ||
      !(await bcrypt.compare(dto.password, user.password))
    ) {
      throw new ConflictException('Password is incorrect');
    }

    const token: string = this.AuthToken.generateToken(user);

    return {
      token,
      message: 'User authenticated successfully!',
    };
  }

  async validateToken(dto: CreateAuthDto): Promise<Users> {
    const payload = this.AuthToken.verifyToken(dto.token);
    const id: Partial<CreateAuthDto> = { id: payload.id };
    const user = await this.authRepository.findUnique(id);

    return user;
  }
}
