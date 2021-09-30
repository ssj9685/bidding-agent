import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { EventService } from './event.service';

@WebSocketGateway(8080)
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly eventService: EventService) {}
  @WebSocketServer() server: Server;

  async handleConnection() {
    console.log(this.server.clients.size);
  }

  async handleDisconnect(client: any) {
    client.close();
    console.log(this.server.clients.size);
  }

  @SubscribeMessage('apply')
  async handleApply(client: any, data: any) {
    this.eventService.handleApply(client, data);
  }

  @SubscribeMessage('find')
  async handleFind(client: any, data: any) {
    this.eventService.handleFind(client, data);
  }

  @SubscribeMessage('match')
  async handleMatch(client: any, data: any) {
    this.eventService.handleMatch(client, data);
  }
}
