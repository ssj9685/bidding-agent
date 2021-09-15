import {
  Body,
  HttpStatus,
  Controller,
  Post,
  Res,
  Get,
  Param,
  NotFoundException,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/post')
  async addUser(@Res() res, @Body() createuserDTO: CreateUserDTO) {
    const newUser = await this.userService.addUser(createuserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been added successfully!',
      user: newUser,
    });
  }
  @Get('user/:userID')
  async getUser(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
    const user = await this.userService.getUser(userID);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json(user);
  }
  @Get('users')
  async getUsers(@Res() res) {
    const users = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json(users);
  }
  @Put('/edit')
  async editUser(
    @Res() res,
    @Query('userID', new ValidateObjectId()) userID,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    const editedUser = await this.userService.editUser(userID, createUserDTO);
    if (!editedUser) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User has been updated',
      user: editedUser,
    });
  }
  @Delete('/delete')
  async deletedUser(
    @Res() res,
    @Query('userID', new ValidateObjectId()) userID,
  ) {
    const deletedUser = await this.userService.deleteUser(userID);
    if (!deletedUser) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      meessage: 'User has been deleted!',
      user: deletedUser,
    });
  }
}
