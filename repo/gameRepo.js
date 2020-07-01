const Game = require("../models/game");
const Room = require("../models/room");
const mongoose = require("mongoose");

async function addPlayerToRoom({ playerId, roomId, players }) {
  const id = new mongoose.Types.ObjectId();
  const payload = {
    _id: id,
    playerId: playerId,
    roomId: roomId,
    Character: players.length === 0 ? "X" : "O",
    Timestamp: new Date(),
  };
  const room = new Room(payload);
  await room.save();
  return room;
}
async function addStateToGame({ playerId, roomId, value, board, event }) {
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
  await state.save();
  return state;
}

async function findPlayersInRoom({ roomId }) {
  const players = await Room.find({ roomId: roomId });
  return players;
}

async function findIfPlayerInRoom({ playerId, roomId }) {
  const player = await Room.find({ roomId: roomId, playerId: playerId });
  return player;
}

async function getGameRecords({ roomId }) {
  const source = await Game.find({ roomId: roomId });
  return source;
}
module.exports = {
  addPlayerToRoom,
  addStateToGame,
  findPlayersInRoom,
  findIfPlayerInRoom,
  getGameRecords,
};
