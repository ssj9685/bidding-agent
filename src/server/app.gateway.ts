import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(8080)
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  clientWebsocket = new Map();
  agentWebsocket = new Map();

  async handleConnection() {
    console.log(this.server.clients.size);
  }

  async handleDisconnect() {
    console.log(this.server.clients.size);
  }

  broadcast({ event, data }) {
    for (const [key, ws] of this.agentWebsocket) {
      ws.send(JSON.stringify({ event, data }));
    }
  }

  broadcastToOther({ event, data }) {
    if (event === 'accepted') {
      const { id, payload } = data;
      for (const [key, ws] of this.agentWebsocket) {
        if (key !== id) {
          ws.send(
            JSON.stringify({
              event: 'accepted',
              data: { id: null, payload: '' },
            }),
          );
        }
      }
    }
  }

  @SubscribeMessage('apply')
  async handleApply(client: WebSocket, data: any) {
    console.log(data);
    const { id, payload } = data;
    const clientId = this.clientWebsocket.size;
    this.clientWebsocket.set(clientId, client);
    this.broadcast({
      event: 'request',
      data: { id: clientId, payload: payload },
    });
  }

  @SubscribeMessage('find')
  async handleFind(client: WebSocket, data: any) {
    const agentId = this.agentWebsocket.size;
    this.agentWebsocket.set(agentId, client);
    const payload = JSON.stringify({ event: 'find', payload: agentId });
    client.send(payload);
  }

  @SubscribeMessage('accept')
  async handleAccept(client: WebSocket, data: any) {
    const { id, payload } = data;
    console.log(data);
    const clientData = payload;
    const ws = this.clientWebsocket.get(clientData.id);
    this.broadcastToOther({ event: 'accepted', data: payload });
    ws.send(JSON.stringify({ event: 'accept', payload: data }));
  }
}
