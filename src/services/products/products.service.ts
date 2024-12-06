import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      dto.id,
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

  async findAllProducts() {
    const response = await this.productRepository.findAllProducts();

    if (!response) {
      throw new NotFoundException('No products found!');
    }

    return response;
  }

  async findAllProductsByStoreId(dto: UpdateProductDto) {
    const response = await this.productRepository.findAllProductsByStoreId(
      dto.store_id,
    );

    if (!response) {
      throw new NotFoundException('No products found!');
    }

    return response;
  }

  async update(dto: UpdateProductDto) {
    const existingProduct = await this.productRepository.checkProductById(
      dto.id,
    );

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    let url = existingProduct.image_url;

    if (dto.image_url) {
      url = await this.UploadFileFactoryService.upload(dto.image_url);
    }

    dto.image_url_string = await url;

    return this.productRepository.updateProduct(dto);
  }

  remove(dto: UpdateProductDto) {
    const existingProduct = this.productRepository.checkProductById(dto.id);

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    return this.productRepository.removeProduct(dto.id);
  }
}
