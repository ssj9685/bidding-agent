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
    for (const ws of this.agentWebsocket.values()) {
      ws.send(JSON.stringify({ event, data }));
    }
  }

  broadcastToOther({ event, data }) {
    switch (event) {
      case 'matched':
        this.broadcastToOtherForMatched(data);
        break;
    }
  }

  broadcastToOtherForMatched(data) {
    const { id, payload } = data;
    for (const [key, ws] of this.agentWebsocket) {
      console.log('id', id, 'payload', payload, 'key', key);
      if (key !== id) {
        ws.send(
          JSON.stringify({
            event: 'matched',
            data: { id: null, payload },
          }),
        );
      }
    }
  }

  @SubscribeMessage('apply')
  async handleApply(client: WebSocket, data: any) {
    const clientId = this.clientWebsocket.size;
    this.clientWebsocket.set(clientId, client);
    this.broadcast({
      event: 'request',
      data: { id: clientId, payload: data.payload },
    });
  }

  @SubscribeMessage('find')
  async handleFind(client: WebSocket, data: any) {
    const agentId = this.agentWebsocket.size;
    this.agentWebsocket.set(agentId, client);
    client.send(
      JSON.stringify({
        event: 'find',
        data: {
          id: agentId,
          payload: data.payload,
        },
      }),
    );
  }

  @SubscribeMessage('match')
  async handleAccept(client: WebSocket, data: any) {
    const { id, payload } = data;
    const clientData = payload;
    const ws = this.clientWebsocket.get(clientData.id);
    this.broadcastToOther({
      event: 'matched',
      data: {
        id: id,
        payload: payload,
      },
    });
    ws.send(
      JSON.stringify({
        event: 'match',
        data: { id, payload },
      }),
    );
    client.send(
      JSON.stringify({
        event: 'match',
        data: { id: id, payload: payload },
      }),
    );
  }
}
