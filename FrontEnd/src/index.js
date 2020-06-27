import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameRoom from "../src/Pages/GameRoom/GameRoom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "../src/Pages/Home/Home";
import * as serviceWorker from "./serviceWorker";
import WaitingRoom from "../src/Pages/WaitingRoom/WaitingRoom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/room">
          <GameRoom />
        </Route>
        <Route path="/waitingroom">
          <WaitingRoom />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
