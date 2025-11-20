import { AlertCircle } from "lucide-react";

const ForecastSummary = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-400/40">
          <p className="text-gray-300 text-sm mb-1">Avg Temperature</p>
          <p className="text-3xl font-bold text-yellow-300">{prediction.avgTemp}°C</p>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg p-4 border border-green-400/40">
          <p className="text-gray-300 text-sm mb-1">Climate Trend</p>
          <p className="text-3xl font-bold text-green-300">
            {prediction.trendEmoji} {prediction.overallTrend}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg p-4 border border-blue-400/40">
          <p className="text-gray-300 text-sm mb-1">Confidence</p>
          <p className="text-3xl font-bold text-blue-300">{prediction.confidence}%</p>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-gray-400 text-xs bg-gray-800/40 rounded-lg p-3 border border-gray-700">
        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
        <p>
          <strong>Note:</strong> This forecast uses a neural network trained on {prediction.dataPoints} historical data points.
          Predictions are based on temperature trends, humidity patterns, and CO₂ levels.
          For real-time weather updates, please check official meteorological services.
        </p>
      </div>
    </>
  );
};

export default ForecastSummary;
