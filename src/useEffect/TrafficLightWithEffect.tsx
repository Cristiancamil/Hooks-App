import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse"
}

type trafficLightColor = keyof typeof colors

export const TrafficLightWithEffect = () => {

  const [light, setLight] = useState<trafficLightColor>('red');
  const [countDown, setCountDown] = useState(5);



  // useEffect para el temporizador
  useEffect(() => {
    if (countDown === 0) return

    const interval = setInterval(() => {
      setCountDown((prev) => prev - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }

  }, [countDown]);



  // useEffect para el cambio de color
  useEffect(() => {
    if (countDown > 0) return

    setCountDown(5)

    switch (light) {
      case 'red':
        setLight('yellow')
        break;
      case 'yellow':
        setLight('green')
        break
      case 'green':
        setLight('red')
        break
      default:
        break;
    }

  }, [countDown, light]);



  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">

        <h1 className="text-white text-3xl">Semáforo con useEfect</h1>
        <h2 className="text-white text-xl">{countDown}</h2>

        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(countDown / 5) * 100}%` }}
          ></div>
        </div>

        <div className={`w-32 h-32 ${light === 'red' ? colors[light] : ' bg-gray-500'} rounded-full`}></div>
        <div className={`w-32 h-32 ${light === 'yellow' ? colors[light] : ' bg-gray-500'} rounded-full`}></div>
        <div className={`w-32 h-32 ${light === 'green' ? colors[light] : ' bg-gray-500'} rounded-full`}></div>

      </div>
    </div>
  );
};