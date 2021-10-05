import {
  Request,
  Response,
  Controller,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { SigninGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
//import { UnauthorizedExceptionFilter } from './auth.filter';
//import { UseFilters } from '@nestjs/common';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  //@UseFilters(UnauthorizedExceptionFilter)
  @UseGuards(SigninGuard)
  @Post('signin')
  async login(@Request() req, @Response() res): Promise<void> {
    console.log(req.user._doc._id);
    const token = await this.authService.login(req.user);
    res.cookie('Authorization', token.access_token, {
      httpOnly: true,
    });
    res.writeHeader(301, { Location: '/' });
    res.end();
  }

  @Get('signout')
  async logout(@Request() req, @Response() res): Promise<void> {
    res.cookie('Authorization', '', {
      httpOnly: true,
    });
    res.redirect('/signin');
  }
}
