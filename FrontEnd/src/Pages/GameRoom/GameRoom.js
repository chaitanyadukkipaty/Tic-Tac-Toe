import React, { useState, useEffect, useRef } from "react";
import "./GameRoom.css";
import Game from "../../components/Game";
import { ToastContainer, Zoom } from "react-toastify";

function GameRoom() {
  return (
    <>
      <ToastContainer
        autoClose={5000}
        transition={Zoom}
        limit={3}
        newestOnTop
      />
      <Game />
    </>
  );
}

export default GameRoom;

