import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from 'src/repositories/category.repository';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly UploadFileFactoryService: UploadFileFactoryService,
  ) {}

  async create(dto: CreateCategoryDto) {
    let url = '';

    if (dto.image_url) {
      url = await this.UploadFileFactoryService.upload(dto.image_url);
    }

    dto.image_url_string = await url;

    return await this.categoryRepository.createCategory(dto);
  }

  findAll() {
    const response = this.categoryRepository.findAllCategories();

    if (!response) {
      throw new NotFoundException('No categories found');
    }

    return response;
  }

  async update(dto: UpdateCategoryDto) {
    const existingCategory =
      await this.categoryRepository.checkCategoryByIdCount(dto.id);

    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    let url = existingCategory.image_url;

    if (dto.image_url) {
      url = await this.UploadFileFactoryService.upload(dto.image_url);
    }
    dto.image_url_string = await url;

    return await this.categoryRepository.updateCategory(dto);
  }

  remove(id: string) {
    const existingCategory = this.categoryRepository.checkCategoryByIdCount(id);

    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    return this.categoryRepository.removeCategory(id);
  }
}
