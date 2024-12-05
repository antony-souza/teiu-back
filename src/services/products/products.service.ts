import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/repositories/product.repository';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';

@Injectable()
export class ProductsService {
  constructor(
    private productRepository: ProductRepository,
    private readonly UploadFileFactoryService: UploadFileFactoryService,
  ) {}

  async createProduct(dto: CreateProductDto) {
    const existingProduct = await this.productRepository.checkProductByIdCount(
      dto.name,
    );

    if (existingProduct > 0) {
      throw new ConflictException('Product already exist!');
    }

    let url = '';
    if (dto.image_url) {
      url = await this.UploadFileFactoryService.upload(dto.image_url);
    }

    dto.image_url_string = await url;

    return this.productRepository.createProduct(dto);
  }

  findAll() {
    return `This action returns all products`;
  }

  update(updateProductDto: UpdateProductDto) {
    return `This action updates a #product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
