import {A} from "@solidjs/router";
import PlayCards from "../components/PlayCard.jsx";
import {useAppContext} from "../AppContext.jsx";
import {createEffect, createResource, createSignal, For, onMount, Show} from "solid-js";
import { invoke } from '@tauri-apps/api/core';

export default function Game() {
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

  function convertCardsToNumber (character) {
    if (character === "J") {
      return 11;
    }
    else if (character === "Q") {
      return 12;
    }
    else if (character === "K") {
      return 13;
    }
    else {
      return Number(character);
    }
  }

  async function fetchCard() {
    const randomNumber = Math.floor(Math.random() * (13 - 1 + 1)) + 1;
    if (randomNumber <= 10) {
      return String(randomNumber);
    }
    else if (randomNumber === 11) {
      return "J";
    }
    else if (randomNumber === 12) {
      return "Q";
    }
    else if (randomNumber === 13) {
      return "K";
    }
    return "Invalid";
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

  createEffect(() => {
    if (context.appState.numberOfPickedCards === context.appState.cardsPicked.length && context.appState.numberOfPickedCards === context.appState.finishPickingCardsAnimations.length && context.appState.cardsPicked.every(item => item.state === "ready") && context.appState.finishPickingCardsAnimations.every(item => item)) {
      context.setAppState("finishCardsPicking", true);
    }
  })

  const [isWindowPopup, setIsWindowPopup] = createSignal(false);
  const [hasSolution, setHasSolution] = createSignal(true);

  const [getInputValue, setInputValue] = createSignal("");

  const [isCheckingAnswer, setIsCheckingAnswer] = createSignal(false)
  const [getMessage, setMessage] = createSignal("");

  async function checkAnswer() {
    setIsCheckingAnswer(true);
    if (hasSolution()) {
      let answer = await invoke("eval_expression", {expression: getInputValue()});
      let isMatchFormat = await invoke("check_expression_format", {expression: getInputValue(), a: convertCardsToNumber(context.appState.cardsPicked[0]()), b: convertCardsToNumber(context.appState.cardsPicked[1]()), c: convertCardsToNumber(context.appState.cardsPicked[2]()), d: convertCardsToNumber(context.appState.cardsPicked[3]())});
      console.log(isMatchFormat)
      console.log(answer);
      if (isMatchFormat && Number(answer) === 24) {
        setMessage("You are right! This is a correct solution!");
      }
      else if (!isMatchFormat) {
        setMessage("The expression format is incorrect!");
      }
      else {
        setMessage("You are wrong! The answer is incorrect!");
      }
    }
    else {
      let ifHasSolution = await invoke("solve", {a: convertCardsToNumber(context.appState.cardsPicked[0]()), b: convertCardsToNumber(context.appState.cardsPicked[1]()), c: convertCardsToNumber(context.appState.cardsPicked[2]()), d: convertCardsToNumber(context.appState.cardsPicked[3]())});
      if (ifHasSolution) {
        setMessage("There is a solution!");
      }
      else {
        setMessage("You are right! There is no solution!");
      }
    }
    setIsCheckingAnswer(false);
    context.setAppState("getAnswer", true);
  }

  return (
    <>
      <div class="w-full h-full flex flex-row p-5 overflow-hidden gap-2 items-center">
        <PlayCards ref={el => panel = el} cardsNumber={52} direction="col" styleMode="spinningWheel" animation={true} width="w-[50vw]" height="h-full" cardWidth="w-[15vw]"/>
        <div classList={{
               "flex": true,
               "flex-col": true,
               "items-center": true,
               "justify-center": true,
               "gap-2": true,
               "overflow-hidden": true,
               "min-w-fit": !flexWrap,
               "absolute": true,
               "p-1": true,
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
            <PlayCards cardsNumber={context.appState.numberOfPickedCards} direction="row" styleMode="list" cardWidth="w-full" dynamic={true}/>
            <Show when={context.appState.finishCardsPicking}>
              <button
                class="w-fit h-fit mx-auto my-1 py-2 px-4 text-lg font-bold rounded-xl shadow-[0_0_5px_#9ca3af] hover:bg-gray-700 hover:text-gray-100"
                onClick={() => setIsWindowPopup(true)}
              >
                Input Your Answer
              </button>
            </Show>
          </Show>
        </div>
      </div>
      <A
        class="block absolute right-5 bottom-5 w-fit py-2 px-4 text-lg font-bold text-white bg-red-600 rounded-xl shadow-[0_0_5px_#9ca3af] hover:bg-gray-700 hover:text-gray-100"
        href="/"
        onClick={() => context.reset()}
      >
        {isGameStart() ? "Stop" : "Back"}
      </A>
      <Show when={isWindowPopup()}>
        <div id="window-popup-portal"
             class="absolute"
             classList={{
               "absolute": true,
               "inset-5": true,
               "rounded-xl": true,
               "bg-slate-200": true,
               "shadow-[0_0_5px_#9ca3af]": true,
               "p-5": true,
               "flex": true,
               "flex-col": true,
               "gap-4": true,
               "items-center": true,
               "justify-center": true,
               "text-center": true,
             }}>
          <div class="flex flex-row gap-4">
            <span>The four given numbers: </span>
            <For each={context.appState.cardsPicked}>
              {(item) => {
                console.log(item());
                return <div>{convertCardsToNumber(item())}</div>
              }}
            </For>
          </div>
          <p>The equation only contains '+', '-', '*', '/', '(', ')' and the four given numbers</p>
          <p>Do you think there is a solution by using those operators and the four given numbers to calculate 24?</p>
          <div class="flex flex-row gap-4 items-center justify-center">
            <label
              classList={{
                "inline-block": true,
                "px-4": true,
                "py-2": true,
                "rounded-lg": true,
                "border-1": true,
                "border-slate-700": true,
                "hover:bg-slate-700": true,
                "hover:text-slate-50": true,
                "bg-slate-500": hasSolution(),
                "text-slate-50": hasSolution()
              }}>
              <input type="radio" name="has-solution" value="true" class="hidden" checked={hasSolution()}
                     onClick={() => setHasSolution(true)}/>
              Yes
            </label>
            <label
              classList={{
                "inline-block": true,
                "px-4": true,
                "py-2": true,
                "rounded-lg": true,
                "border-1": true,
                "border-slate-700": true,
                "hover:bg-slate-700": true,
                "hover:text-slate-50": true,
                "bg-slate-500": !hasSolution(),
                "text-slate-50": !hasSolution()
              }}>
              <input type="radio" name="has-solution" value="false" class="hidden" checked={hasSolution()}
                     onClick={() => setHasSolution(false)}/>
              No
            </label>
          </div>
          <div class="flex flex-row gap-4 items-center justify-center">
            <Show when={hasSolution()}>
              <input type="text"
                     class="w-48 h-fit text-base p-2 rounded-xl border-1 border-slate-700"
                     on:input={(e) => setInputValue(e.target.value)}
              />
            </Show>
            <button
              classList={{
                "block": true,
                "w-fit": true,
                "py-2": true,
                "px-4": true,
                "text-lg": true,
                "font-bold": true,
                "text-white": true,
                "bg-red-600": true,
                "rounded-xl": true,
                "shadow-[0_0_5px_#9ca3af]": true,
                "hover:bg-gray-700": true,
                "hover:text-gray-100": true,
                "opacity-50": hasSolution() && getInputValue() === "",
                "flex": true,
                "flex-row": true,
                "gap-2": true
              }}
              disabled={hasSolution() && getInputValue() === ""}
              onClick={checkAnswer}
            >
              <Show when={isCheckingAnswer()}>
                <div class="w-[1rem] m-auto aspect-square animate-spin border-2 border-white/60 border-l-white rounded-full"></div>
              </Show>
              Confirm
            </button>
          </div>
          <Show when={context.appState.getAnswer}>
            <p class="font-bold my-8">{getMessage()}</p>
          </Show>
          <A
            class="block absolute right-5 bottom-5 w-fit py-2 px-4 text-lg font-bold text-white bg-red-600 rounded-xl shadow-[0_0_5px_#9ca3af] hover:bg-gray-700 hover:text-gray-100"
            href="/"
            onClick={() => context.reset()}
          >
            {context.appState.getAnswer ? "Finish" : "Stop"}
          </A>
        </div>
      </Show>
    </>
)
}
