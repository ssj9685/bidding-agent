import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventGateway } from './event.gateway';
import { MqttModule } from 'src/mqtt/mqtt.module';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [MqttModule, KafkaModule],
  providers: [EventGateway, EventService],
  exports: [EventService],
})
export class EventModule {}
