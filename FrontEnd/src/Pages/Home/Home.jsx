import React from "react";
import "./Home.css";
import axios from "axios";
import { baseUrl } from "../../config.json";
import { Card, Navbar, Button, Container, Col } from "react-bootstrap";

function Home() {
  async function createRoom() {
    const { data } = await axios.post(baseUrl);
    const path = `/waitingroom/${data.room}`;
    console.log(path);
    window.location.href = path;
  }
  return (
    <>
      <div className="home-container">
        <Container fluid>
          <Navbar className="nav-color" expand="lg" variant="dark">
            <Navbar.Brand>Big-Bad-Joe</Navbar.Brand>
          </Navbar>
          <Col
            md={{ span: 6, offset: 3 }}
            className="d-flex flex-column justify-content-around fill "
          >
            <div className="p-2">
              <Card className="card">
                <Card.Title className="card-title">Rules</Card.Title>
                <Card.Body className="text-justify">
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
                      If both players reach 0 points before winning then the
                      game is considered a draw
                    </li>
                    <li>
                      If both players bid the same points then its considered
                      draw and they have to bid again
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </div>
            <div className=" d-flex  justify-content-center p-2 ">
              <Button className="button" onClick={() => createRoom()}>
                {"Start"}
              </Button>
            </div>
          </Col>
        </Container>
      </div>
    </>
  );
}

export default Home;
