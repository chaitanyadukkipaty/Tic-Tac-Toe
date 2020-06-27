import React, { useState, useRef, useEffect } from "react";
import "./WaitingRoom.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../config.json";
import {
  Card,
  Button,
  InputGroup,
  FormControl,
  Col,
  Row,
} from "react-bootstrap";
import logo from "../../assets/images/avatar.png";
import openSocket from "socket.io-client";
const socket = openSocket(baseUrl);

function WaitingRoom() {
  const textInput = useRef();
  const [players, setPlayers] = useState([]);
  const { pathname } = useLocation();
  const roomId = pathname.split("/").pop();
  const [joinbtn, setJoinbtn] = useState(false);
  const [startbtn, setStartbtn] = useState(true);

  async function joinRoom() {
    const username = textInput.current.value;
    const payload = { roomId: roomId, playerId: username };
    socket.emit("joinRoom", payload);
  }

  async function startGame() {
    const username = textInput.current.value;
    const path = `/room/${roomId}/${username}`;
    console.log(path);
    window.location.href = path;
  }

  useEffect(() => {
    textInput.current.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        joinRoom();
      }
    });
    async function getData() {
      const payload = { roomId: roomId };
      const { data } = await axios.post(`${baseUrl}/getPlayers`, payload);
      setPlayers((prev) => data);
      if (data.length === 2) {
        setStartbtn((current) => !current);
        setJoinbtn((current) => !current);
      }
    }
    socket.on("joined", (data) => {
      setPlayers(data);
      if (data.length === 2) {
        setStartbtn((current) => !current);
        setJoinbtn((current) => !current);
      }
    });
    getData();
  }, []);

  const Avatar = ({ username }) => (
    <Card className="player-card">
      <Card.Img variant="top" src={logo} />
      <Card.Body>
        <Card.Title>{username}</Card.Title>
      </Card.Body>
    </Card>
  );
  return (
    <>
      <div className="root">
        <Row className="fill-width">
          <Col
            md={6}
            className="d-flex flex-column justify-content-between fill-height"
          >
            {players.length === 0 && (
              <div className="font text-center">
                Waiting for players to join:{" "}
              </div>
            )}
            {players.length > 0 && (
              <div className="font text-center">Players in the Game : </div>
            )}
            <Row className=" d-flex  justify-content-center p-4 ">
              {players.map((player, i) => (
                <Col md={5} xs={6} className="p-2">
                  <Avatar key={i} username={player.playerId} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col className="p-4 d-flex flex-column justify-content-center" md={6}>
            <div className="d-flex  justify-content-center p-4">
              <InputGroup className=" input">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  ref={textInput}
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>
            <Row>
              {!joinbtn ? (
                <Col className=" d-flex  justify-content-center p-4 ">
                  <Button
                    className="button"
                    onClick={() => joinRoom()}
                    disabled={joinbtn}
                  >
                    {"Join"}
                  </Button>
                </Col>
              ) : (
                <Col className=" d-flex  justify-content-center p-4 ">
                  <Button
                    className="button"
                    onClick={() => startGame()}
                    disabled={startbtn}
                  >
                    {"Start"}
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default WaitingRoom;

