import { useTrafficLight } from "../Hook/useTrafficLight";


export const TrafficLightWithEffectHook = () => {

  const { countDown, percentage, redLight, yellowLight, greenLight } = useTrafficLight()

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">

        <h1 className="text-white text-3xl">Semáforo con useEfect</h1>
        <h2 className="text-white text-xl">{countDown}</h2>

        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className={`w-20 h-20 ${redLight} rounded-full`}></div>
        <div className={`w-20 h-20 ${yellowLight} rounded-full`}></div>
        <div className={`w-20 h-20 ${greenLight} rounded-full`}></div>

      </div>
    </div>
  );
};