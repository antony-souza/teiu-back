import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateAuthDto {

  @IsEmail()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;

  id?: string;
  token?: string;
}