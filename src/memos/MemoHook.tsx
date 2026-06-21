import { useCallback, useState } from "react";
import { MyTitle } from "./ui/MyTitle";
import { MySubtitle } from "./ui/MySubtitle";

export const MemoHook = () => {
  const [title, setTitle] = useState("Hola");
  const [subTitle, setSubTitle] = useState("Mundo");

  const handleCallMyAPI = useCallback(() => {
    console.log("Llamando mi función", subTitle);
  }, [subTitle]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">MemoApp</h1>

      <MyTitle title={title} />
      <MySubtitle subtitle={subTitle} callMyAPI={handleCallMyAPI} />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle("Hello " + new Date().getTime())}
      >
        Cambiar título
      </button>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setSubTitle("World")}
      >
        Cambiar subtítulo
      </button>
    </div>
  );
};
