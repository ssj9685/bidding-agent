import { Module } from '@nestjs/common';
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
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    RenderModule.forRootAsync(
      Next({
        //dev: false,
        dev: process.env.NODE_ENV !== 'production',
        conf: {},
      }),
    ),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
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
