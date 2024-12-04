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
  findAll(@Param('id') UpdateSaleDto: UpdateSaleDto) {
    const dto = {
      store_id: UpdateSaleDto.store_id,
    };
    return this.salesService.findAllSalesByStore(dto);
  }
}
