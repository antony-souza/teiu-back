import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SalesRepository } from 'src/repositories/sales.repository';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SocketGateway } from 'src/gateway/socket.gateway';

@Injectable()
export class SalesService {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly gatewayService: SocketGateway,
  ) {}

  async createSales(dto: CreateSaleDto) {
    const checkQuantityStockProduct = await this.salesRepository.checkStock(
      dto.product_id,
    );

    if (!checkQuantityStockProduct) {
      throw new NotFoundException('Product not found');
    }

    if (checkQuantityStockProduct.quantity < dto.quantity_sold) {
      throw new NotFoundException('Insufficient stock');
    }

    const totalBilled =
      Number(checkQuantityStockProduct.price) * dto.quantity_sold;

    const response = await this.salesRepository.createSale({
      ...dto,
      total_billed: totalBilled,
    });

    await this.salesRepository.updateStock(dto.product_id, dto.quantity_sold);

    const allSales = await this.salesRepository.findAllSalesByProductStore(
      dto.store_id,
    );

    this.gatewayService.sendSalesProducts(dto.store_id, allSales);

    return response;
  }

  async findAllSalesByProductStore(dto: UpdateSaleDto) {
    const response = await this.salesRepository.findAllSalesByProductStore(
      dto.store_id,
    );

    if (!response) {
      throw new NotFoundException('Sales not found');
    }

    return response;
  }

  async findAllSalesByStore(dto: UpdateSaleDto) {
    const response = await this.salesRepository.findAllSalesByStore(
      dto.store_id,
    );

    if (!response) {
      throw new NotFoundException('Sales not found');
    }
    return response;
  }
}
