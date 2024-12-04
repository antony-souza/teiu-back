import { IsOptional, IsString } from "class-validator";

export class CreateStoreDto {

    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    user_id: string;

    @IsString()
    name: string;

    image_url_string?: string;

    image_url?: Express.Multer.File
}
