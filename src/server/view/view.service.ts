import { Injectable } from '@nestjs/common';

@Injectable()
export class ViewService {
  getIndex() {
    return {
      title: 'Hot reload test2',
    };
  }
}
