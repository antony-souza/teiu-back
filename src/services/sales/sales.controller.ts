import { Controller, Get, Post, Body } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('/sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('/create')
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createSales(createSaleDto);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }
}
