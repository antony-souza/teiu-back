import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { JwtAuthGuard } from 'src/guards/jwt-guards.service';
import { Roles, RolesGuard } from 'src/guards/role-guards.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Roles('Desenvolvedor', 'Gerente', 'SubGerente', 'Vendedor')
  @Post('/create')
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createSales(createSaleDto);
  }

  @Roles('Desenvolvedor', 'Gerente', 'SubGerente', 'Vendedor')
  @Get('/all/:id')
  findAllSalesForChart(@Param('id') id: string) {
    const dto: UpdateSaleDto = {
      store_id: id,
    };
    return this.salesService.findAllSalesByProductStore(dto);
  }

  @Roles('Desenvolvedor', 'Gerente', 'SubGerente', 'Vendedor')
  @Get('/store/all/:id')
  findAllSales(@Param('id') id: string) {
    const dto: UpdateSaleDto = {
      store_id: id,
    };
    return this.salesService.findAllSalesByStore(dto);
  }
}
