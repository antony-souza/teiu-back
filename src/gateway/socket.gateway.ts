import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SalesRepository } from 'src/repositories/sales.repository';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly salesRepository: SalesRepository) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GatewaySocket');

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected:', client.id);
  }
  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('message', payload);
  }

  async sendUpdateToClients(data: any) {
    console.log('Dados recebidos no cliente:', data);
    await this.server.emit('update', data);
  }

  async sendInitSalesProducts(data: any) {
    await this.server.emit('initSales', data);
  }

  @SubscribeMessage('sales')
  async sendSalesProducts(@MessageBody() data: any) {
    await this.server.emit('sales', data);
  }
}
