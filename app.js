const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = express();
const cors = require("cors");
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
const http = require("http").Server(app);
const io = require("socket.io")(http);
const uuid = require("uuid");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://chaitanya:chaitanya@cluster0-yqv9c.mongodb.net/tictactoe?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const Game = require("./models/game");
const Room = require("./models/room");

const randomString = function (len, bits) {
  bits = bits || 36;
  let outStr = "",
    newStr;
  while (outStr.length < len) {
    newStr = Math.random().toString(bits).slice(2);
    outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
  }
  return outStr.toUpperCase();
};

const rooms = [];

app.post("/", (req, res) => {
  const room = uuid.v4();
  rooms.push(room);
  console.log(rooms);
  res.send({ room });
});

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/symbolPlaced", async (req, res) => {
  const { roomId, playerId, value, board } = req.body;
  console.log("REQ", req.body);
  try {
    const players = await Room.find({ roomId: roomId });
    if (players.length < 2) res.send({ status: false });
    const id = new mongoose.Types.ObjectId();
    const payload = {
      _id: id,
      roomId: roomId,
      playerId: playerId,
      value: value,
      board: board,
      event: "symbolPlaced",
      Timestamp: new Date(),
    };
    const state = new Game(payload);
    state.save();
    const source = await Game.find({ roomId: roomId });
    source.push(payload);
    const result = await getGameState({ players, roomId, source });
    console.log(result);
    io.in(players[0].playerId).emit("Move", result);
    io.in(players[1].playerId).emit("Move", result);
    res.send({ status: true });
  } catch (error) {
    console.error(error);
  }
});

app.post("/bid", async (req, res) => {
  const { roomId, playerId, value, board } = req.body;
  console.log(req.body);
  try {
    const players = await Room.find({ roomId: roomId });
    if (players.length < 2) res.send({ status: false });

    const id = new mongoose.Types.ObjectId();
    const payload = {
      _id: id,
      roomId: roomId,
      playerId: playerId,
      value: value,
      event: "bidPlaced",
      board: board,
      Timestamp: new Date(),
    };
    const state = new Game(payload);
    state.save();
    const source = await Game.find({ roomId: roomId });
    source.push(payload);
    const result = await getGameState({ players, roomId, source });
    console.log(result);
    io.in(players[0].playerId).emit("gameState", result);
    io.in(players[1].playerId).emit("gameState", result);
    res.send({ status: true });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

io.on("connection", (socket) => {
  console.log("Request to join chatroom");
  console.log(socket.id);
  socket.on("joinRoom", async ({ roomId, playerId }) => {
    if (roomId != null) {
      const players = await Room.find({ roomId: roomId });
      const player = await Room.find({ roomId: roomId, playerId: playerId });
      if (player.length === 1) {
        socket.join(playerId, function () {
          console.log(socket.id + " has subscribed");
          console.log("Socket now in rooms", io.sockets.adapter.rooms);
        });
        socket.emit("Char", player[0].Character);
        if (players.length === 2) {
          const source = await Game.find({ roomId: roomId });
          const result = await getGameState({ players, roomId, source });
          socket.emit("Reload", result);
        }
      }
      if (players.length < 2) {
        if (player.length === 0) {
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
        }
        socket.join(playerId, function () {
          console.log(socket.id + " has subscribed");
          console.log("Socket now in rooms", io.sockets.adapter.rooms);
        });
        socket.emit("Char", players.length === 0 ? "X" : "O");
      }
    }
  });
});

async function getGameState({ players, roomId, source }) {
  const defaultResult = {};
  defaultResult[players[0].playerId] = 100;
  defaultResult["game"] = null;
  defaultResult["board"] = [];
  defaultResult["bid"] = {};
  defaultResult["bid"]["status"] = "DONE";
  defaultResult["bid"][players[0].playerId] = 0;
  defaultResult[players[1].playerId] = 100;
  defaultResult["bid"][players[1].playerId] = 0;
  defaultResult["bidWinner"] = null;
  defaultResult["move"] = null;
  console.log(defaultResult);
  const result = source.reduce((res, tx, i) => {
    if (i == 0) {
      res = defaultResult;
    }
    if (tx.event == "bidPlaced") {
      if (res.bid.status == "DONE") {
        res.bid.status = "PROGRESS";
        res.bid[tx.playerId] = tx.value;
        res.board = tx.board;
        return res;
      }
      res.bid[tx.playerId] = tx.value;
      res.bid.status = "DONE";
      res.board = tx.board;
      res.bidWinner =
        res["bid"][players[0].playerId] > res["bid"][players[1].playerId]
          ? players[0].playerId
          : players[1].playerId;
      res[res.bidWinner] -= res["bid"][res.bidWinner];
      res.move = res.bidWinner;
      res["bid"][players[0].playerId] = 0;
      res["bid"][players[1].playerId] = 0;
      return res;
    }
    if (tx.event == "symbolPlaced") {
      if (tx.event == "symbolPlaced") {
        res.game = tx.value;
        res.move = null;
        res.board = tx.board;
      }
    }
    return res;
  }, defaultResult);
  return result;
}

http.listen(8000, (req, res) => {
  console.log("Listening on 8082");
});
