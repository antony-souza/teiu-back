import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { CreateChartDto } from './dto/create-chart.dto';
import { UpdateChartDto } from './dto/update-chart.dto';

@Controller('/charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) { }

  @Post('/create')
  create(@Body() createChartDto: CreateChartDto[]) {
    return this.chartsService.create(createChartDto);
  }

  @Get('/all')
  findAll() {
    return this.chartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chartsService.findOne(+id);
  }

  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateChartDto: UpdateChartDto) {

    return this.chartsService.update(id,updateChartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartsService.remove(+id);
  }
}
