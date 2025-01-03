import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';
import { CreateUserDto } from 'src/models/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/models/user/dto/update-user.dto';
import { PrismaService } from 'src/provider/prisma/prisma-client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async checkUserByEmail(email: string): Promise<number> {
    const query = await this.prismaService.user.count({
      where: {
        email: email,
      },
    });

    return query;
  }

  async checkUserByIdCount(id: string): Promise<number> {
    const query = await this.prismaService.user.count({
      where: {
        id: id,
      },
    });

    return query;
  }

  async checkUserById(id: string) {
    const query = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        role: true,
      },
    });

    return query;
  }

  getUserByIdRole(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        role: true,
      },
    });
  }

  async getAllUsersEnableTrue(): Promise<IUser[]> {
    return await this.prismaService.user.findMany({
      where: {
        enabled: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        role: true,
      },
    });
  }

  async getAllUsers() {
    const response = await this.prismaService.user.findMany({
      select: {
        id: true,
        enabled: true,
        name: true,
        email: true,
        image_url: true,
        store_id: true,
        role: true,
      },
    });

    const result = response.map((previousResponse) => {
      return {
        id: previousResponse.id,
        enabled: previousResponse.enabled,
        name: previousResponse.name,
        email: previousResponse.email,
        image_url: previousResponse.image_url,
        role: previousResponse.role,
      };
    });
    return result;
  }

  async getUserEnableByStore(id: string) {
    const response = await this.prismaService.user.findMany({
      where: {
        store_id: id,
        enabled: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        role: true,
        Store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const result = await Promise.all(
      response.map(async (previousResponse) => {
        const checkStoreById = await this.prismaService.store.findUnique({
          where: {
            id: previousResponse.Store.id,
          },
          select: {
            name: true,
          },
        });
        return {
          id: previousResponse.id,
          name: previousResponse.name,
          email: previousResponse.email,
          image_url: previousResponse.image_url,
          role: previousResponse.role,
          store: checkStoreById.name,
        };
      }),
    );
    return result;
  }

  async create(dto: CreateUserDto) {
    const query = await this.prismaService.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        role: dto.role,
        store_id: dto.store_id,
        image_url: dto.image_url_string,
        password: dto.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        role: true,
      },
    });
    return query;
  }

  async update(dto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        email: dto.email,
        role: dto.role,
        image_url: dto.image_url_string,
        password: dto.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        role: true,
      },
    });
  }

  async deleteEnable(id: string): Promise<IUser> {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        enabled: false,
      },
    });
  }

  async deletePermanent(id: string): Promise<IUser> {
    return await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
