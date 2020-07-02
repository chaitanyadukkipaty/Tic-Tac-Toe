import openSocket from "socket.io-client";
import { baseUrl } from "../../config.json";
import { toast } from "react-toastify";
const socket = openSocket(baseUrl);

export function joinRoom({ roomId, playerId }) {
  socket.emit("joinRoom", { roomId, playerId });
}

export function disconnected(){
  socket.on("disconnect",()=>{
    toast.error("You have been disconnected, Reload the page");
  })
}

export function makeMove({ winner, playerId, board, myChar, changeBoard }) {
  socket.on("Move", (data) => {
    const boardCopy = [...board];
    const { game, bidWinner } = data;
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
}) {
  socket.on("gameState", (data) => {
    const { bid, bidWinner, move } = data;
    console.log(data)
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

export function recieveMsg({ setMsgs,isMobile }) {
  socket.on("recieveMsg", ({ system, Msg }) => {
    setMsgs((prev) => {
      return [...prev, { system, Msg }];
    });
    if(isMobile && system)
      toast.dark(Msg);
  });
}

export function sendMsg({ Msg, roomId }) {
  socket.emit("sendMsg", { Msg, roomId });
}
