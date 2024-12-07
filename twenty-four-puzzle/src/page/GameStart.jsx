import {A} from "@solidjs/router";
import PlayCard from "../components/PlayCard.jsx";

export default function GameStart() {
  return (
    <>
      <PlayCard />
      <A
        class="block absolute right-5 bottom-5 w-fit py-2 px-4 text-lg font-bold text-white bg-red-600 rounded-xl shadow-[0_0_5px_#9ca3af] hover:bg-gray-700 hover:text-gray-100"
        href="/">
        Stop
      </A>
    </>
  )
}
