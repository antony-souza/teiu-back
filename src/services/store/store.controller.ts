import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post('/create')
  @UseInterceptors(FileInterceptor("image_url"))
  create(
    @Body() createStoreDto: CreateStoreDto,
    @UploadedFile() image_url: Express.Multer.File,
  ) {
    return this.storeService.create({
      ...createStoreDto,
      image_url: image_url
    });
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
