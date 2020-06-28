const Game = require("../models/game");
const Room = require("../models/room");
const mongoose = require("mongoose");

function addPlayerToRoom({ playerId, roomId, players }) {
  const id = new mongoose.Types.ObjectId();
  const payload = {
    _id: id,
    playerId: playerId,
    roomId: roomId,
    Character: players.length === 0 ? "X" : "O",
    Timestamp: new Date(),
  };
  const room = new Room(payload);
  room.save();
  return room;
}
function addStateToGame({ playerId, roomId, value, board, event }) {
  const id = new mongoose.Types.ObjectId();
  const payload = {
    _id: id,
    roomId: roomId,
    playerId: playerId,
    value: value,
    board: board,
    event: event,
    Timestamp: new Date(),
  };
  const state = new Game(payload);
  state.save();
  return state;
}

function findPlayersInRoom({ roomId }) {
  const players = Room.find({ roomId: roomId });
  return players;
}

function findIfPlayerInRoom({ playerId, roomId }) {
  const player = Room.find({ roomId: roomId, playerId: playerId });
  return player;
}

function getGameRecords({ roomId }) {
  const source = Game.find({ roomId: roomId });
  return source;
}
module.exports = {
  addPlayerToRoom,
  addStateToGame,
  findPlayersInRoom,
  findIfPlayerInRoom,
  getGameRecords,
};
