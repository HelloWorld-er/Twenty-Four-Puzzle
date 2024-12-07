import { Show } from "solid-js";

export default function Header() {
  return (
    <Show when={True}>
      <div class="w-1/2 max-w-fit mt-4 mx-auto py-4 px-10 text-center text-xl border-2 border-gray-400 rounded-xl">
        Welcome to play
        <h1 class="text-2xl font-bold underline underline-offset-2 decoration-2 decoration-red-600">
          Twenty Four Puzzle
        </h1>
      </div>
    </Show>
  );
}
