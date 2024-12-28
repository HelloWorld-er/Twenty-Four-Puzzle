import {A} from "@solidjs/router";
import PlayCards from "../components/PlayCard.jsx";
import {useAppContext} from "../AppContext.jsx";
import {Show} from "solid-js";

export default function GameStart() {
  const context = useAppContext();
  const isGameStart = () => context.appState.isGameStart;

  function prepareGameStart() {
    context.setAppState("isGameStart", true);
    context.setAppState("isPickingCards", true);
  }

  return (
    <>
      <div class="flex-grow flex flex-row p-5 overflow-hidden gap-2">
        <PlayCards cardsNumber={52} direction="col" styleMode="spinningWheel" animation={true} cardWidth="w-[15vw]"/>
        <div class="flex-grow flex items-center justify-center gap-2 overflow-hidden min-w-fit">
          <Show when={isGameStart()}
                fallback={
                  <button
                    class="w-fit h-fit mx-auto my-2 p-4 text-lg font-bold rounded-xl shadow-[0_0_5px_#9ca3af] hover:bg-gray-700 hover:text-gray-100"
                    onClick={prepareGameStart}
                  >
                    Start
                  </button>
                }
          >
            <PlayCards cardsNumber={4} direction="row" styleMode="list" cardWidth="w-[15vw]"/>
          </Show>
        </div>
      </div>
      <A
        class="block absolute right-5 bottom-5 w-fit py-2 px-4 text-lg font-bold text-white bg-red-600 rounded-xl shadow-[0_0_5px_#9ca3af] hover:bg-gray-700 hover:text-gray-100"
        href="/"
        onClick={context.reset()}
      >
        {isGameStart() ? "Stop" : "Back"}
      </A>
    </>
  )
}
