import React, { useState, useRef } from "react";
import "./Home.css";
import axios from "axios";
import { baseUrl } from "../../config.json";
import { Card, Navbar, Button, InputGroup, FormControl } from "react-bootstrap";

function Home() {
  const textInput = useRef();
  async function createRoom() {
    const { data } = await axios.post(baseUrl);
    const path = `/waitingroom/${data.room}`;
    console.log(path);
    window.location.href = path;
  }
  return (
    <>
      <div className="root">
        <Navbar
          collapseOnSelect
          className="nav-color"
          expand="lg"
          variant="dark"
        >
          <Navbar.Brand>Tic-Tac-Toe</Navbar.Brand>
        </Navbar>
        <div className="Home">
          <div className="rules">
            <Card className="card">
              <Card.Title className="card-title">Rules</Card.Title>
              <Card.Body className="card-body">
                <ul>
                  <li>
                    Unlike Regular Tic Tac Toe 'X' doesnt always start first.
                  </li>
                  <li>
                    Each player begins with 100 points. Players can use these
                    points to place bids
                  </li>
                  <li>
                    Turns are decided by the bids placed by the players. The
                    Player with bigger bid wins round and can freely place
                    his/her move
                  </li>
                  <li>
                    If both players reach 0 points before winning then the game
                    is considered a draw
                  </li>
                  <li>
                    If both players bid the same points then its considered draw
                    and they have to bid again
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </div>

          <div className="start-game">
            {/* <p className="font">To Start Enter Your Name</p>
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
            </InputGroup> */}
            <Button className="button" onClick={() => createRoom()}>
              {"Start"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
