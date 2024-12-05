import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const existingStore = await this.storeRepository.checkStoreBy(dto.id);

    if (!existingStore) {
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
    const response = this.storeRepository.findAllStore();

    if (!response) {
      throw new NotFoundException('No stores found');
    }

    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  async update(dto: UpdateStoreDto) {
    const existingStore = await this.storeRepository.checkStoreBy(dto.id);

    if (!existingStore) {
      throw new ConflictException('Store does not exist');
    }

    let url = existingStore.image_url;

    if (dto.image_url) {
      url = await this.uploadFileFactoryService.upload(dto.image_url);
    }

    dto.image_url_string = await url;

    return this.storeRepository.updateStore(dto);
  }

  remove(id: string) {
    const existingStore = this.storeRepository.checkStoreBy(id);

    if (!existingStore) {
      throw new NotFoundException('Store does not exist');
    }

    const response = this.storeRepository.deleteStore(id);

    if (!response) {
      throw new NotFoundException('Store not deleted');
    }

    return {
      message: 'Store deleted successfully',
    };
  }
}
