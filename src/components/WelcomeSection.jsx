import { AirVent } from "lucide-react";

const WelcomeSection = () => {
  return (
    <div className="text-center py-20">
      <div className="inline-block p-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl border-2 border-cyan-500/30 backdrop-blur-sm">
        <AirVent className="w-24 h-24 text-cyan-400 mx-auto mb-6 animate-pulse" />

        <h3 className="text-3xl font-bold text-white mb-4">
          Welcome to ClimateX
        </h3>

        <p className="text-cyan-300 text-lg max-w-xl">
          Start typing a city name above and select from suggestions to view
          real time climate data, historical trends, and weather predictions.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-300 text-sm border border-cyan-500/40">
            🌡️ Temperature Analysis
          </span>
          <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm border border-purple-500/40">
            ☁️ CO₂ Tracking
          </span>
          <span className="px-4 py-2 bg-pink-500/20 rounded-full text-pink-300 text-sm border border-pink-500/40">
            ⛅ Weather Predictions
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
