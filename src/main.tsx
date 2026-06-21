import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import { HooksApp } from './HooksApp'
// import { TrafficLight } from './useState/TrafficLight'
// import { TrafficLightWithEffect } from './useEffect/TrafficLightWithEffect'
// import { TrafficLightWithEffectHook } from './useEffect/TrafficLightWithEffectHook'
// import { PokemonPage } from './Pokemon/PokemonPage'
// import { FocusScreen } from './useRef/FocusScreen'
// import { TasksApp } from './useReducer/TasksApp'
// import { ScrambleWords } from './useReducer/ScrambleWords'
// import { MemoHook } from './memos/MemoHook'
import { MemoCounter } from "./memos/MemoCounter";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoCounter />
  </StrictMode>,
);
