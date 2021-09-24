import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  uid: Number,
  name: String,
  birth: String,
  age: Number,
  sex: String,
});

export const BiddingSession = new mongoose.Schema({
  uid: Number,
  userId: Number,
  biddingId: Number,
  nowProcess: String,
  proxy: String,
  otherData: String,
  otherData1: String,
});

export const Bidding = new mongoose.Schema({
  uid: Number,
  biddingName: String,
  price: Number,
  kind: String,
  address: String,
  startDate: Date,
  endDate: Date,
  successBidUser: Number,
});
