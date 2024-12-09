import { Show } from "solid-js";

export default function Header() {
  return (
    <Show when={true}>
      <header class="h-fit bg-slate-100 border-b-slate-300 border-b-2">
        <div class="max-w-fit my-4 mx-auto py-4 px-10 text-2xl">
          Welcome to play
          <span class="ms-2 text-4xl text-nowrap font-bold underline underline-offset-2 decoration-2 decoration-red-600">
            Twenty-Four Puzzle
          </span>
        </div>
      </header>
    </Show>
  );
}
