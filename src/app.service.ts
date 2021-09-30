import { Injectable } from '@nestjs/common';
import { MqttClient } from 'mqtt';
import { MqttService } from './mqtt/mqtt.service';

@Injectable()
export class AppService {
  constructor(private readonly mqttService: MqttService) {}
  getHello(): string {
    return 'Hello World';
  }

  getTest(): string {
    return 'this is test page';
  }

  postTest(): string {
    return 'post test value';
  }

  async subscribe(): Promise<MqttClient> {
    return this.mqttService.subscribe('test', (topic, payload, packet) => {
      console.log(topic, payload, packet);
    });
  }

  async publish(): Promise<MqttClient> {
    return this.mqttService.publish('test', 'test');
  }
}
