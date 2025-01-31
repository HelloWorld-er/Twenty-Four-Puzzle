import {useNavigate} from "@solidjs/router";

export default function GameRule() {
  const navigate = useNavigate();
  return (
    <div class="w-full h-full flex flex-col justify-center items-center">
      <div class="w-[60vw] my-4 mx-auto p-4 text-base rounded-lg shadow-[0_0_5px_#9ca3af]">
        <h2 class="text-lg font-bold">Game Rule</h2>
        <p class="my-2">The 24 Game is an arithmetical card game in which the objective is to find a way to manipulate
          four integers so that the end result is 24.</p>
        <p class="my-2">The game is played with a deck of 52 cards, each card has a number from 1 to 13, and four cards
          are drawn.</p>
        <p class="my-2">The game is played by rearranging the numbers and using the four basic arithmetic operations (+,
          -, *, /) to form an expression that equals 24.</p>
      </div>
      <button
        class="block w-fit mx-auto py-2 px-4 text-lg font-bold rounded-xl shadow-[0_0_5px_#9ca3af] hover:bg-gray-700 hover:text-gray-100"
        onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  )
}
