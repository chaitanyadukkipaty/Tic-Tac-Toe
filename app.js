const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http);

const mongoose = require("mongoose");
const game = require("./routes/game")(io);
// mongoose.connect("mongodb://localhost:27017/tic-tac-toe", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(
  "mongodb+srv://chaitanya:chaitanya@cluster0-yqv9c.mongodb.net/tictactoe?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const Game = require("./models/game");
const Room = require("./models/room");

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/", game);

http.listen(8000, (req, res) => {
  console.log("Listening on 8000");
});
