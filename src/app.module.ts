import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RenderModule } from 'nest-next';
import { ViewModule } from './view/view.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import Next from 'next';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RenderModule.forRootAsync(
      Next({
        //dev: false,
        dev: process.env.NODE_ENV !== 'production',
        conf: {},
      }),
    ),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`,
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', 'static'),
    }),
    EventModule,
    UserModule,
    ViewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
