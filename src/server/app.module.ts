import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:1234@jxq.kr:27017', {
      useNewUrlParser: true,
    }),
    UserModule,
    ViewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
