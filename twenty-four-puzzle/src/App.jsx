import "./style.css";
import {children} from "solid-js";
import Header from "./components/Header";

export default function App(props) {
  const resolved = children(() => props.children)
  return (
     <div class="flex flex-col w-[100vw] h-[100vh]">
      <Header />
      {resolved()}
    </div>
  )
}
