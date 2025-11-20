import { MapPin } from "lucide-react";

const SuggestionsDropdown = ({
  showSuggestions,
  suggestionsRef,
  citySuggestions,
  onSelect
}) => {
  if (!showSuggestions || citySuggestions.length === 0) return null;

  return (
    <div
      ref={suggestionsRef}
      className="absolute w-full mt-2 bg-gray-800 border-2 border-cyan-500/50 rounded-2xl shadow-2xl max-h-80 overflow-y-auto z-50"
    >
      {citySuggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => onSelect(suggestion)}
          className="px-4 sm:px-6 py-3 hover:bg-cyan-500/20 cursor-pointer transition-all border-b border-gray-700 last:border-b-0 flex items-center gap-3"
        >
          <MapPin className="text-cyan-400 flex-shrink-0" size={18} />
          <div className="flex-grow">
            <p className="text-white font-semibold text-sm sm:text-base">
              {suggestion.name}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              {suggestion.admin1 && `${suggestion.admin1}, `}
              {suggestion.country || suggestion.country_code}
              {suggestion.latitude &&
                suggestion.longitude &&
                ` • ${suggestion.latitude.toFixed(2)}°, ${suggestion.longitude.toFixed(2)}°`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestionsDropdown;
