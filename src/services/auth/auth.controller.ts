import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";

@Controller("")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/auth")
  async authUserController(@Body() auth: CreateAuthDto) {
    return this.authService.authUser(auth);
  }
}