import "./style.css";
import Header from "./components/Header";
import {Router} from "@solidjs/router";
import {routes} from "./routes";
import {AppContextProvider} from "./AppContext.jsx";

export default function App() {
  return (
    <main class="flex flex-col w-[100vw] h-[100vh] overflow-hidden relative">
      <AppContextProvider>
        <Header/>
        <Router>
          {routes}
        </Router>
      </AppContextProvider>
    </main>
  )
}
