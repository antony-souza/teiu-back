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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image_url'))
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image_url: Express.Multer.File,
  ) {
    return this.productsService.createProduct({
      ...createProductDto,
      image_url: image_url,
    });
  }

  @Get('/all')
  findAll() {
    return this.productsService.findAllProducts();
  }

  @Get('/store/all/:id')
  findAllByStoreId(@Param('id') storeId: string) {
    const dto: UpdateProductDto = {
      store_id: storeId,
    };
    return this.productsService.findAllProductsByStoreId(dto);
  }

  @Put('/update/:id')
  @UseInterceptors(FileInterceptor('image_url'))
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image_url: Express.Multer.File,
  ) {
    return this.productsService.update({
      ...updateProductDto,
      id: id,
      image_url: image_url,
    });
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    const dto: UpdateProductDto = {
      id: id,
    };
    return this.productsService.remove(dto);
  }
}
