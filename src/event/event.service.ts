import { Injectable } from '@nestjs/common';
import { MqttService } from 'src/mqtt/mqtt.service';

@Injectable()
export class EventService {
  constructor(private readonly mqttService: MqttService) {}
  clientWebsocket = new Map();
  agentWebsocket = new Map();

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

  async handleApply(client: any, data: any) {
    /**
     * maybe this part will replace with db data
     */
    const clientId = this.clientWebsocket.size;
    this.clientWebsocket.set(clientId, client);

    /**
     * This test code will be removed
     */
    const subscriber = await this.mqttService.subscribe(
      `${clientId}`,
      (topic, payload, packet) => {
        console.log(topic, payload, packet);
      },
    );
    client.on('close', () => {
      this.clientWebsocket.delete(clientId);
      subscriber.end();
    });

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

    /**
     * This test code will be removed
     */
    await this.mqttService.publish(
      'request',
      JSON.stringify({
        event: 'request',
        data: { id: clientId, payload: data.payload },
      }),
    );

    this.broadcast({
      event: 'request',
      data: { id: clientId, payload: data.payload },
    });
  }

  async handleFind(client: any, data: any) {
    const agentId = this.agentWebsocket.size;
    this.agentWebsocket.set(agentId, client);

    /**
     * This test code will be removed
     */
    const subscriber = await this.mqttService.subscribe(
      'request',
      (topic, payload, packet) => {
        console.log(topic, payload, packet);
      },
    );
    client.on('close', () => {
      this.agentWebsocket.delete(agentId);
      subscriber.end();
    });

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

  async handleMatch(client: any, data: any) {
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
