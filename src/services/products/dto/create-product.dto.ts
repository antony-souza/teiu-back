import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    id: string

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    description: string;

    @IsNumber()
    quantity: number;

    @IsString()
    store_id: string;

    @IsString()
    category_id: string;

    image_url_string: string;

    image_url?: Express.Multer.File;
}
