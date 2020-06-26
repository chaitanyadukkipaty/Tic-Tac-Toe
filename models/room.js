const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const room = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  roomId: String,
  playerId: String,
  playerSocket: String,
  Character: String,
  Timestamp: Date,
});

module.exports = mongoose.model("Room", room);
