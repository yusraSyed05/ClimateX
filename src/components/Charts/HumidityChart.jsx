import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Minus, Droplet, AlertCircle } from "lucide-react";

const HumidityChart = ({ data, animationKey }) => {
  // Calculate insights
  const humidityValues = data.map(d => d.humidity);
  const avgHumidity = Math.round(humidityValues.reduce((a, b) => a + b, 0) / humidityValues.length);
  const minHumidity = Math.round(Math.min(...humidityValues));
  const maxHumidity = Math.round(Math.max(...humidityValues));
  const humidityRange = maxHumidity - minHumidity;
  
  // Calculate trend
  const firstHalf = humidityValues.slice(0, Math.floor(humidityValues.length / 2));
  const secondHalf = humidityValues.slice(Math.floor(humidityValues.length / 2));
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  const trend = secondAvg - firstAvg;
  
  const getTrendInfo = () => {
    if (trend > 3) return { icon: TrendingUp, text: "Rising", color: "text-blue-400", bgColor: "bg-blue-500/20" };
    if (trend < -3) return { icon: TrendingDown, text: "Falling", color: "text-orange-400", bgColor: "bg-orange-500/20" };
    return { icon: Minus, text: "Steady", color: "text-purple-400", bgColor: "bg-purple-500/20" };
  };
  
  const trendInfo = getTrendInfo();
  const TrendIcon = trendInfo.icon;
  
  // Comfort level analysis 
  const getComfortLevel = () => {
    if (avgHumidity < 30) return { 
      text: "Too Dry", 
      color: "text-orange-400", 
      emoji: "🏜️",
      warning: true,
      advice: "Low humidity can cause dry skin and respiratory discomfort."
    };
    if (avgHumidity > 60) return { 
      text: "Too Humid", 
      color: "text-blue-400", 
      emoji: "💧",
      warning: true,
      advice: "High humidity can feel uncomfortable and promote mold growth."
    };
    return { 
      text: "Comfortable", 
      color: "text-green-400", 
      emoji: "✅",
      warning: false,
      advice: "Humidity levels are within the ideal comfort range."
    };
  };
  
  const comfortLevel = getComfortLevel();

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-purple-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplet className="text-purple-500" size={24} />
          <h3 className="text-xl font-bold text-white">Humidity Levels</h3>
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
          <p className="text-white text-lg font-bold">{avgHumidity}%</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          <p className="text-gray-400 text-xs mb-1">Range</p>
          <p className="text-white text-lg font-bold">{minHumidity}% - {maxHumidity}%</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          <p className="text-gray-400 text-xs mb-1">Comfort</p>
          <p className={`text-lg font-bold ${comfortLevel.color}`}>
            {comfortLevel.emoji} {comfortLevel.text}
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300} key={`humidity-${animationKey}`}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "2px solid #a855f7",
              borderRadius: "12px"
            }}
            labelStyle={{ color: "#fff", fontWeight: "bold" }}
          />

          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#a855f7"
            strokeWidth={3}
            dot={{ fill: "#a855f7", r: 5 }}
            name="Humidity (%)"
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Bottom Insight */}
      <div className={`mt-4 p-3 rounded-lg flex items-start gap-2 ${comfortLevel.warning ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
        {comfortLevel.warning && <AlertCircle className="text-orange-400 flex-shrink-0 mt-0.5" size={18} />}
        <p className={`text-sm ${comfortLevel.warning ? 'text-orange-300' : 'text-green-300'}`}>
          <span className="font-semibold">Insight:</span> {comfortLevel.emoji} {comfortLevel.advice}
          {humidityRange > 20 && " High variability detected across the period."}
          {trend > 5 && " Humidity is rising - conditions becoming more humid."}
          {trend < -5 && " Humidity is dropping - conditions becoming drier."}
        </p>
      </div>
    </div>
  );
};

export default HumidityChart;