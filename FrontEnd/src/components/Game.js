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
  disconnected,
  Reset,
} from "../api/socket/index";
import { placeBid, placeMove, getPlayers, resetGame } from "../api/https/index";
function Game({ playerId, roomId }) {
  const textInput = useRef();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isMyTurn, setIsMyTrun] = useState(false);
  const [pts, setPts] = useState(100);
  const winner = calculateWinner(board);
  const [myChar, setChar] = useState("");
  const [btn, setBtn] = useState(false);
  const [players, setPlayers] = useState([]);
  const [isDraw, setDraw] = useState(false);

  //helper functions
  const toggleBid = () => {
    setBtn((current) => !current);
  };

  const disableBid = () => {
    setBtn((current) => true);
  };

  const enableBid = () => {
    setBtn((current) => false);
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

  const reset = async () => {
    const payload = { roomId: roomId };
    await resetGame({ payload });
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
      enableBid,
      enableTurn,
      changePts,
      setDraw,
    });
    Reset({
      playerId,
      changeBoard,
      changePts,
      setDraw,
      enableBid,
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
    disconnected();
    const addPlayers = async () => {
      const payload = { roomId: roomId };
      const data = await getPlayers({ payload });
      setPlayers((prev) => [...data.players]);
    };
    addPlayers();
  }, []);

  useEffect(() => {
    makeMove({ winner, playerId, board, myChar, changeBoard });
  }, [myChar, board]);

  useEffect(() => {
    console.log(isDraw);
  }, [isDraw]);
  return (
    <>
      {isMyTurn && (
        <div className="font d-flex  justify-content-center p-4">
          {"Place your Move"}
        </div>
      )}
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
        <Button
          className="button "
          onClick={submitBid}
          disabled={btn || isMyTurn || isDraw || winner}
        >
          Bid
        </Button>
      </div>

      <div className="font">
        {btn && !isDraw && "Waiting for Other Player to Bid"}
      </div>
      <div className="font">
        {winner &&
          "Winner: " +
            (winner === players[0].Character
              ? players[0].playerId
              : players[1].playerId)}
        {(isDraw || winner) && (
          <div className="d-flex  justify-content-center p-4">
            <Button className="button " onClick={reset}>
              Reset
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Game;
