import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { FindUserDto } from './dto/find-user.dto';

@Controller('u')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createCatDto: CreateUserDto) {
    await this.userService.create(createCatDto);
  }

  @Get('search')
  async findUser(@Query() query: FindUserDto): Promise<any> {
    return this.userService.findUser(query);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
