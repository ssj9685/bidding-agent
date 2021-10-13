import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  async consume({ clientId, groupId, topic, onmessage }) {
    console.log('env test', typeof process.env.KAFKA_BROKER_1);
    const kafka = new Kafka({
      clientId,
      brokers: [process.env.KAFKA_BROKER_1],
    });
    const consumer = kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        onmessage(topic, partition, message);
      },
    });
    return consumer;
  }

  async produce({ clientId, brokers, topic, messages }) {
    const kafka = new Kafka({ clientId, brokers });
    const producer = kafka.producer();
    await producer.connect();
    if (topic && messages) {
      const msg = [];
      for (const message of messages) {
        msg.push({ value: message });
      }
      await producer.send({
        topic,
        messages: msg,
      });
    } else if ((!topic && messages) || (topic && messages)) {
      new Error('To send messages please input topic and messages');
    }
    return producer;
  }
}
