import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  constructor() { }
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GatewaySocket');

  afterInit(server: Server) {
    this.logger.log('Init');
  };

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected:', client.id)
  }
  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected:', client.id)
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('message', payload);
  }

  async sendUpdateToClients(data: any) {

    await this.server.emit('update', data)
  }

}
