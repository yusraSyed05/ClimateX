import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Minus, CloudRain, Droplets } from "lucide-react";

const RainfallChart = ({ data, animationKey }) => {
  // Calculate insights
  const rainfallValues = data.map(d => d.rainfall);
  const totalRainfall = rainfallValues.reduce((a, b) => a + b, 0).toFixed(1);
  const avgRainfall = (totalRainfall / rainfallValues.length).toFixed(1);
  const maxRainfall = Math.max(...rainfallValues).toFixed(1);
  const rainyDays = rainfallValues.filter(r => r > 1).length;
  
  // Calculate trend
  const firstHalf = rainfallValues.slice(0, Math.floor(rainfallValues.length / 2));
  const secondHalf = rainfallValues.slice(Math.floor(rainfallValues.length / 2));
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  const trend = secondAvg - firstAvg;
  
  const getTrendInfo = () => {
    if (trend > 1) return { icon: TrendingUp, text: "Increasing", color: "text-blue-400", bgColor: "bg-blue-500/20" };
    if (trend < -1) return { icon: TrendingDown, text: "Decreasing", color: "text-orange-400", bgColor: "bg-orange-500/20" };
    return { icon: Minus, text: "Consistent", color: "text-cyan-400", bgColor: "bg-cyan-500/20" };
  };
  
  const trendInfo = getTrendInfo();
  const TrendIcon = trendInfo.icon;
  
  // Determine wetness level
  const getWetnessLevel = () => {
    if (avgRainfall > 6) return { text: "Very Wet", color: "text-blue-400", emoji: "🌧️" };
    if (avgRainfall > 3) return { text: "Moderate", color: "text-cyan-400", emoji: "🌦️" };
    return { text: "Dry", color: "text-orange-400", emoji: "☀️" };
  };
  
  const wetnessLevel = getWetnessLevel();

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-cyan-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CloudRain className="text-cyan-500" size={24} />
          <h3 className="text-xl font-bold text-white">Rainfall Pattern</h3>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${trendInfo.bgColor}`}>
          <TrendIcon className={trendInfo.color} size={18} />
          <span className={`font-semibold ${trendInfo.color}`}>{trendInfo.text}</span>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          <p className="text-gray-400 text-xs mb-1">Total</p>
          <p className="text-white text-lg font-bold">{totalRainfall} mm</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          <p className="text-gray-400 text-xs mb-1">Rainy Days</p>
          <p className="text-white text-lg font-bold">{rainyDays}/{data.length}</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          <p className="text-gray-400 text-xs mb-1">Peak</p>
          <p className="text-white text-lg font-bold">⚡ {maxRainfall} mm</p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300} key={`rain-${animationKey}`}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "2px solid #06b6d4",
              borderRadius: "12px"
            }}
            labelStyle={{ color: "#fff", fontWeight: "bold" }}
          />

          <Area
            type="monotone"
            dataKey="rainfall"
            stroke="#06b6d4"
            strokeWidth={3}
            fill="url(#colorRain)"
            name="Rainfall (mm)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Bottom Insight */}
      <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-start gap-2">
        <Droplets className="text-cyan-400 flex-shrink-0 mt-0.5" size={18} />
        <p className="text-cyan-300 text-sm">
          <span className="font-semibold">Insight:</span> {wetnessLevel.emoji} Period classified as <span className={`font-semibold ${wetnessLevel.color}`}>{wetnessLevel.text}</span> with {rainyDays} rainy days out of {data.length}.
          {trend > 1 && " Rainfall increasing - expect wetter conditions."}
          {trend < -1 && " Rainfall decreasing - drier conditions ahead."}
          {maxRainfall > 8 && " Heavy rainfall recorded during peak day."}
        </p>
      </div>
    </div>
  );
};

export default RainfallChart;