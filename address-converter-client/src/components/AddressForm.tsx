import { useState } from "react";
import AddressSuggestion from "./AddressSuggestion";

interface Props {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

export default function AddressForm({ onSubmit, isLoading }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSubmit(input);
  };

  const handleSuggestionSelect = (suggested: string) => {
    setInput(suggested);
    onSubmit(suggested);
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-3">
      <div className="group transition-all duration-300">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-focus-within:shadow-md"
          placeholder="도로명 주소 입력"
        />
        <AddressSuggestion query={input} onSelect={handleSuggestionSelect} />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
      >
        검색
      </button>
    </form>
  );
}
