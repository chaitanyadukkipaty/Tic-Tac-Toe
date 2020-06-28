var express = require("express");
var router = express.Router();
const uuid = require("uuid");
const {
  addPlayerToRoom,
  addStateToGame,
  findPlayersInRoom,
  findIfPlayerInRoom,
  getGameRecords,
} = require("../repo/gameRepo");
const { getGameState } = require("../service");
const { socket } = require("./socket");

module.exports = (io) => {
  socket({
    io,
    addPlayerToRoom,
    findPlayersInRoom,
    findIfPlayerInRoom,
    getGameRecords,
    getGameState,
  });

  router.post("/", (req, res) => {
    const room = uuid.v4();
    res.send({ room });
  });

  router.post("/symbolPlaced", async (req, res) => {
    const { roomId, playerId, value, board } = req.body;
    console.log("REQ", req.body);
    try {
      const players = await findPlayersInRoom({ roomId: roomId });
      if (players.length < 2) res.send({ status: false });

      const source = await getGameRecords({ roomId: roomId });
      const payload = await addStateToGame({
        playerId,
        roomId,
        value,
        board,
        event: "symbolPlaced",
      });
      source.push(payload);
      const result = await getGameState({ players, roomId, source });
      console.log(result);
      io.in(players[0].playerId).emit("Move", result);
      io.in(players[1].playerId).emit("Move", result);

      const Msg = `${playerId} has made a move`;
      for (let play of players) {
        io.in(play.playerId).emit("recieveMsg", { system: true, Msg });
      }
      res.send({ status: true });
    } catch (error) {
      console.error(error);
    }
  });

  router.post("/bid", async (req, res) => {
    const { roomId, playerId, value, board } = req.body;
    console.log(req.body);
    try {
      const players = await findPlayersInRoom({ roomId: roomId });
      if (players.length < 2) res.send({ status: false });

      const source = await getGameRecords({ roomId: roomId });
      const payload = await addStateToGame({
        playerId,
        roomId,
        value,
        board,
        event: "bidPlaced",
      });
      source.push(payload);
      const result = await getGameState({ players, roomId, source });
      console.log(result);
      io.in(players[0].playerId).emit("gameState", result);
      io.in(players[1].playerId).emit("gameState", result);

      const Msg = `${playerId} has made a bid`;
      for (let play of players) {
        io.in(play.playerId).emit("recieveMsg", { system: true, Msg });
      }
      res.send({ status: true });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  router.post("/getPlayers", async (req, res) => {
    const { roomId } = req.body;
    try {
      const players = await getGameRecords({ roomId: roomId });
      res.send(players);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  return router;
};
