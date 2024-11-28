import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/repositories/user.repository';
import GeneratePasswordService from 'src/utils/generate-password.service';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly generatePasswordService: GeneratePasswordService,
  ) { }

  async create(dto: CreateUserDto) {

    const existingUser = await this.userRepository.checkUserByEmail(dto.email);
    console.log(existingUser)

    if (existingUser > 0) {
      throw new UnauthorizedException('User already exists');
    }


    const hashPassword = await this.generatePasswordService.createHash(
      dto.password,
    );

    return await this.userRepository.create({
      ...dto,
      password: hashPassword,
    });
  }

  findAll() {
    return this.userRepository.getAllUsers();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
