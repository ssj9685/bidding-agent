import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  birth: String,
  age: Number,
  sex: String,
});
