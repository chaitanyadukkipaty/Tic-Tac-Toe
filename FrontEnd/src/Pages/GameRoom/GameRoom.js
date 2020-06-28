import React, { useState, useEffect, useRef } from "react";
import "./GameRoom.css";
import Game from "../../components/Game";
import Chat from "../../components/Chat";
import { ToastContainer, Zoom } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
function GameRoom() {
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const playerId = path.pop();
  const roomId = path.pop();

  return (
    <>
      <div className="root">
        <ToastContainer
          autoClose={5000}
          transition={Zoom}
          limit={3}
          newestOnTop
        />
        <Row style={{ minHeight: "100vh" }} className="fill-width ">
          <Col className="d-flex flex-column justify-content-center align-items-center ">
            <Game playerId={playerId} roomId={roomId} />
          </Col>

          <Col className="fill-width chat-room chat-visible">
            <Chat playerId={playerId} roomId={roomId} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default GameRoom;
