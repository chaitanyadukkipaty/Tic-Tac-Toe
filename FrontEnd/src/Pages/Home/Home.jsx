import React from "react";
import "./Home.css";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { getNewRoom, joinExistingRoom } from "../../api/https/index";
import { Card, Navbar, Button, Container, Col, Row } from "react-bootstrap";

function Home() {
  async function createRoom() {
    const { data } = await getNewRoom();
    const path = `/waitingroom/${data.room}`;
    console.log(path);
    window.location.href = path;
  }
  async function join() {
    const { data } = await joinExistingRoom();
    if (data.length === 0 && Array.isArray(data)) {
      toast.error("No Rooms Available, create new Room to play");
      return;
    }
    const path = `/waitingroom/${data[0].roomId}`;
    console.log(path);
    window.location.href = path;
  }
  return (
    <>
      <ToastContainer
        autoClose={5000}
        transition={Zoom}
        limit={3}
        newestOnTop
      />
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
            <Row className=" d-flex  justify-content-center">
              <div className=" p-2 ">
                <Button className="button" onClick={() => createRoom()}>
                  {"Create New Room"}
                </Button>
              </div>
              <div className=" p-2 ">
                <Button className="button" onClick={() => join()}>
                  {"Join Existing Room"}
                </Button>
              </div>
            </Row>
          </Col>
        </Container>
      </div>
    </>
  );
}

export default Home;
