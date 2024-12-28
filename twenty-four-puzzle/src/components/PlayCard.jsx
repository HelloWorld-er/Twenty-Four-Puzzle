import {createEffect, createSignal, For, Match, onCleanup, onMount, Show, Switch} from 'solid-js';
import {useAppContext} from "../AppContext.jsx";

function convertToPixel(value) {
  const regex = /^(\d+\.?\d*)(\D+)$/;
  const match = value.match(regex);
  if (match) {
    const number = parseFloat(match[1]);
    const unit = match[2];
    if (unit === "rem") {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      return number * rootFontSize;
    }
    else if (unit === "vw") {
      return number * window.innerWidth / 100;
    }
    else if (unit === "vh") {
      return number * window.innerHeight / 100;
    }
    else {
      return number; // assume the number itself is already in pixels
    }
  }
  else {
    return null;
  }
}

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
        "bg-no-repeat": true,
        "bg-white": true
      }}
      style={props.style}
      aria-hidden={props.ariaHidden ? "true" : "false"}
    >
      <span class="m-auto overflow-hidden text-ellipsis">Twenty-Four Puzzle Play Card</span>
    </div>
  )
}

export default function PlayCards(props) {
  const context = useAppContext();
  const getCardWidth = () => convertToPixel(props.cardWidth.startsWith("w-[") && props.cardWidth.endsWith("]") ? props.cardWidth.slice(3, -1).trim() : "6rem");
  const getCardHeight = () => getCardWidth() + "/ 5 * 7";

  const [radius, setRadius] = createSignal(window.innerWidth / 2);
  const handleWindowResize = () => {
    setRadius(window.innerWidth / 2);
  }

  let spinningWheelContainer;
  const [spinningWheelContainerWidth, setSpinningWheelContainerWidth] = createSignal(0);
  const [spinningWheelContainerHeight, setSpinningWheelContainerHeight] = createSignal(0);

  onMount(() => {
    if (props.styleMode === "spinningWheel") {
      window.addEventListener("resize", handleWindowResize);
      if (spinningWheelContainer) {
        const resizeSpinningWheelObserver = new ResizeObserver(entries => {
          for (let entry of entries) {
            setSpinningWheelContainerWidth(entry.contentRect.width);
            setSpinningWheelContainerHeight(entry.contentRect.height);
          }
        })
        resizeSpinningWheelObserver.observe(spinningWheelContainer);
      }
    }
  })

  onCleanup(() => {
    if (props.styleMode === "spinningWheel") {
      window.removeEventListener("resize", handleWindowResize);
    }
  })

  const numberOfPlayCards = 52;
  const playCardsArray = [...Array(numberOfPlayCards).keys()];

  const isPickingCards = () => context.appState.isPickingCards;

  createEffect(async () => {
    if (isPickingCards()) {
      await new Promise(resolve => setTimeout(resolve, 50000));
      context.setAppState("isPickingCards", false);
    }
  })

  return (
    <>
      <div
        classList={{
          "animate-vertical-marquee": props.styleMode === "marquee" && props.animation && props.direction === "col",
          "animate-horizontal-marquee": props.styleMode === "marquee" && props.animation && props.direction === "row",
          "m-1": true,
          "flex": true,
          "flex-col": props.styleMode === "spinningWheel" || props.direction === "col",
          "flex-row": props.styleMode === "spinningWheel" || props.direction === "row",
          "items-center": true,
          "justify-center": true,
          "w-fit": props.styleMode !== "spinningWheel",
          "h-fit": props.styleMode !== "spinningWheel",
          "w-[50vw]": props.styleMode === "spinningWheel", // only for GameStart Page
          "h-full": props.styleMode === "spinningWheel", // only for GameStart Page
          "gap-4": props.styleMode !== "spinningWheel",
        }}
      >
        <Switch fallback={<></>}>
          <Match when={props.styleMode === "list" || props.styleMode === "marquee"}>
            <For each={playCardsArray.slice(0, props.cardsNumber)}>
              {() => <PlayCard width={props.cardWidth} styleMode={props.styleMode}/>}
            </For>
            <Show when={props.animation}>
              <For each={playCardsArray.slice(0, props.cardsNumber)}>
                {() => <PlayCard width={props.cardWidth} styleMode={props.styleMode} ariaHidden={true}/>}
              </For>
            </Show>
          </Match>
          <Match when={props.styleMode === "spinningWheel"}>
            <div ref={el => spinningWheelContainer=el}
                 classList={{
                   "animate-spinning-wheel": props.animation,
                   "h-full": true,
                   "aspect-square": true,
                   "flex": true,
                   "flex-col": true
                 }}
            >
              <For each={playCardsArray.slice(0, props.cardsNumber)}>
                {(item, index) =>
                  <PlayCard width={props.cardWidth}
                            styleMode={props.styleMode}
                            style={{
                              transform: `translate(calc(${spinningWheelContainerWidth()}px / 2 - ${getCardWidth()}px / 2), calc(${spinningWheelContainerHeight()}px / 2 - ${getCardHeight()}px / 2 - ${getCardHeight()}px * ${index()})) matrix(cos(calc(360deg / ${numberOfPlayCards} * ${index()})), sin(calc(360deg / ${numberOfPlayCards} * ${index()})), calc(-1 * sin(calc(360deg / ${numberOfPlayCards} * ${index()}))), cos(calc(360deg / ${numberOfPlayCards} * ${index()})), calc(${radius()} * sin(calc(360deg / ${numberOfPlayCards} * ${index()}))), calc(-1 * ${radius()} * cos(calc(360deg / ${numberOfPlayCards} * ${index()}))))`,
                              }}
                  />
                }
              </For>
            </div>
          </Match>
        </Switch>
      </div>
    </>
  )
}
