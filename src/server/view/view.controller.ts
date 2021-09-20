import { Controller, Get, Render } from '@nestjs/common';
import { ViewService } from './view.service';

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get()
  @Render('Index')
  public index() {
    return this.viewService.getIndex();
  }
}
