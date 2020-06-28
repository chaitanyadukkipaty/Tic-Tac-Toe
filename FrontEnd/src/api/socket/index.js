import openSocket from "socket.io-client";
import { baseUrl } from "../../config.json";
import { toast } from "react-toastify";
const socket = openSocket(baseUrl);

export function joinRoom({ roomId, playerId }) {
  socket.emit("joinRoom", { roomId, playerId });
}

export function makeMove({ winner, playerId, board, myChar, changeBoard }) {
  socket.on("Move", (data) => {
    const boardCopy = [...board];
    const { game, bidWinner } = data;
    if (winner || boardCopy[game]) return;
    const oppoChar = "X" === myChar ? "O" : "X";
    boardCopy[game] = bidWinner === playerId ? myChar : oppoChar;
    changeBoard(boardCopy);
  });
}

export function gameState({
  textInput,
  playerId,
  disableBid,
  toggleBid,
  enableTurn,
  changePts,
}) {
  socket.on("gameState", (data) => {
    const { bid, bidWinner, move } = data;
    if (bid.status === "DRAW") {
      disableBid();
      toast.dark("It's a Draw");
    } else if (bid.status === "DONE" && bidWinner === null && move === null) {
      toast.dark("Bids are equal");
    } else if (
      bid.status === "DONE" &&
      bidWinner === playerId &&
      move === playerId
    ) {
      textInput.current.value = "";
      enableTurn();
      toast.dark("Your Turn");
    } else if (
      bid.status === "DONE" &&
      bidWinner !== playerId &&
      move !== playerId
    ) {
      textInput.current.value = "";
      toast.dark("You Lost the Bid");
    }
    if (bid[playerId] === 0 && bid.status === "DONE") {
      toggleBid();
    }
    changePts(data[playerId]);
  });
}

export function setMyCharacter({ myChar, setChar }) {
  socket.on("Char", (data) => {
    if (myChar === "") setChar(data);
  });
}

export function reload({
  playerId,
  enableTurn,
  toggleBid,
  changeBoard,
  changePts,
  textInput,
}) {
  socket.on("Reload", (data) => {
    const { bid, bidWinner, move } = data;
    if (bid.status === "DONE" && bidWinner === playerId && move === playerId) {
      enableTurn();
      toast.dark("Your Turn");
    }
    if (bid[playerId] !== 0) {
      toggleBid();
      textInput.current.value = bid[playerId];
    }
    if (Array.isArray(data["board"]) && data["board"].length)
      changeBoard(data["board"]);
    changePts(data[playerId]);
  });
}

export function recieveMsg({ setMsgs }) {
  socket.on("recieveMsg", ({ system, Msg }) => {
    setMsgs((prev) => {
      return [...prev, { system, Msg }];
    });
  });
}

export function sendMsg({ Msg, roomId }) {
  socket.emit("sendMsg", { Msg, roomId });
}
