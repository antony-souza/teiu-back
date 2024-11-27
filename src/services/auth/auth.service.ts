import { ConflictException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { Users } from "@prisma/client";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { PrismaService } from "src/provider/prisma/prisma-client";
import { AuthJwtService } from "src/middleware/jwt/jwt-auth.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly AuthToken: AuthJwtService,
  ) {}
  async authUser(auth: CreateAuthDto) {
    const user = await this.prisma.users.findFirst({
      where: { email: auth.email },
    });

    if (!user || !(await bcrypt.compare(auth.password, user.password))) {
      throw new ConflictException("Invalid email or password");
    }
    const token = this.AuthToken.generateToken(user);

    return {
      token,
      message: "User authenticated successfully!",
    };
  }
  async validateToken(token: string): Promise<Users> {
    const payload = this.AuthToken.verifyToken(token);
    const user = await this.prisma.users.findUnique({
      where: { id: payload.id },
    });
    return user;
  }
}