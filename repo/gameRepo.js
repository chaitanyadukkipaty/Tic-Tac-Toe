const Game = require("../models/game");
const Room = require("../models/room");
const mongoose = require("mongoose");

async function addPlayerToRoom({ playerId, roomId, players, isFull }) {
  const id = new mongoose.Types.ObjectId();
  console.log(" xx ", isFull);
  const payload = {
    _id: id,
    playerId: playerId,
    roomId: roomId,
    Character: players.length === 0 ? "X" : "O",
    Timestamp: new Date(),
    isFull,
  };
  if (isFull) await Room.updateOne({ roomId: roomId }, { isFull: isFull });
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

async function findRooms(limit = 1) {
  const rooms = await Room.aggregate([
    { $match: { isFull: false } },
    { $sample: { size: limit } },
  ]);
  return rooms;
}

async function clearGameStates({ roomId }) {
  const clear = await Game.deleteMany({ roomId: roomId });
  return clear;
}
module.exports = {
  addPlayerToRoom,
  addStateToGame,
  findPlayersInRoom,
  findIfPlayerInRoom,
  getGameRecords,
  findRooms,
  clearGameStates,
};
