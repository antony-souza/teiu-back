import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/repositories/product.repository';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';
import { IProductCreated } from 'src/interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    private productRepository: ProductRepository,
    private readonly UploadFileFactoryService: UploadFileFactoryService


  ) { }

  async create(dto: CreateProductDto): Promise<IProductCreated> {
    const existingProduct = this.productRepository.checkProductByIdCount(dto.id)

    if (existingProduct) {
      throw new ConflictException('Product already exist!')
    }

    let url = ''
    if (dto.image_url) {
      url = await this.UploadFileFactoryService.upload(dto.image_url)
    }

    dto.image_url_string = url

    return this.productRepository.createProduct(dto)

  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
