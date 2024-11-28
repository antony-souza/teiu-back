import { Injectable } from "@nestjs/common";
import { Users } from "@prisma/client";
import { PostgresService } from "src/provider/postgres/postgres-client";
import { PrismaService } from "src/provider/prisma/prisma-client";
import { UpdateAuthDto } from "src/services/auth/dto/update-auth.dto";
import { CreateUserDto } from "src/services/user/dto/create-user.dto";
import { UpdateUserDto } from "src/services/user/dto/update-user.dto";
import GeneratePasswordService from "src/utils/generate-password.service";
import UploadFileFactoryService from "src/utils/uploads/upload-file.service";

@Injectable()
export class UserRepository {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly prismaService: PrismaService,
    private readonly generatePasswordService: GeneratePasswordService,
    private readonly UploadFileFactoryService: UploadFileFactoryService,
  ) { }

  async checkUserByEmail(email: string): Promise<number> {
    const query = await this.postgresService.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )
    return query.rowCount
  }

  async getAllUsers(): Promise<Users[]> {
    const query = await this.postgresService.query(
      'SELECT id,name,email,image_url,role FROM users'
    )
    return query.rows
  }

  async create(dto: CreateUserDto) {
    let url = dto.image_url
      ? await this.UploadFileFactoryService.upload(dto.image_url) : '';
    const query = await this.prismaService.users.create({
      data: {
        name: dto.name,
        email: dto.email,
        role: dto.role,
        image_url: url,
        password: dto.password
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        role: true
      }
    })
    return query
  }
}