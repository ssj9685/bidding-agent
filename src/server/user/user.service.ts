import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = new this.userModel(createUserDTO);
    return newUser.save();
  }
  async getUser(userID: string): Promise<User> {
    const user = await this.userModel.findById(userID).exec();
    return user;
  }
  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }
  async editUser(userID: string, createUserDTO: CreateUserDTO): Promise<User> {
    const editedUser = await this.userModel.findByIdAndUpdate(
      userID,
      createUserDTO,
      { new: true },
    );
    return editedUser;
  }
  async deleteUser(userID: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndRemove(userID);
    return deletedUser;
  }
}
