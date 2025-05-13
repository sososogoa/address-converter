import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  query: string;
  onSelect: (address: string) => void;
}

export default function AddressSuggestion({ query, onSelect }: Props) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastSelected, setLastSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim() || query === lastSelected) {
      setSuggestions([]);
      setIsVisible(false);
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);
      axios
        .get<string[]>("/api/suggestions", { params: { input: query } })
        .then((res) => {
          setSuggestions(res.data);
          setIsVisible(true);
        })
        .catch(() => setSuggestions([]))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, lastSelected]);

  const handleSelect = (sug: string) => {
    onSelect(sug);
    setLastSelected(sug);
    setIsVisible(false); // 트리거만 내림
    setTimeout(() => setSuggestions([]), 500); // fade-out 끝난 뒤 제거
  };

  return (
    <div className="relative z-10">
      {loading && (
        <p className="absolute left-0 top-full mt-1 text-sm text-gray-500 animate-pulse">
          검색 중...
        </p>
      )}
      {suggestions.length > 0 && (
        <ul
          className={`absolute left-0 top-full mt-2 w-full bg-white/90 border rounded-lg shadow-lg max-h-60 overflow-auto backdrop-blur-sm
          transition-all duration-500 ease-in-out
          ${
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {suggestions.map((sug, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(sug)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-all duration-150 text-sm text-gray-800"
            >
              {sug}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
