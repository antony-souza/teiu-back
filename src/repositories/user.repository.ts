import { Injectable } from "@nestjs/common";
import { IUser } from "src/interfaces/user.interface";
import { PrismaService } from "src/provider/prisma/prisma-client";
import { CreateUserDto } from "src/services/user/dto/create-user.dto";
import { UpdateUserDto } from "src/services/user/dto/update-user.dto";
import UploadFileFactoryService from "src/utils/uploads/upload-file.service";

@Injectable()
export class UserRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly UploadFileFactoryService: UploadFileFactoryService,
  ) { }

  async checkUserByEmail(email: string): Promise<number> {
    const query = await this.prismaService.users.count({
      where: {
        email: email
      }
    })

    return query
  }

  async checkUserByIdCount(id: string): Promise<number> {
    const query = await this.prismaService.users.count({
      where: {
        id: id
      }
    })

    return query
  }

  async checkUserById(id: string): Promise<IUser> {
    const query = await this.prismaService.users.findUnique({
      where: {
        id: id
      }
    })

    return query
  }

  async getAllUsersEnableTrue(): Promise<IUser[]> {
    return await this.prismaService.users.findMany({
      where: {
        enabled: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        role: true
      }
    })
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.prismaService.users.findMany({
      select: {
        id: true,
        enabled: true,
        name: true,
        email: true,
        image_url: true,
        role: true
      }
    })
  }

  async create(dto: CreateUserDto): Promise<IUser> {
    let url = ''
    if (dto.image_url) {
      url = await this.UploadFileFactoryService.upload(dto.image_url)
    }
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

  async update(dto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.checkUserById(dto.id);

    let url = existingUser.image_url
    if (dto.image_url) {
      url = await this.UploadFileFactoryService.upload(dto.image_url)
    }
    return await this.prismaService.users.update({
      where: {
        id: dto.id
      },
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
  }

  async deleteEnable(id: string): Promise<IUser> {
    return await this.prismaService.users.update({
      where: {
        id: id
      },
      data: {
        enabled: false
      }
    })
  }

  async deletePermanent(id: string): Promise<IUser> {
    return await this.prismaService.users.delete({
      where: {
        id: id
      }
    })
  }

}