import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreRepository } from 'src/repositories/store.repository';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';

@Injectable()
export class StoreService {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly uploadFileFactoryService: UploadFileFactoryService,
  ) {}

  async create(dto: CreateStoreDto) {
    const existingStore = await this.storeRepository.checkStoreByIdCount(
      dto.id,
    );

    if (existingStore > 0) {
      throw new ConflictException('Store already exists');
    }

    let url = '';
    if (dto.image_url) {
      url = await this.uploadFileFactoryService.upload(dto.image_url);
    }

    dto.image_url_string = await url;

    return this.storeRepository.createStore(dto);
  }

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
