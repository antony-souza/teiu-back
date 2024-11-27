import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
  async create() {
    return "User created";
  }
}