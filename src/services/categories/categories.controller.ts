import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image_url'))
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() image_url: Express.Multer.File,
  ) {
    return this.categoriesService.create({
      ...createCategoryDto,
      image_url: image_url,
    });
  }

  @Get('/all')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Put('/update/:id')
  @UseInterceptors(FileInterceptor('image_url'))
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() image_url: Express.Multer.File,
  ) {
    const dto: UpdateCategoryDto = {
      ...updateCategoryDto,
      id: id,
      image_url: image_url,
    };
    return this.categoriesService.update(dto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
