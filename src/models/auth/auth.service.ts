import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthJwtService } from 'src/middleware/jwt/jwt-auth.service';
import { AuthRepository } from 'src/repositories/auth.repository';
import { User } from '@prisma/client';
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

    const token: string = await this.AuthToken.generateToken(user);

    const response = {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        image_url: user.image_url,
        store_id: user.store_id,
        role: user.role,
      },
    };

    return response;
  }

  async validateToken(dto: CreateAuthDto): Promise<User> {
    const payload = this.AuthToken.verifyToken(dto.token);
    const id: Partial<CreateAuthDto> = { id: payload.id };
    const user = await this.authRepository.findUnique(id);

    return user;
  }
}
