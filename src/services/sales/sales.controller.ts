import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('/sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('/create')
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createSales(createSaleDto);
  }

  @Get('/all/:id')
  findAllSalesForChart(@Param('id') id: string) {
    const dto: UpdateSaleDto = {
      store_id: id,
    };
    return this.salesService.findAllSalesByProductStore(dto);
  }
}
