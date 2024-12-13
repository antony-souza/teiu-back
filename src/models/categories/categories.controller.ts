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
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles, RolesGuard } from 'src/guards/role-guards.service';
import { JwtAuthGuard } from 'src/guards/jwt-guards.service';

@Controller('/categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('DEV', 'ADMIN', 'USER')
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

  @Get('/all/:id')
  findAllByStoreId(@Param('id') storeId: string) {
    const dto: UpdateCategoryDto = {
      store_id: storeId,
    };
    return this.categoriesService.getAllCategoriesByStoreId(dto);
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