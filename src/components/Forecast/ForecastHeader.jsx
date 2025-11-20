import { Brain } from "lucide-react";

const ForecastHeader = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <div className="flex items-center mb-6">
      <Brain className="text-indigo-400 mr-3" size={32} />
      <div>
        <h3 className="text-2xl font-bold text-indigo-400">Next 7-Day Forecast</h3>
        <p className="text-gray-400 text-sm">
          Generated using {prediction.algorithm} • {prediction.confidence}% Confidence
        </p>
      </div>
    </div>
  );
};

export default ForecastHeader;
