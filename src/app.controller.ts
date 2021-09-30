import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(): string {
    return this.appService.getTest();
  }

  @Post('/test2')
  postTest(): string {
    return this.appService.postTest();
  }

  @Get('/subscribe')
  async subscribe(): Promise<string> {
    await this.appService.subscribe();
    return 'subscribe';
  }

  @Get('/publish')
  async publish(): Promise<string> {
    await this.appService.publish();
    return 'publish';
  }
}
