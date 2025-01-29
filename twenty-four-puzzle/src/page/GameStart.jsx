import {A} from "@solidjs/router";
import PlayCards from "../components/PlayCard.jsx";
import {useAppContext} from "../AppContext.jsx";
import {createEffect, createResource, createSignal, onMount, Show} from "solid-js";

export default function GameStart() {
  const context = useAppContext();
  const isGameStart = () => context.appState.isGameStart;

  function prepareGameStart() {
    context.setAppState("isGameStart", true);
    context.setAppState("isPickingCards", true);
  }

  let panel;
  const [getPanelSize, setPanelSize] = createSignal({width: 0, height: 0});

  onMount(() => {
    if (panel) {
      const resizePanel = new ResizeObserver(entries => {
        for (let entry of entries) {
          setPanelSize({width: entry.contentRect.width, height: entry.contentRect.height});
        }
      })
      resizePanel.observe(panel);
    }
  })

  const flexWrap = true;

  async function fetchCard() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(40);
        resolve(40);
      }, 500);
    });
    return 40;
  }

  createEffect(() => {
    if (context.appState.isPickingCards) {
      console.log("Picking cards...");
      for (let i = 0; i < context.appState.numberOfPickedCards; i++) {
        let [card] = createResource(fetchCard);
        context.setAppState("cardsPicked", (cardsPicked) => [...cardsPicked, card]);
      }
      context.setAppState("isPickingCards", false);
      context.setAppState("finishCreatingPickingCardsResources", true);
      console.log(context.appState.cardsPicked);
    }
  });

  const [getPickedCardsStyleMode, setPickedCardsStyleMode] = createSignal("grid");

  createEffect(() => {
    if (context.appState.cardsPicked.every(item => item.state === "ready") && context.appState.finishPickingCardsAnimations.every(item => item === true)) {
      context.setAppState("finishCardsPicking", true);
      setPickedCardsStyleMode("list");
    }
  })

  return (
    <>
      <div class="flex-grow flex flex-row p-5 overflow-hidden gap-2 items-center">
        <PlayCards ref={el => panel = el} cardsNumber={52} direction="col" styleMode="spinningWheel" animation={true} width="w-[50vw]" height="h-full" cardWidth="w-[15vw]"/>
        <div classList={{
               "flex": true,
               "items-center": true,
               "justify-center": true,
               "gap-2": true,
               "overflow-hidden": true,
               "min-w-fit": !flexWrap,
               "absolute": true
             }}
             style={{
               width: `${getPanelSize().width}px`,
               height: `${getPanelSize().height}px`,
             }}
             >
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
            <PlayCards cardsNumber={context.appState.numberOfPickedCards} direction="row" styleMode={getPickedCardsStyleMode()} cardWidth="w-[15vw]" cols={2} rows={2} dynamic={true}/>
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
