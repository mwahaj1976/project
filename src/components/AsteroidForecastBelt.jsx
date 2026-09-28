import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, CloudRain, CloudLightning, CloudSnow, Wind, Droplets, 
  Sparkles, Compass, Orbit
} from 'lucide-react';

export default function AsteroidForecastBelt({ forecast = [], activeDay, onSelectDay }) {
  const containerRef = useRef(null);

  const getConditionIcon = (iconType) => {
    switch (iconType) {
      case 'rain': return <CloudRain className="w-5 h-5 text-neon-cyan" />;
      case 'storm': return <CloudLightning className="w-5 h-5 text-neon-magenta" />;
      case 'snow': return <CloudSnow className="w-5 h-5 text-cyan-200" />;
      case 'wind': return <Wind className="w-5 h-5 text-neon-lime" />;
      default: return <Sun className="w-5 h-5 text-neon-amber" />;
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-8 px-4 z-20">
      {/* Curved Orbital Horizon Line across the bottom */}
      <div className="absolute inset-x-0 bottom-12 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-12 bottom-12 h-20 bg-gradient-to-t from-neon-purple/5 to-transparent blur-2xl pointer-events-none" />

      {/* Header telemetry info */}
      <div className="flex items-center justify-between max-w-6xl mx-auto mb-4 px-2">
        <div className="flex items-center gap-2">
          <Orbit className="w-4 h-4 text-neon-cyan animate-spin-slow" />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            ASTEROID BELT // 7-DAY ORBITAL FORECAST
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
          DRAG TO ROTATE TRAJECTORY
        </div>
      </div>

      {/* Belt cards arranged in a 3D curved arc */}
      <div 
        ref={containerRef}
        className="flex items-center justify-start md:justify-center gap-4 sm:gap-6 overflow-x-auto pb-6 pt-4 scrollbar-none px-4 no-scrollbar"
        style={{ perspective: 1200 }}
      >
        {forecast.map((item, index) => {
          const total = forecast.length;
          // Calculate curved trajectory offset: middle items are elevated and scaled larger
          const centerOffset = index - (total - 1) / 2;
          const curveY = Math.pow(centerOffset, 2) * 5; // parabolic dip for curved orbit feel
          const curveRotate = centerOffset * 3.5; // slight tilt along arc

          const isSelected = activeDay === index;

          return (
            <motion.div
              key={item.day || index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1, 
                y: curveY,
                rotateZ: curveRotate,
              }}
              whileHover={{ 
                y: curveY - 14, 
                scale: 1.08, 
                rotateZ: 0,
                transition: { duration: 0.25 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectDay && onSelectDay(index)}
              className={`relative flex-shrink-0 cursor-pointer select-none transition-all duration-300 ${
                isSelected ? 'z-30' : 'z-10'
              }`}
            >
              {/* Asteroid Glass Pod */}
              <div
                className={`relative w-32 sm:w-36 p-4 rounded-2xl glass-panel border transition-all duration-300 text-center flex flex-col items-center justify-between ${
                  isSelected
                    ? 'border-neon-cyan/70 bg-cosmic-800/80 shadow-[0_0_35px_rgba(0,240,255,0.4)]'
                    : 'border-white/10 hover:border-neon-cyan/40 hover:bg-cosmic-800/60'
                }`}
              >
                {/* Asteroid ID badge */}
                <div className="text-[9px] font-mono tracking-wider text-slate-500 uppercase mb-1">
                  ASTEROID #{item.asteroidCode || `A-${index + 1}`}
                </div>

                {/* Day Name */}
                <span className={`text-sm font-semibold tracking-wide ${isSelected ? 'text-neon-cyan' : 'text-slate-200'}`}>
                  {item.day}
                </span>

                {/* Glowing weather icon in zero-g bubble */}
                <div className="my-3 p-2.5 rounded-full bg-white/[0.05] border border-white/10 relative group-hover:scale-110 transition-transform">
                  {getConditionIcon(item.icon)}
                  {/* Subtle particle glow */}
                  <div className="absolute inset-0 rounded-full bg-neon-cyan/20 blur-md pointer-events-none" />
                </div>

                {/* Condition label */}
                <span className="text-[11px] font-mono text-slate-400 truncate max-w-full">
                  {item.condition}
                </span>

                {/* Temp High / Low */}
                <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-white/[0.08] w-full">
                  <span className="text-base font-bold font-mono text-white">
                    {item.maxTemp}°
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {item.minTemp}°
                  </span>
                </div>

                {/* Orbit Precipitation Probability */}
                <div className="mt-2 flex items-center justify-center gap-1 text-[10px] font-mono text-cyan-300/80">
                  <Droplets className="w-2.5 h-2.5" />
                  <span>{item.precip}%</span>
                </div>

                {/* Gravitational tether ping on selected */}
                {isSelected && (
                  <div className="absolute -bottom-2 w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_10px_#00F0FF]" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
