import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World';
  }

  getTest(): string {
    return 'this is test page';
  }

  postTest(): string {
    return 'post test value';
  }
}
