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
      title: 'user page',
    };
  }
  getAgent() {
    return {
      title: 'agent page',
    };
  }
}
