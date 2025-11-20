import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Minus, Cloud, AlertTriangle } from "lucide-react";

const CO2Chart = ({ data, animationKey }) => {
  // Calculate insights
  const co2Values = data.map(d => d.co2);
  const avgCO2 = Math.round(co2Values.reduce((a, b) => a + b, 0) / co2Values.length);
  const minCO2 = Math.min(...co2Values);
  const maxCO2 = Math.max(...co2Values);
  const globalAverage = 420; // Global average CO2 in ppm
  
  // Calculate trend
  const firstHalf = co2Values.slice(0, Math.floor(co2Values.length / 2));
  const secondHalf = co2Values.slice(Math.floor(co2Values.length / 2));
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  const trend = secondAvg - firstAvg;
  
  const getTrendInfo = () => {
    if (trend > 5) return { icon: TrendingUp, text: "Increasing", color: "text-red-400", bgColor: "bg-red-500/20" };
    if (trend < -5) return { icon: TrendingDown, text: "Decreasing", color: "text-green-400", bgColor: "bg-green-500/20" };
    return { icon: Minus, text: "Stable", color: "text-cyan-400", bgColor: "bg-cyan-500/20" };
  };
  
  const trendInfo = getTrendInfo();
  const TrendIcon = trendInfo.icon;
  const comparisonPercent = (((avgCO2 - globalAverage) / globalAverage) * 100).toFixed(1);
  const isAboveAverage = avgCO2 > globalAverage;

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-green-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cloud className="text-green-500" size={24} />
          <h3 className="text-xl font-bold text-white">CO₂ Levels</h3>
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
          <p className="text-white text-lg font-bold">{avgCO2} ppm</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          <p className="text-gray-400 text-xs mb-1">Range</p>
          <p className="text-white text-lg font-bold">{minCO2} - {maxCO2}</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          <p className="text-gray-400 text-xs mb-1">vs Global</p>
          <p className={`text-lg font-bold ${isAboveAverage ? 'text-orange-400' : 'text-green-400'}`}>
            {isAboveAverage ? '📈' : '📉'} {isAboveAverage ? '+' : ''}{comparisonPercent}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300} key={`co2-${animationKey}`}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "2px solid #10b981",
              borderRadius: "12px"
            }}
            labelStyle={{ color: "#fff", fontWeight: "bold" }}
          />

          <Area
            type="monotone"
            dataKey="co2"
            stroke="#10b981"
            strokeWidth={3}
            fill="url(#colorCO2)"
            name="CO₂ (ppm)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Bottom Insight */}
      <div className={`mt-4 p-3 rounded-lg flex items-start gap-2 ${isAboveAverage ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
        {isAboveAverage && <AlertTriangle className="text-orange-400 flex-shrink-0 mt-0.5" size={18} />}
        <p className={`text-sm ${isAboveAverage ? 'text-orange-300' : 'text-green-300'}`}>
          <span className="font-semibold">Insight:</span> {isAboveAverage ? '⚠️' : '✅'} CO₂ levels are {isAboveAverage ? `${Math.abs(comparisonPercent)}% above` : `${Math.abs(comparisonPercent)}% below`} the global average of {globalAverage} ppm.
          {isAboveAverage && " Consider improving air quality through ventilation."}
          {trend > 5 && " Rising trend detected over the period."}
        </p>
      </div>
    </div>
  );
};

export default CO2Chart;