import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/create')
  @UseInterceptors(FileInterceptor("image_url"))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image_url: Express.Multer.File,
  ) {
    return this.userService.create({
      ...createUserDto,
      image_url: image_url
    });
  }

  @Get('/all/enable/true')
  getAllUsersEnableTrue() {
    return this.userService.getAllUsersEnableTrue();
  }

  @Get('/all/enable/all')
  getAllUsersEnableAll() {
    return this.userService.getAllUsers();
  }

  @Put("/update/:id")
  @UseInterceptors(FileInterceptor("image_url"))
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image_url: Express.Multer.File,
  ) {
    return this.userService.update({
      ...updateUserDto,
      id: id,
      image_url: image_url
    });
  }

  @Delete('/deleteup/:id')
  deleteEnable(@Param('id') id: string) {

    return this.userService.deleteEnable(id);
  }

  @Delete('/delete/:id')
  deletePermanent(@Param('id') id: string) {

    return this.userService.deletePermanent(id);
  }

}
