import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ViewService } from './view.service';

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Render('Index')
  getIndex() {
    return this.viewService.getIndex();
  }
  @Get('signup')
  @Render('Signup')
  getSignup() {
    return this.viewService.getSignup();
  }

  @UseGuards(JwtAuthGuard)
  @Get('signin')
  @Render('Signin')
  getSignin() {
    return this.viewService.getSignin();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @Render('User')
  getUser() {
    return this.viewService.getUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get('agent')
  @Render('Agent')
  getAgent() {
    return this.viewService.getAgent();
  }
}
