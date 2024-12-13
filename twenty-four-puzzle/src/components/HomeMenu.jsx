import {A} from "@solidjs/router";

export default function HomeMenu() {
  return (
    <>
      <nav class="flex-grow flex flex-col justify-center items-center">
        <A
          class="w-fit h-fit mx-auto my-2 p-4 text-lg font-bold rounded-xl shadow-[0_0_5px_#9ca3af] hover:bg-gray-700 hover:text-gray-100"
          href="/game-rule"
        >
          Game Rule
        </A>
        <A
          class="w-fit  h-fit mx-auto my-2 p-4 text-lg font-bold rounded-xl shadow-[0_0_5px_#9ca3af] hover:bg-gray-700 hover:text-gray-100"
          href="/game-start"
        >
          Start Game
        </A>
      </nav>
    </>
  )
}
