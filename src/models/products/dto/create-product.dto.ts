import { Transform } from 'class-transformer';
import { IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsDecimal()
  price: number;

  @IsString()
  description: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  quantity: number;

  @IsString()
  store_id: string;

  @IsString()
  @IsOptional()
  category_id?: string;

  @IsOptional()
  image_url_string?: string;

  @IsOptional()
  image_url?: Express.Multer.File;
}
