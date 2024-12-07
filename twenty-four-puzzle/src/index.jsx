/* @refresh reload */
import {render} from "solid-js/web";
import {Router, Route} from "@solidjs/router";
import App from "./App.jsx";
import GameRule from "./page/GameRule.jsx";
import Home from "./page/Home.jsx";
import GameStart from "./page/GameStart.jsx";

render(() => (
  <Router root={App}>
    <Route path={["/", "/home"]} component={Home} />
    <Route path="/game-rule" component={GameRule} />
    <Route path="/game-start" component={GameStart} />
  </Router>
), document.getElementById("root"));
