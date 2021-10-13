import { Injectable } from '@nestjs/common';
import { MqttService } from 'src/mqtt/mqtt.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class EventService {
  constructor(
    private readonly mqttService: MqttService,
    private readonly kafkaService: KafkaService,
  ) {}
  clientWebsocket = new Map();
  agentWebsocket = new Map();

  async handleApply(client: any, data: any) {
    /**
     * maybe this part will replace with db data
     */
    const clientId = String(this.clientWebsocket.size);
    this.clientWebsocket.set(clientId, client);

    client.on('close', () => {
      this.clientWebsocket.set(clientId, null);
      //this.clientWebsocket.delete(clientId);
    });

    const onmessage = (topic, partition, message) => {
      client.send(
        JSON.stringify({
          event: 'match',
          data: { id: clientId, payload: message },
        }),
      );
    };

    await this.mqttService.publish('createUser', `user${clientId}`);

    const consumer = await this.kafkaService.consume({
      clientId: `user${clientId}`,
      groupId: `user${clientId}`,
      topic: `user${clientId}`,
      onmessage,
    });

    client.on('close', () => consumer.stop());

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

    this.mqttService.publish(
      'request',
      JSON.stringify({ id: clientId, payload: data.payload }),
    );
  }

  async handleFind(client: any, data: any) {
    const agentId = String(this.agentWebsocket.size);
    this.agentWebsocket.set(agentId, client);

    client.on('close', () => {
      this.agentWebsocket.set(agentId, null);
      //this.agentWebsocket.delete(agentId);
    });

    const onmessage = (topic, partition, message, other = false) => {
      console.log('consume test', topic, message);
      const { id, payload } = JSON.parse(message.value.toString('utf8'));
      if (other && id === agentId) return;
      client.send(
        JSON.stringify({
          event: topic,
          data: { id, payload },
        }),
      );
    };

    const requestConsumer = await this.kafkaService.consume({
      clientId: `agent${agentId}`,
      groupId: `agent${agentId}`,
      topic: 'request',
      onmessage: (topic, partition, message) =>
        onmessage(topic, partition, message, false),
    });

    const matchedConsumer = await this.kafkaService.consume({
      clientId: `agent${agentId}`,
      groupId: `agent${agentId}`,
      topic: 'matched',
      onmessage: (topic, partition, message) =>
        onmessage(topic, partition, message, true),
    });

    client.on('close', () => {
      requestConsumer.stop();
      matchedConsumer.stop();
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
    const clientId = payload.id;

    await this.mqttService.publish(
      'matched',
      JSON.stringify({
        id,
        payload,
      }),
    );

    this.mqttService.publish(
      `user${clientId}`,
      JSON.stringify({
        id: clientId,
        payload: payload,
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
