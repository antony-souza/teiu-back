import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/repositories/user.repository';
import GeneratePasswordService from 'src/utils/generate-password.service';
import { IUser } from 'src/interfaces/user.interface';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly generatePasswordService: GeneratePasswordService,
    private readonly uploadFileFactoryService: UploadFileFactoryService,
  ) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.userRepository.checkUserByEmail(dto.email);
    console.log(existingUser);

    if (existingUser > 0) {
      throw new UnauthorizedException('User already exists');
    }

    const hashPassword = await this.generatePasswordService.createHash(
      dto.password,
    );

    let url = '';
    if (dto.image_url) {
      url = await this.uploadFileFactoryService.upload(dto.image_url);
    }

    dto.image_url_string = await url;

    const response = await this.userRepository.create({
      ...dto,
      password: hashPassword,
    });

    if (!response) {
      throw new NotFoundException('User not created');
    }

    return {
      message: 'User created successfully',
      data: response,
    };
  }

  async getAllUsersEnableTrue(): Promise<IUser[]> {
    const response = await this.userRepository.getAllUsersEnableTrue();

    if (response.length < 1) {
      throw new NotFoundException('No enable:true users found');
    }

    return response;
  }

  async getAllUsers() {
    const response = await this.userRepository.getAllUsers();

    if (!response) {
      throw new NotFoundException('No all users found');
    }

    return response;
  }

  async getUserEnableByStore(id: string) {
    const response = await this.userRepository.getUserEnableByStore(id);

    if (!response) {
      throw new NotFoundException('Users not found');
    }

    return response;
  }

  async update(updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.checkUserById(
      updateUserDto.id,
    );

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    let hashPassword = updateUserDto.password;

    if (updateUserDto.password) {
      hashPassword = await this.generatePasswordService.createHash(
        updateUserDto.password,
      );
    }

    let url = await existingUser.image_url;

    if (updateUserDto.image_url) {
      url = await this.uploadFileFactoryService.upload(updateUserDto.image_url);
    }

    updateUserDto.image_url_string = await url;

    const response = await this.userRepository.update({
      ...updateUserDto,
      password: hashPassword,
    });

    return response;
  }

  async deleteEnable(id: string): Promise<IUser> {
    const existingUser = await this.userRepository.checkUserByIdCount(id);

    if (existingUser < 1) {
      throw new NotFoundException('User not found');
    }

    const response = await this.userRepository.deleteEnable(id);

    response.message = 'User enable:false successfully';

    return response;
  }

  async deletePermanent(id: string): Promise<IUser> {
    const existingUser = await this.userRepository.checkUserByIdCount(id);

    if (existingUser < 1) {
      throw new NotFoundException('User not found');
    }

    const response = await this.userRepository.deletePermanent(id);

    response.message = 'User deleted successfully';

    return response;
  }
}
