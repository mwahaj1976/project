import React, { useState } from 'react';
import { Search, MapPin, Radio, Zap, Globe } from 'lucide-react';

export default function HolographicSearch({ currentCity, onSelectCity, presets = [] }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSelectCity(query.trim());
    setQuery('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-6 pb-2 z-30 relative">
      {/* Holographic Input Frame */}
      <form onSubmit={handleSubmit} className="relative group">
        {/* Holographic ambient background flare */}
        <div 
          className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta opacity-30 blur-md transition-opacity duration-500 group-hover:opacity-75 ${
            isFocused ? 'opacity-90 blur-lg' : ''
          }`} 
        />

        <div className="relative flex items-center bg-[#070714]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl transition-all duration-300 group-hover:border-neon-cyan/50">
          {/* Cybernetic decorative corner tags */}
          <div className="absolute top-0 left-3 w-4 h-[1.5px] bg-neon-cyan" />
          <div className="absolute bottom-0 right-3 w-4 h-[1.5px] bg-neon-magenta" />

          {/* Search Icon / Radar ping */}
          <div className="flex items-center gap-2 pr-3 border-r border-white/10 text-neon-cyan">
            <Radio className="w-4 h-4 animate-pulse" />
            <Search className="w-4 h-4 text-slate-300" />
          </div>

          {/* Input field */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search celestial coordinates or city (e.g. Neo-Tokyo, Kepler-186f, New York)..."
            className="w-full bg-transparent px-4 py-1 text-sm font-mono text-white placeholder-slate-500 focus:outline-none tracking-wide"
          />

          {/* Holographic quick enter tag */}
          <button
            type="submit"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan text-xs font-mono hover:bg-neon-cyan/20 transition-colors cursor-pointer"
          >
            <Zap className="w-3 h-3" />
            <span>LOCATE</span>
          </button>
        </div>
      </form>

      {/* Preset Teleport Locations */}
      <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
        <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
          <Globe className="w-3 h-3 text-neon-cyan" /> JUMP TO:
        </span>
        {presets.map((city) => (
          <button
            key={city.name}
            onClick={() => onSelectCity(city.name)}
            className={`text-xs font-mono px-3 py-1 rounded-full border transition-all duration-200 cursor-pointer ${
              currentCity.toLowerCase() === city.name.toLowerCase()
                ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/60 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'bg-white/[0.03] text-slate-400 border-white/10 hover:border-neon-cyan/30 hover:text-slate-200'
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
}
