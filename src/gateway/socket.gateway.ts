import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChartsService } from 'src/services/charts/charts.service';

interface IChartData {
  labels: string[];
  data: number[];
}

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  constructor(private readonly chartService: ChartsService) { }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GatewaySocket');

  @SubscribeMessage('connectToSocket')
  handleMessage(client: Socket, payload: any): void {
    this.logger.debug('connectToSocket', payload, client.id);

    this.server.emit('chartData', this.chartService.findAll());
  }

  afterInit(server: Server) {
    this.logger.debug('Init - Socket Server');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.debug(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`Client disconnected: ${client.id}`);
  }
}
