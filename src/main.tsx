import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import { HooksApp } from './HooksApp'
import { TrafficLight } from './useState/TrafficLight'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrafficLight />
  </StrictMode>,
)
