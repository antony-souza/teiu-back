import { Logger } from '@nestjs/common';
import {
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

  afterInit() {
    this.logger.log('Init');
  }

  handleConnection(client: Socket) {
    this.logger.log('Client connected:', client.id);
  }
  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('message', payload);
  }

  @SubscribeMessage('joinStore')
  handleJoinStore(client: Socket, store_id: string) {
    client.join(store_id);
    this.logger.log(`Client ${client.id} joined store ${store_id}`);
  }

  @SubscribeMessage('sales')
  async sendSalesProducts(store_id: string, data: any) {
    await this.server.to(store_id).emit('sales', data);
  }
}
