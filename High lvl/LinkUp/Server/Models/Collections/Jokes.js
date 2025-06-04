import mongoose from 'mongoose';

const JokesmsgSchema = new mongoose.Schema({
  username: String,
  room: String,
  msg: String,
});

export const Msg = mongoose.model('JokesMsg', JokesmsgSchema, 'Jokes');