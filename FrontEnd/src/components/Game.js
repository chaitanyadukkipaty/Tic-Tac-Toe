import React, { useState, useEffect, useRef } from "react";
import "./Game.css";
import Board from "../components/Board";
import { calculateWinner } from "../helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import {
  joinRoom,
  makeMove,
  gameState,
  setMyCharacter,
  reload,
} from "../api/socket/index";
import { placeBid, placeMove } from "../api/https/index";
function Game({ playerId, roomId }) {
  const textInput = useRef();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isMyTurn, setIsMyTrun] = useState(false);
  const [pts, setPts] = useState(100);
  const winner = calculateWinner(board);
  const [myChar, setChar] = useState("");
  const [btn, setBtn] = useState(false);

  //helper functions
  const toggleBid = () => {
    setBtn((current) => !current);
  };

  const disableBid = () => {
    setBtn((current) => true);
  };

  const disableTurn = () => {
    setIsMyTrun((current) => false);
  };

  const enableTurn = () => {
    setIsMyTrun((current) => true);
  };

  const changePts = (data) => {
    setPts(data);
  };

  const changeBoard = (data) => {
    setBoard(data);
  };

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
      const { data } = await placeMove({ payload });
      if (data.status) {
        disableTurn();
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
      const { data } = await placeBid({ payload });
      if (data.status) {
        toggleBid();
      }
    } else {
      toast.error("You don't have enought Points");
    }
  };

  useEffect(() => {
    textInput.current.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        submitBid();
      }
    });
    joinRoom({ roomId, playerId });
    gameState({
      textInput,
      playerId,
      disableBid,
      toggleBid,
      enableTurn,
      changePts,
    });
    setMyCharacter({ myChar, setChar });

    reload({
      playerId,
      enableTurn,
      toggleBid,
      changeBoard,
      changePts,
      textInput,
    });
  }, []);

  useEffect(() => {
    makeMove({ winner, playerId, board, myChar, changeBoard });
  }, [myChar, board]);

  return (
    <>
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
            type="number"
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

      <div className="font">{btn && "Waiting for Other Player to Bid"}</div>
      <div className="font">{winner && "Winner: " + winner}</div>
    </>
  );
}

export default Game;
