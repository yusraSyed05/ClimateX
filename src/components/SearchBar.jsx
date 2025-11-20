import { Search } from "lucide-react";

const SearchBar = ({
  city,
  setCity,
  onSearch,
  inputRef,
  setShowSuggestions,
}) => {
  return (
    <form
      onSubmit={onSearch}
      className="relative max-w-2xl mx-auto mb-6"
    >
      <input
        ref={inputRef}
        type="text"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          if (setShowSuggestions) setShowSuggestions(true);
        }}
        onFocus={() => {
          if (setShowSuggestions && city) setShowSuggestions(true);
        }}
        placeholder="Search any city…"
        className="w-full px-6 py-4 bg-gray-800 border-2 border-cyan-500 rounded-full text-white placeholder-gray-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all pr-28"
      />

      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full flex items-center shadow-lg hover:scale-105 transition-transform"
      >
        <Search className="mr-2" size={18} />
        Search
      </button>
    </form>
  );
};

export default SearchBar;