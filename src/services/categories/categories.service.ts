import { ConflictException, Injectable } from '@nestjs/common';
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
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
