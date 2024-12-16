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
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwt-guards.service';
import { Roles, RolesGuard } from 'src/guards/role-guards.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Desenvolvedor', 'Gerente', 'SubGerente')
@Controller('/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image_url'))
  create(
    @Body() createStoreDto: CreateStoreDto,
    @UploadedFile() image_url: Express.Multer.File,
  ) {
    return this.storeService.create({
      ...createStoreDto,
      image_url: image_url,
    });
  }

  @Get('/all')
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Put('/update/:id')
  @UseInterceptors(FileInterceptor('image_url'))
  update(
    @Param('id') id: string,
    @Body()
    updateStoreDto: UpdateStoreDto,
    @UploadedFile() image_url: Express.Multer.File,
  ) {
    return this.storeService.update({
      ...updateStoreDto,
      id: id,
      image_url: image_url,
    });
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(id);
  }
}
