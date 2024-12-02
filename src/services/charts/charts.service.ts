import { Injectable } from '@nestjs/common';
import { CreateChartDto } from './dto/create-chart.dto';
import { UpdateChartDto } from './dto/update-chart.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { SocketGateway } from 'src/gateway/socket.gateway';

@Injectable()
export class ChartsService {
  constructor(private readonly prisma: PrismaService,
    private readonly gatewayService: SocketGateway
  ) { }

  async create(createChartDto: CreateChartDto) {
    await this.prisma.charts.create({
      data: {
        ...createChartDto
      },
      select: {
        labels: true,
        data: true
      }
    })
    await this.findAll();
  }

  async findAll() {
    await this.sendUpdateSockets();
  }

  async sendUpdateSockets() {
    const charts = await this.prisma.charts.findMany({
      select: {
        labels: true,
        data: true,
      },
    });

    this.gatewayService.sendUpdateToClients(charts);
  }


  findOne(id: number) {
    return `This action returns a #${id} chart`;
  }

  update(id: number, updateChartDto: UpdateChartDto) {
    return `This action updates a #${id} chart`;
  }

  remove(id: number) {
    return `This action removes a #${id} chart`;
  }
}
