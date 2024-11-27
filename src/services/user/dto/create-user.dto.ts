import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: string;

    @IsString()
    token?: string;
}
