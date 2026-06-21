import { useCounter } from "@/Pokemon/Hook/useCounter";

export const MemoCounter = () => {
  const { count, increment } = useCounter(30_000);
  const { count: counter, increment: increment2 } = useCounter(30_000);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Memo - useMemo</h1>

      <hr />

      <h4>Counter: {count}</h4>
      <h4>Counter: {counter}</h4>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={increment}
      >
        +1
      </button>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={increment2}
      >
        +1 - Counter2
      </button>
    </div>
  );
};
