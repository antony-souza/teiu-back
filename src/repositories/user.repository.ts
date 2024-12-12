import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { CreateUserDto } from 'src/services/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/services/user/dto/update-user.dto';

const cargoMap = {
  ADMIN: 'Gerente',
  DEV: 'Desenvolvedor',
  USER: 'Funcionário',
};

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async checkUserByEmail(email: string): Promise<number> {
    const query = await this.prismaService.users.count({
      where: {
        email: email,
      },
    });

    return query;
  }

  async checkUserByIdCount(id: string): Promise<number> {
    const query = await this.prismaService.users.count({
      where: {
        id: id,
      },
    });

    return query;
  }

  async checkUserById(id: string) {
    const query = await this.prismaService.users.findUnique({
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

  async getAllUsersEnableTrue(): Promise<IUser[]> {
    return await this.prismaService.users.findMany({
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
    const response = await this.prismaService.users.findMany({
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
        role: cargoMap[previousResponse.role],
      };
    });
    return result;
  }

  async getUserEnableByStore(id: string) {
    const response = await this.prismaService.users.findMany({
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
          role: cargoMap[previousResponse.role],
          store: checkStoreById.name,
        };
      }),
    );
    return result;
  }

  async create(dto: CreateUserDto) {
    const query = await this.prismaService.users.create({
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
    return await this.prismaService.users.update({
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
    return await this.prismaService.users.update({
      where: {
        id: id,
      },
      data: {
        enabled: false,
      },
    });
  }

  async deletePermanent(id: string): Promise<IUser> {
    return await this.prismaService.users.delete({
      where: {
        id: id,
      },
    });
  }
}
