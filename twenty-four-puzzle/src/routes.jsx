import GameRule from "./page/GameRule.jsx";
import Home from "./page/Home.jsx";
import Game from "./page/Game.jsx";
import FourOhFour from "./page/404.jsx";

export const routes = [
  {
    path: "/",
    component: () => <Home/>
  },
  {
    path: "/game-rule",
    component: () => <GameRule/>
  },
  {
    path: "/game",
    component: () => <Game/>
  },
  {
    path: "/*all",
    component: () => <FourOhFour/>
  }
]
