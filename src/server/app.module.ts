import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RenderModule } from 'nest-next';
import { UserModule } from './user/user.module';
import { ViewModule } from './view/view.module';
import { AppGateway } from './app.gateway';
import Next from 'next';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        conf: {},
      }),
    ),
    MongooseModule.forRoot('mongodb://admin:1234@jxq.kr:27017', {
      useNewUrlParser: true,
    }),
    UserModule,
    ViewModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
