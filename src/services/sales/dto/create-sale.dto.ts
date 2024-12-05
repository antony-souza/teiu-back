import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  @IsOptional()
  id?: string;

  @Transform(({ value }) =>
    parseFloat(value.replace(/\./g, '').replace(',', '.')),
  )
  @IsNumber()
  @IsOptional()
  total_billed?: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  quantity_sold: number;

  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  store_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
