import { Cloud } from "lucide-react";

const CO2Card = ({ co2 }) => {
  return (
    <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-2xl transform hover:scale-105 transition-all border-2 border-green-400 h-32">
      <div className="flex items-center justify-between h-full">
        <div className="flex flex-col justify-center">
          <p className="text-xs opacity-90 mb-1 font-semibold">CO₂ Level</p>
          <p className="text-3xl font-bold">{co2} ppm</p>
          <p className="text-xs mt-1 opacity-75">Global average</p>
        </div>
        <Cloud className="w-14 h-14 opacity-70" />
      </div>
    </div>
  );
};

export default CO2Card;
