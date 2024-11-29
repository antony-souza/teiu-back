import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GatewaySocket');

  @SubscribeMessage('connectToSocket')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('connectToSocket', payload, client.id);
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
