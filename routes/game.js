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
      const result = getGameState({ players, source });
      io.in(players[0].playerId).emit("Move", result);
      io.in(players[1].playerId).emit("Move", result);
      const Msg = "Made a Move";
      for (let play of players) {
        io.in(play.playerId).emit("recieveMsg", {senderId: playerId, system: true, Msg });
      }
      res.send({ status: true });
    } catch (error) {
      console.error(error);
    }
  });

  router.post("/bid", async (req, res) => {
    const { roomId, playerId, value, board } = req.body;
    try {
      const players = await findPlayersInRoom({ roomId: roomId });
      if (players.length < 2) res.send({ status: false });

      
      const payload = await addStateToGame({
        playerId,
        roomId,
        value,
        board,
        event: "bidPlaced",
      });
      const source = await getGameRecords({ roomId: roomId });
      source.sort((a,b)=>{
        const atime = new Date(a.Timestamp).getTime();
        const btime = new Date(b.Timestamp).getTime();
        return atime-btime;
      })
      const result = getGameState({ players, source });
      console.log(source);
      console.log("RESULT",result);
      io.in(players[0].playerId).emit("gameState", result);
      io.in(players[1].playerId).emit("gameState", result);

      const Msg = "Made a Bid";
      for (let play of players) {
        io.in(play.playerId).emit("recieveMsg", { senderId: playerId ,system: true, Msg });
      }
      res.send({ status: true });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  router.post("/getGameState", async (req, res) => {
    const { roomId } = req.body;
    try {
      const players = await findPlayersInRoom({ roomId: roomId });
      const source = await getGameRecords({ roomId: roomId });
      const result = getGameState({ players, source });
      io.in(players[0].playerId).emit("gameState", result);
      io.in(players[1].playerId).emit("gameState", result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  router.post("/getPlayers", async (req, res) => {
    const { roomId } = req.body;
    try {
      const players = await findPlayersInRoom({ roomId: roomId });
      res.send({players});
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  return router;
};
