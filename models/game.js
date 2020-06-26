const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const game = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  roomId: String,
  event: String,
  value: Number,
  board: [String],
  playerId: String,
  Timestamp: Date,
});

module.exports = mongoose.model("Game", game);
