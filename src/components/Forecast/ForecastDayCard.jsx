const ForecastDayCard = ({ day }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-indigo-400/30 hover:border-indigo-400 transition-all transform hover:scale-105">
      <p className="text-indigo-300 font-bold text-center mb-2">{day.day}</p>
      <p className="text-gray-400 text-xs text-center mb-3">{day.date}</p>

      <div className="text-4xl text-center mb-3">{day.icon}</div>

      <p className="text-2xl font-bold text-white text-center mb-2">
        {day.temp}°C
      </p>

      <p className="text-xs text-gray-400 text-center mb-2">{day.condition}</p>

      <div className="text-xs text-gray-500 space-y-1">
        <p>💧 {day.humidity}%</p>
        <p>💨 {day.windSpeed} m/s</p>
      </div>
    </div>
  );
};

export default ForecastDayCard;
