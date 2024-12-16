import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  product_id?: string;

  @IsString()
  store_id: string;

  @IsOptional()
  image_url_string?: string;

  @IsOptional()
  image_url?: Express.Multer.File;
}
