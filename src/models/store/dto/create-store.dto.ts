import { IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  user_id: string;

  image_url_string?: string;

  image_url?: Express.Multer.File;
}
