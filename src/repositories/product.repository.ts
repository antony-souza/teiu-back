import { Injectable } from "@nestjs/common";
import { IProductCreated } from "src/interfaces/product.interface";
import { PrismaService } from "src/provider/prisma/prisma-client";
import { CreateProductDto } from "src/services/products/dto/create-product.dto";
import UploadFileFactoryService from "src/utils/uploads/upload-file.service";

@Injectable()
export class ProductRepository {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly UploadFileFactoryService: UploadFileFactoryService


    ) { }

    async checkProductByIdCount(id: string): Promise<number> {
        return await this.prismaService.products.count({
            where: {
                id: id
            }
        })
    }

    async createProduct(dto: CreateProductDto): Promise<IProductCreated> {

        return await this.prismaService.products.create({
            data: {
                name: dto.name,
                price: dto.price,
                description: dto.description,
                image_url: dto.image_url_string,
                quantity: dto.quantity,
                store_id: dto.store_id,
                category_id: dto.category_id
            }
        })
    }

}