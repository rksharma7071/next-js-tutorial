import { useState } from "react";

export const Counter = () => {
  const [inc, setInc] = useState(0);

  return <button
    onClick={() => setInc((prev) => prev + 1)}
    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-teal-700 hover:shadow-md dark:bg-teal-500 dark:hover:bg-teal-400"
  >Add - {inc}</button>

}