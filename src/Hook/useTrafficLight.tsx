import { useEffect, useState } from "react";


const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse"
}

type trafficLightColor = keyof typeof colors

export const useTrafficLight = () => {

  const [light, setLight] = useState<trafficLightColor>('red');
  const [countDown, setCountDown] = useState(5);

  // Efecto que disminuye el tiempo
  useEffect(() => {
    if (countDown === 0) return

    const interval = setInterval(() => {
      setCountDown((prev) => prev - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }

  }, [countDown]);



  // Efecto que ejecuta el cambio de color
  useEffect(() => {
    if (countDown > 0) return
    setCountDown(5)

    switch (light) {
      case 'red':
        setLight('yellow')
        break
      case 'yellow':
        setLight('green')
        break
      case 'green':
        setLight('red')
        break
      default:
        break;
    }
  }, [countDown, light])

  return {
    // Prop
    countDown,

    // Computed
    percentage: (countDown / 5) * 100,
    redLight: light === 'red' ? colors.red : ' bg-gray-500',
    yellowLight: light === 'yellow' ? colors.yellow : ' bg-gray-500',
    greenLight: light === 'green' ? colors.green : ' bg-gray-500'
  }
}
