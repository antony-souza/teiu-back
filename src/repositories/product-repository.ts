import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductRepository {
    async findProductById(id: number) {
        return {
            message: "teste"
        };
    }
}