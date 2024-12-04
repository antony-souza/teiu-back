import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  quantity_sold: number;

  @IsString()
  product_id: string;

  @IsString()
  store_id: string;

  @IsString()
  user_id: string;
}
