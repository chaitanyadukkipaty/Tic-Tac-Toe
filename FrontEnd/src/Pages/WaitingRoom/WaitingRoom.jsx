import React, { useState, useRef, useEffect } from "react";
import "./WaitingRoom.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../config.json";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
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
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={logo} />
      <Card.Body>
        <Card.Title>{username}</Card.Title>
      </Card.Body>
    </Card>
  );
  return (
    <>
      <div className="root">
        {players.length && <p className="font">Players in the Game : </p>}
        <div className="mb-3 avatar">
          {players.map((player, i) => (
            <Avatar key={i} username={player.playerId} />
          ))}
        </div>
        <InputGroup className="mb-3 input">
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
        <Button
          className="button"
          onClick={() => joinRoom()}
          disabled={joinbtn}
        >
          {"Join"}
        </Button>
        <Button
          className="button"
          onClick={() => startGame()}
          disabled={startbtn}
        >
          {"Start"}
        </Button>
      </div>
    </>
  );
}

export default WaitingRoom;
