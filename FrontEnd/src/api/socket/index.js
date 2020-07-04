import openSocket from "socket.io-client";
import { baseUrl } from "../../config.json";
import { toast } from "react-toastify";
const socket = openSocket(baseUrl);

export function joinRoom({ roomId, playerId }) {
  socket.emit("joinRoom", { roomId, playerId });
}

export function disconnected() {
  socket.on("disconnect", () => {
    toast.error("You have been disconnected, Reload the page");
  });
}

export function makeMove({ winner, playerId, board, myChar, changeBoard }) {
  socket.on("Move", (data) => {
    const boardCopy = [...board];
    const { game } = data;
    if (winner || boardCopy[game]) return;
    changeBoard([...data.board]);
  });
}

export function gameState({
  textInput,
  playerId,
  disableBid,
  toggleBid,
  enableTurn,
  enableBid,
  changePts,
  setDraw,
  changeBoard,
}) {
  socket.on("gameState", (data) => {
    const { bid, bidWinner, move } = data;
    if (bid.status === "DRAW") {
      disableBid();
      setDraw((prev) => true);
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
      toast.dark("You won the bid, make your move");
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

export function Reset({
  playerId,
  changeBoard,
  changePts,
  enableBid,
  setDraw,
}) {
  socket.on("reset", (data) => {
    changeBoard([...data.board]);
    changePts(data[playerId]);
    enableBid();
    setDraw((prev) => false);
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
      toast.dark("You won the bid, make your move");
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

export function recieveMsg({ playerId, setMsgs, isMobile }) {
  socket.on("recieveMsg", ({ senderId, system, Msg }) => {
    const message =
      senderId === playerId ? `You: ${Msg}` : `${senderId}: ${Msg}`;
    setMsgs((prev) => [...prev, { system, Msg: message }]);
    if (isMobile && system && senderId !== playerId) toast.dark(Msg);
  });
}

export function sendMsg({ playerId, Msg, roomId }) {
  socket.emit("sendMsg", { playerId, Msg, roomId });
}
