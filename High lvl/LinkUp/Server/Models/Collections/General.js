import mongoose from 'mongoose';

const GeneralmsgSchema = new mongoose.Schema({
  username: String,
  room: String,
  msg: String,
});

export const Msg = mongoose.model('GeneralMsg', GeneralmsgSchema, 'General');