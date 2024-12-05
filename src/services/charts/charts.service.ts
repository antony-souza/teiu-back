import { Injectable } from '@nestjs/common';
import { CreateChartDto } from './dto/create-chart.dto';
import { UpdateChartDto } from './dto/update-chart.dto';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { SocketGateway } from 'src/gateway/socket.gateway';

@Injectable()
export class ChartsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gatewayService: SocketGateway,
  ) {}

  async create(createChartDto: CreateChartDto[]) {
    const chart = this.prisma.charts.createMany({
      data: createChartDto,
    });

    this.gatewayService.sendUpdateToClients(chart);
    return chart;
  }

  async findAll() {
    const chart = await this.prisma.charts.findMany({
      select: {
        id: true,
        label: true,
        data: true,
      },
    });

    this.gatewayService.sendUpdateToClients(chart);

    return chart;
  }

  findOne(id: number) {
    return `This action returns a #${id} chart`;
  }

  async update(id: string, updateChartDto: UpdateChartDto) {
    const chart = await this.prisma.charts.update({
      where: { id },
      data: {
        ...updateChartDto,
        updatedAt: new Date(),
      },
    });

    const find = this.findAll();
    this.gatewayService.sendUpdateToClients(find);
    return chart;
  }

  remove(id: number) {
    return `This action removes a #${id} chart`;
  }
}
