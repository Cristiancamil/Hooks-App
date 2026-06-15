import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import { HooksApp } from './HooksApp'
// import { TrafficLight } from './useState/TrafficLight'
// import { TrafficLightWithEffect } from './useEffect/TrafficLightWithEffect'
import { TrafficLightWithEffectHook } from './useEffect/TrafficLightWithEffectHook'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrafficLightWithEffectHook />
  </StrictMode>,
)
