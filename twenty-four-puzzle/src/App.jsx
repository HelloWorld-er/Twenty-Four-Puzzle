import "./style.css";
import Header from "./components/Header";
import {Router} from "@solidjs/router";
import {routes} from "./routes";

export default function App() {
  return (
    <main class="flex flex-col w-[100vw] h-[100vh]">
      <Header />
      <Router>
        {routes}
      </Router>
    </main>
  )
}
