import GameRule from "./page/GameRule.jsx";
import Home from "./page/Home.jsx";
import GameStart from "./page/GameStart.jsx";
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
    path: "/game-start",
    component: () => <GameStart/>
  },
  {
    path: "/*all",
    component: () => <FourOhFour/>
  }
]
