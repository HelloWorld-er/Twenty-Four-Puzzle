import {For} from 'solid-js';

function PlayCard(props) {
  return (
    <div
      class="w-40 h-56 p-4 flex justify-center items-center text-center text-2xl font-bold rounded-xl shadow-[0_0_5px_#9ca3af] bg-play-card-bg bg-cover bg-no-repeat"
      aria-hidden={props.ariaHidden ? "true" : "false"}
    >
      Twenty-Four Puzzle
      <br/>
      Play Card
    </div>
  )
}

export default function PlayCards() {
  const numberOfPlayCards = 52;
  const playCardsArray = [...Array(numberOfPlayCards).keys()];

  return (
    <div class="overflow-hidden m-5">
      <div class="w-fit m-1 flex flex-col gap-4 animate-vertical-marquee">
        <For each={playCardsArray}>
          {() => <PlayCard/>}
        </For>
        <For each={playCardsArray}>
          {() => <PlayCard ariaHidden={true}/>}
        </For>
      </div>
    </div>
  )
}
