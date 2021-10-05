import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RenderModule } from 'nest-next';
import { ViewModule } from './view/view.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import Next from 'next';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    RenderModule.forRootAsync(
      Next({
        //dev: false,
        dev: process.env.NODE_ENV !== 'production',
        conf: {},
      }),
    ),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`,
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
