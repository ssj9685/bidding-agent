import { Injectable } from '@nestjs/common';

@Injectable()
export class ViewService {
  getIndex() {
    return {
      title: 'Next with Nest',
    };
  }
}
