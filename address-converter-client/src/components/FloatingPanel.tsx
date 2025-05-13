import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FloatingPanelProps {
  title: string;
  content: React.ReactNode;
}

export default function FloatingPanel({ title, content }: FloatingPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`fixed top-4 right-4 w-auto rounded-xl bg-white/90 shadow-xl backdrop-blur-md border border-gray-200 z-[1000] overflow-hidden
        transition-all duration-500 ease-in-out
        ${
          isOpen ? "h-auto opacity-100 scale-100" : "h-14 opacity-70 scale-95"
        }`}
    >
      <div
        className="flex justify-between items-center px-4 py-3 cursor-pointer select-none hover:bg-gray-100 transition"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <button className="text-gray-500 hover:text-gray-800 transition">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <div
        className={`px-4 pb-4 transition-all duration-500 ease-in-out
          ${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        {content}
      </div>
    </div>
  );
}
