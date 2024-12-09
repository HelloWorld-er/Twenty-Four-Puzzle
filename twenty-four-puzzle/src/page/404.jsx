import {useNavigate} from "@solidjs/router";

export default function FourOhFour() {
  const navigate = useNavigate();
  return (
    <div class="flex-grow flex flex-col justify-center items-center">
      <h1 class="text-3xl font-bold m-5">Page not found</h1>
      <button
        class="block w-fit py-2 px-4 text-lg font-bold rounded-xl shadow-[0_0_5px_#9ca3af] hover:bg-gray-700 hover:text-gray-100"
        onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  )
}
