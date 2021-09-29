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

  async handleDisconnect(client: any) {
    client.close();
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
  async handleApply(client: any, data: any) {
    const clientId = this.clientWebsocket.size;
    this.clientWebsocket.set(clientId, client);
    client.on('close', () => this.clientWebsocket.delete(clientId));
    if (!this.agentWebsocket.size) {
      client.send(
        JSON.stringify({
          event: 'noAgent',
          data: { id: clientId, payload: data.payload },
        }),
      );
      return;
    }
    client.send(
      JSON.stringify({
        event: 'apply',
        data: { id: clientId, payload: data.payload },
      }),
    );

    this.broadcast({
      event: 'request',
      data: { id: clientId, payload: data.payload },
    });
  }

  @SubscribeMessage('find')
  async handleFind(client: any, data: any) {
    const agentId = this.agentWebsocket.size;
    this.agentWebsocket.set(agentId, client);
    client.on('close', () => this.agentWebsocket.delete(agentId));
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
  async handleAccept(client: any, data: any) {
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
