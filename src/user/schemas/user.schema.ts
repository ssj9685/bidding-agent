import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  residence: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
