import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { environment } from './environment/environment-prod';
import { PrismaClient, Role, Users } from '@prisma/client';

export class PrismaInitialService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

async function main() {
  const prismaService = new PrismaInitialService();

  const userDefault: Users = {
    name: environment.DEFAULT_USER_NAME,
    email: environment.DEFAULT_USER_EMAIL,
    role: environment.DEFAULT_USER_ROLE as Role,
    image_url: environment.DEFAULT_USER_IMAGE_URL,
    id: '1',
    password: '',
    store_id: null,
    createdAt: undefined,
    enabled: true,
    updatedAt: undefined,
  };

  const checkIfExistUser = await prismaService.users.count({
    where: {
      name: userDefault.name,
      email: userDefault.email,
      role: userDefault.role,
    },
  });

  if (!checkIfExistUser) {
    const hashedPassword = await bcrypt.hash(
      environment.DEFAULT_USER_PASSWORD,
      11,
    );

    await prismaService.users.create({
      data: {
        ...userDefault,
        password: hashedPassword,
      },
    });

    new Logger().debug('User Created With Success', 'Populate');
    return;
  }

  new Logger().debug('User Already Exist', 'Populate');
}

main();
