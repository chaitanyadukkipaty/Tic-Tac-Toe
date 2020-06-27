import React, { useState, useEffect, useRef } from "react";
import "./GameRoom.css";
import Board from "../../components/Board";
import { calculateWinner } from "../../helper";
import { useLocation } from "react-router-dom";
import openSocket from "socket.io-client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../config.json";
import { Card, Navbar, Button, InputGroup, FormControl } from "react-bootstrap";

const socket = openSocket(baseUrl);
const style = {
  margin: "20px auto",
  width: "220px",
};
function GameRoom() {
  const textInput = useRef();
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const playerId = path.pop();
  const roomId = path.pop();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isMyTurn, setIsMyTrun] = useState(false);
  const [bid, setBid] = useState();
  const [pts, setPts] = useState(100);
  const winner = calculateWinner(board);
  const [myChar, setChar] = useState("");
  const [btn, setBtn] = useState(false);

  const handleClick = async (i) => {
    const boardCopy = [...board];
    if (winner || boardCopy[i]) return;
    if (isMyTurn) {
      boardCopy[i] = myChar;
      const payload = {
        roomId: roomId,
        playerId: playerId,
        value: i,
        board: boardCopy,
      };
      const { data } = await axios.post(`${baseUrl}/symbolPlaced`, payload);
      if (data.status) {
        setIsMyTrun(false);
      }
    }
  };

  const submitBid = async () => {
    const bid = textInput.current.value;
    const payload = {
      roomId: roomId,
      playerId: playerId,
      value: Number(bid),
      board: board,
    };
    if (pts >= Number(bid)) {
      const { data } = await axios.post(`${baseUrl}/bid`, payload);
      if (data.status) {
        setBtn((current) => !current);
      }
    } else {
      toast.error("You don't have enought Points");
    }
  };

  useEffect(() => {
    socket.emit("joinRoom", { roomId, playerId });
    socket.on("gameState", (data) => {
      const { bid, bidWinner, move } = data;
      if (bid.status === "DRAW") {
        setBtn((current) => true);
        toast.dark("It's a Draw");
      } else if (bid.status === "DONE" && bidWinner === null && move === null) {
        toast.dark("Bids are equal");
      } else if (
        bid.status === "DONE" &&
        bidWinner === playerId &&
        move === playerId
      ) {
        textInput.current.value = "";
        setIsMyTrun(true);
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
        setBtn((current) => !current);
      }
      setPts(data[playerId]);
    });
    socket.on("Char", (data) => {
      if (myChar === "") setChar(data);
    });

    socket.on("Reload", (data) => {
      const { bid, bidWinner, move } = data;
      if (
        bid.status === "DONE" &&
        bidWinner === playerId &&
        move === playerId
      ) {
        setIsMyTrun(true);
        toast.dark("Your Turn");
      }
      if (bid[playerId] !== 0) {
        setBtn((current) => !current);
        setBid(bid[playerId]);
      }
      if (Array.isArray(data["board"]) && data["board"].length)
        setBoard(data["board"]);
      setPts(data[playerId]);
    });
  }, []);

  useEffect(() => {
    socket.on("Move", (data) => {
      const boardCopy = [...board];
      const { game, bidWinner } = data;
      if (winner || boardCopy[game]) return;
      const oppoChar = "X" === myChar ? "O" : "X";
      boardCopy[game] = bidWinner === playerId ? myChar : oppoChar;
      setBoard(boardCopy);
    });
  }, [myChar, board]);

  return (
    <>
      <div className="root">
        <ToastContainer />
        <div className="Game">
          <div className="Game-Center">
            <Board squares={board} onClick={handleClick} />
            <p className="font">{"Points left: " + pts}</p>
          </div>
          <div style={style} className="game-state">
            <InputGroup className="mb-3 input">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                ref={textInput}
                placeholder="Bid"
                aria-label="Bid"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Button className="button" onClick={submitBid} disabled={btn}>
              Bid
            </Button>
            <p className="font">{btn && "Waiting for Other Player to Bid"}</p>
            <p className="font">{winner && "Winner: " + winner}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameRoom;
