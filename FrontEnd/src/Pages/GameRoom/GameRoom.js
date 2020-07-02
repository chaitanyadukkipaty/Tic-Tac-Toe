import React from "react";
import "./GameRoom.css";
import Game from "../../components/Game";
import Chat from "../../components/Chat";
import { ToastContainer, Zoom } from "react-toastify";
import { Col, Row, Container } from "react-bootstrap";
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
          autoClose={3000}
          transition={Zoom}
          limit={3}
          hideProgressBar
          newestOnTop
        />
        <Container fluid>
          <Row style={{ minHeight: "100vh", minWidth: "100vw"}} >
            <Col className="d-flex flex-column justify-content-center align-items-center ">
              <Game playerId={playerId} roomId={roomId} />
            </Col>
            <Col className="fill-width chat-room chat-visible">
              <Chat playerId={playerId} roomId={roomId} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default GameRoom;
