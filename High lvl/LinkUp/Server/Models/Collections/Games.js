import mongoose from 'mongoose';

const GamesmsgSchema = new mongoose.Schema({
  username: String,
  room: String,
  msg: String,
});

export const Msg = mongoose.model('GamesMsg', GamesmsgSchema, 'Games');