import React, { useState, useEffect, useRef } from "react";
import "./Game.css";
import Board from "../components/Board";
import { calculateWinner } from "../helper";
import { useLocation } from "react-router-dom";
import openSocket from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../config.json";
import { Col, Row, Button, InputGroup, FormControl } from "react-bootstrap";

const socket = openSocket(baseUrl);

function Game() {
  const textInput = useRef();
  const chat = useRef();
  const [msgs, setMsgs] = useState([]);
  const [chatInput, setChatInput] = useState("");
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

  const sendChat = () => {
    const Msg = `${playerId}: ${chat.current.value}`;
    socket.emit("sendMsg", { Msg, roomId });
    chat.current.value = "";
  };

  useEffect(() => {
    textInput.current.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        submitBid();
      }
    });
    chat.current.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        sendChat();
      }
    });
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
        textInput.current.value = bid[playerId];
      }
      if (Array.isArray(data["board"]) && data["board"].length)
        setBoard(data["board"]);
      setPts(data[playerId]);
    });
    socket.on("recieveMsg", ({ system, Msg }) => {
      setMsgs((prev) => {
        return [...prev, { system, Msg }];
      });
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
        <Row style={{ minHeight: "100vh" }} className="fill-width ">
          <Col className="d-flex flex-column justify-content-center align-items-center ">
            <Board squares={board} onClick={handleClick} />
            <div className="font d-flex  justify-content-center p-4">
              {"Points left: " + pts}
            </div>
            <div className="d-flex  justify-content-center p-4">
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
            </div>
            <div className="d-flex  justify-content-center p-4">
              <Button className="button " onClick={submitBid} disabled={btn}>
                Bid
              </Button>
            </div>

            <div className="font">
              {btn && "Waiting for Other Player to Bid"}
            </div>
            <div className="font">{winner && "Winner: " + winner}</div>
          </Col>

          <Col className="fill-width chat-room chat-visible ">
            <ul className="pages">
              <li className="chat page">
                <div className="chatArea">
                  <ul className="messages">
                    {msgs.map(({ system, Msg }, i) =>
                      system ? (
                        <li className="system-msg" key={i}>
                          {Msg}
                        </li>
                      ) : (
                        <li key={i}>{Msg}</li>
                      )
                    )}
                  </ul>
                </div>
                <input
                  ref={chat}
                  className="inputMessage"
                  placeholder="Type here..."
                />
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Game;

