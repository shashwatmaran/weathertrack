import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchCities, type GeoResult } from "@/lib/weather-api";

interface Props {
  onSelect: (city: GeoResult) => void;
}

export default function CitySearch({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (!query.trim()) { setResults([]); return; }
    timerRef.current = setTimeout(async () => {
      const r = await searchCities(query);
      setResults(r);
      setOpen(r.length > 0);
    }, 300);
    return () => clearTimeout(timerRef.current);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search city..."
          className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 text-base outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute z-50 mt-2 w-full rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/20 overflow-hidden shadow-2xl"
          >
            {results.map((c) => (
              <li
                key={c.id}
                onClick={() => { onSelect(c); setQuery(c.name); setOpen(false); }}
                className="px-5 py-3 cursor-pointer text-white hover:bg-white/20 transition-colors text-sm"
              >
                <span className="font-medium">{c.name}</span>
                {c.admin1 && <span className="text-white/60">, {c.admin1}</span>}
                <span className="text-white/50"> — {c.country}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
