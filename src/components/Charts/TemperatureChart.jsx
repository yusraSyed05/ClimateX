import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Minus, Thermometer } from "lucide-react";

const TemperatureChart = ({ data, animationKey }) => {
  // Calculate insights
  const temps = data.map(d => d.temp);
  const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
  const minTemp = Math.min(...temps).toFixed(1);
  const maxTemp = Math.max(...temps).toFixed(1);
  const tempRange = (maxTemp - minTemp).toFixed(1);
  
  // Calculate trend
  const firstHalf = temps.slice(0, Math.floor(temps.length / 2));
  const secondHalf = temps.slice(Math.floor(temps.length / 2));
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  const trend = secondAvg - firstAvg;
  
  const getTrendInfo = () => {
    if (trend > 1) return { icon: TrendingUp, text: "Rising", color: "text-red-400", bgColor: "bg-red-500/20" };
    if (trend < -1) return { icon: TrendingDown, text: "Cooling", color: "text-blue-400", bgColor: "bg-blue-500/20" };
    return { icon: Minus, text: "Stable", color: "text-green-400", bgColor: "bg-green-500/20" };
  };
  
  const trendInfo = getTrendInfo();
  const TrendIcon = trendInfo.icon;

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-orange-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Thermometer className="text-orange-500" size={24} />
          <h3 className="text-xl font-bold text-white">Temperature Trend</h3>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${trendInfo.bgColor}`}>
          <TrendIcon className={trendInfo.color} size={18} />
          <span className={`font-semibold ${trendInfo.color}`}>{trendInfo.text}</span>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          <p className="text-gray-400 text-xs mb-1">Average</p>
          <p className="text-white text-lg font-bold">{avgTemp}°C</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          <p className="text-gray-400 text-xs mb-1">Range</p>
          <p className="text-white text-lg font-bold">{minTemp}° - {maxTemp}°</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          <p className="text-gray-400 text-xs mb-1">Variation</p>
          <p className="text-white text-lg font-bold">📊 ±{tempRange}°C</p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300} key={`temp-${animationKey}`}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "2px solid #f97316",
              borderRadius: "12px"
            }}
            labelStyle={{ color: "#fff", fontWeight: "bold" }}
          />

          <Area
            type="monotone"
            dataKey="temp"
            stroke="#f97316"
            strokeWidth={3}
            fill="url(#colorTemp)"
            name="Temperature (°C)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Bottom Insight */}
      <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
        <p className="text-orange-300 text-sm">
          <span className="font-semibold">Insight:</span> 🌡️ Temperature {trend > 1 ? `increased by ${Math.abs(trend).toFixed(1)}°C` : trend < -1 ? `decreased by ${Math.abs(trend).toFixed(1)}°C` : 'remained stable'} over the 30-day period.
          {tempRange > 5 && " High variability detected."}
        </p>
      </div>
    </div>
  );
};

export default TemperatureChart;