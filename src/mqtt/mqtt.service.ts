import { Injectable } from '@nestjs/common';
import { connect, ISubscriptionMap, MqttClient, OnMessageCallback } from 'mqtt';

@Injectable()
export class MqttService {
  private createClient() {
    const client = connect('mqtt://jxq.kr:1883');

    client.on('connect', () => {
      console.log('MQTT connected');
    });

    client.on('disconnect', () => {
      console.log('MQTT disconnected');
    });

    client.on('error', () => {
      console.log('MQTT error');
    });

    client.on('reconnect', () => {
      console.log('MQTT reconnecting');
    });

    client.on('close', () => {
      console.log('MQTT closed');
    });

    client.on('offline', () => {
      console.log('MQTT offline');
    });

    return client;
  }

  subscribe(
    topic: string | string[] | ISubscriptionMap,
    callback?: OnMessageCallback,
  ) {
    const client = this.createClient();
    client.on('message', callback);
    return new Promise<MqttClient>((resolve, reject) => {
      client.subscribe(topic, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(client);
        }
      });
    });
  }

  publish(topic: string, message: string | Buffer) {
    const client = this.createClient();
    return new Promise<MqttClient>((resolve, reject) => {
      client.publish(topic, message, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(client.end());
        }
      });
    });
  }
}
