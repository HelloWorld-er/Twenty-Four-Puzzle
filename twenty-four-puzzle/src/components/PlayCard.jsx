import {createEffect, For, Show} from 'solid-js';
import {useAppContext} from "../AppContext.jsx";

export function PlayCard(props) {
  return (
    <div
      classList={{
        [props.width]: !!props.width,
        "min-w-24": true,
        "box-border": true,
        "aspect-[5/7]": true,
        "flex": true,
        "flex-shrink": true,
        "text-center": true,
        "text-xl": true,
        "font-bold": true,
        "rounded-xl": true,
        "shadow-[0_0_5px_#9ca3af]": true,
        "bg-play-card-bg": true,
        "bg-cover": true,
        "bg-no-repeat": true
      }}
      aria-hidden={props.ariaHidden ? "true" : "false"}
    >
      <span class="m-auto overflow-hidden text-ellipsis">Twenty-Four Puzzle Play Card</span>
    </div>
  )
}

export default function PlayCards(props) {
  const context = useAppContext();

  const numberOfPlayCards = 52;
  const playCardsArray = [...Array(numberOfPlayCards).keys()];

  const isPickingCards = () => context.appState.isPickingCards;

  createEffect(async () => {
    if (isPickingCards()) {
      await new Promise(resolve => setTimeout(resolve, 50));
      context.setAppState("isPickingCards", false);
    }
  })

  return (
    <>
      <div
        classList={{
          "animate-vertical-marquee": props.style === "marquee" && props.animation && props.direction === "col",
          "animate-horizontal-marquee": props.style === "marquee" && props.animation && props.direction === "row",
          "m-1": true,
          "flex": true,
          "flex-col": props.direction === "col",
          "flex-row": props.direction === "row",
          "items-center": true,
          "justify-center": true,
          "w-fit": true,
          "h-fit": true,
          "gap-4": true
        }}
      >
        <For each={playCardsArray.slice(0, props.cardsNumber)}>
          {() => <PlayCard width={props.cardWidth}/>}
        </For>
        <Show when={props.animation}>
          <For each={playCardsArray.slice(0, props.cardsNumber)}>
            {() => <PlayCard width={props.cardWidth} ariaHidden={true}/>}
          </For>
        </Show>
      </div>
    </>
  )
}
