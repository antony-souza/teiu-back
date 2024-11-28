import { Role } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: Role;

    @IsOptional()
    image_url?: Express.Multer.File
}
