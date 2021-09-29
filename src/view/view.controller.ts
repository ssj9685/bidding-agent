import { Controller, Get, Render } from '@nestjs/common';
import { ViewService } from './view.service';

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get()
  @Render('Index')
  getIndex() {
    return this.viewService.getIndex();
  }
  @Get('/user')
  @Render('User')
  getUser() {
    return this.viewService.getUser();
  }
  @Get('/agent')
  @Render('Agent')
  getAgent() {
    return this.viewService.getAgent();
  }
}
