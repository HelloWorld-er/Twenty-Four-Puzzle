import {createSignal, For, Match, onCleanup, onMount, Show, Switch} from 'solid-js';
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
  const context = useAppContext();
  onMount(() => {
    console.log("PlayCard mounted");
  })
  return (
    <Show when={props.dynamic && context.appState.finishCreatingPickingCardsResources && context.appState.cardsPicked[props.index].state === "ready"}
          fallback={
            <div
              classList={{
                [props.width]: !!props.width,
                "min-w-20": true,
                "box-border": true,
                "aspect-[5/7]": true,
                "flex": true,
                "items-center": true,
                "justify-center": true,
                "flex-shrink": true,
                "text-center": true,
                "font-bold": true,
                "rounded-xl": true,
                "shadow-[0_0_5px_#9ca3af]": true,
                "bg-[url(./img/play-card-bg.svg)]": true,
                "bg-cover": true,
                "bg-no-repeat": true,
                "bg-white": true
              }}
              style={props.style}
              aria-hidden={props.ariaHidden ? "true" : "false"}
            >
              <span class="overflow-hidden text-ellipsis">Twenty-Four Puzzle Play Card</span>
            </div>
          }
    >
      <div
        on:animationend={() => context.setAppState("finishPickingCardsAnimations", (previousStates) => [...previousStates, true])}
        classList={{
          [props.width]: !!props.width,
          "min-w-20": true,
          "box-border": true,
          "aspect-[5/7]": true,
          "flex": true,
          "items-center": true,
          "justify-center": true,
          "flex-shrink": true,
          "text-center": true,
          "text-5xl": true,
          "font-bold": true,
          "rounded-xl": true,
          "shadow-[0_0_5px_#9ca3af]": true,
          "bg-[url(./img/play-card-bg.svg)]": true,
          "bg-cover": true,
          "bg-no-repeat": true,
          "bg-white": true,
          "animate-once-vertical-rotate": true
        }}
        style={props.style}
        aria-hidden={props.ariaHidden ? "true" : "false"}
      >
        <span class="overflow-hidden text-ellipsis">{context.appState.cardsPicked[props.index]()}</span>
      </div>
    </Show>
  )
}

export default function PlayCards(props) {
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

  return (
    <>
      <div
        ref={props.ref}
        classList={{
          "animate-vertical-marquee": props.styleMode === "marquee" && props.animation && props.direction === "col",
          "animate-horizontal-marquee": props.styleMode === "marquee" && props.animation && props.direction === "row",
          "m-1": true,
          "flex": props.styleMode !== "grid",
          "grid": props.styleMode === "grid",
          "flex-col": props.styleMode !== "grid" && (props.styleMode === "spinningWheel" || props.direction === "col"),
          "flex-row": props.styleMode !== "grid" && (props.styleMode === "spinningWheel" || props.direction === "row"),
          "items-center": true,
          "justify-center": true,
          "w-full": !props.width,
          "h-full": !props.height,
          [props.width]: !!props.width,
          [props.height]: !!props.height,
          "place-items-center": props.styleMode === "grid",
          "gap-4": props.styleMode !== "spinningWheel",
        }}
        style={{
          "grid-template-columns": `repeat(${props.cols}, minmax(0, 1fr))`,
          "grid-template-rows": `repeat(${props.rows}, minmax(0, 1fr))`,
        }}
      >
        <Switch fallback={<></>}>
          <Match when={props.styleMode === "list" || props.styleMode === "marquee"}>
            <For each={playCardsArray.slice(0, props.cardsNumber)}>
              {(item) => <PlayCard width={props.cardWidth} styleMode={props.styleMode} dynamic={props.dynamic} index={item}/>}
            </For>
            <Show when={props.animation}>
              <For each={playCardsArray.slice(0, props.cardsNumber)}>
                {(item) => <PlayCard width={props.cardWidth} styleMode={props.styleMode} ariaHidden={true} dynamic={props.dynamic} index={item}/>}
              </For>
            </Show>
          </Match>
          <Match when={props.styleMode === "grid"}>
            <For each={playCardsArray.slice(0, props.cardsNumber)}>
              {(item) => <PlayCard width={props.cardWidth} styleMode={props.styleMode} dynamic={props.dynamic} index={item}/>}
            </For>
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
                            dynamic={props.dynamic}
                            index={item}
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
