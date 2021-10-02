import { Injectable } from '@nestjs/common';

@Injectable()
export class ViewService {
  getIndex() {
    return {
      title: 'main page',
    };
  }
  getUser() {
    return {
      websocketHost: process.env.WEBSOCKET_HOST,
    };
  }
  getAgent() {
    return {
      websocketHost: process.env.WEBSOCKET_HOST,
    };
  }
}
