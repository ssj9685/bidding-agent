import { Controller, Get, Res, Req } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import { ViewService } from './view.service';

@Controller('view')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('/')
  static(@Req() req: IncomingMessage, @Res() res: ServerResponse) {
    console.log('test');
    const handle = this.viewService.getNextServer().getRequestHandler();
    handle(req, res);
  }
}
