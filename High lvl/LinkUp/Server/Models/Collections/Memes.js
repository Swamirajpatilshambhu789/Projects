import mongoose from 'mongoose';

const MemesmsgSchema = new mongoose.Schema({
  username: String,
  room: String,
  msg: String,
});

export const Msg = mongoose.model('MemesMsg', MemesmsgSchema, 'Memes');