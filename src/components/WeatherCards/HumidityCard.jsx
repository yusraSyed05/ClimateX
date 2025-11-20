import { Droplets } from "lucide-react";

const HumidityCard = ({ humidity, pressure }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl p-5 text-white shadow-2xl transform hover:scale-105 transition-all border-2 border-cyan-400 h-32">
      <div className="flex items-center justify-between h-full">
        <div className="flex flex-col justify-center">
          <p className="text-xs opacity-90 mb-1 font-semibold">Humidity</p>
          <p className="text-3xl font-bold">{humidity}%</p>
          <p className="text-xs mt-1 opacity-75">Pressure: {pressure} hPa</p>
        </div>
        <Droplets className="w-14 h-14 opacity-70" />
      </div>
    </div>
  );
};

export default HumidityCard;
