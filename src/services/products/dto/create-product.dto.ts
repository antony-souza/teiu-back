import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @Transform(({ value }) =>
    parseFloat(value.replace(/\./g, '').replace(',', '.')),
  )
  @IsNumber()
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

  image_url_string?: string;

  image_url?: Express.Multer.File;
}
