import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, ArrowUpRight, ArrowDownRight, Compass, ShieldCheck } from 'lucide-react';

export default function CentralPlanetOrb({
  temperature = 22,
  unit = 'C',
  condition = 'BIO-LUMINESCENT RAIN',
  location = 'NEO-TOKYO // SECTOR 04',
  feelsLike = 21,
  highTemp = 26,
  lowTemp = 18,
  onPulse,
}) {
  const orbRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Parallax tilt response to cursor
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-150, 150], [18, -18]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-18, 18]), { damping: 25, stiffness: 200 });

  const handleMouseMove = (e) => {
    if (!orbRef.current) return;
    const rect = orbRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div className="relative flex items-center justify-center py-6 select-none">
      {/* Outer Gyroscopic Orbital Rings */}
      <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full border border-dashed border-neon-cyan/20 pointer-events-none orbit-ring" />
      <div className="absolute w-[440px] h-[440px] sm:w-[560px] sm:h-[560px] rounded-full border border-neon-purple/20 pointer-events-none orbit-ring-reverse" />
      <div className="absolute w-[520px] h-[520px] sm:w-[640px] sm:h-[640px] rounded-full border border-white/[0.04] pointer-events-none rotate-45" />

      {/* Orbiting tiny satellites around the planet */}
      <div className="absolute w-[440px] h-[440px] sm:w-[560px] sm:h-[560px] pointer-events-none orbit-ring">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neon-cyan shadow-[0_0_15px_#00F0FF]" />
      </div>
      <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] pointer-events-none orbit-ring-reverse">
        <div className="absolute bottom-4 right-1/4 w-2.5 h-2.5 rounded-full bg-neon-magenta shadow-[0_0_12px_#FF007A]" />
      </div>

      {/* The Central Massive Planetary Orb */}
      <motion.div
        ref={orbRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onPulse}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="relative group cursor-pointer w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] rounded-full flex flex-col items-center justify-center z-20"
      >
        {/* Core Bioluminescent Pulsing Atmosphere */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-purple/30 via-neon-cyan/20 to-neon-magenta/20 blur-2xl group-hover:blur-3xl transition-all duration-700 animate-pulse-glow" />

        {/* 3D Glass Planetary Body */}
        <div className="relative w-full h-full rounded-full glass-orb flex flex-col items-center justify-center p-6 text-center border-2 border-white/20 shadow-orb overflow-hidden">
          {/* Internal Plasma swirl */}
          <div className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 bg-radial from-neon-cyan/40 via-neon-magenta/20 to-transparent blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 bg-radial from-neon-purple/50 via-neon-violet/30 to-transparent blur-2xl pointer-events-none" />

          {/* Planetary Specular Highlight Crescent */}
          <div className="absolute inset-x-8 top-3 h-24 rounded-full bg-gradient-to-b from-white/30 to-transparent blur-[2px] opacity-70 pointer-events-none" />

          {/* Location Badge */}
          <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-cyan-200 uppercase font-semibold">
              {location}
            </span>
          </div>

          {/* Huge Ethereal Temperature Digits */}
          <div className="relative z-10 flex items-start justify-center">
            <span className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-200 drop-shadow-[0_10px_25px_rgba(0,240,255,0.4)]">
              {temperature}
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-light text-neon-cyan/90 font-mono mt-2 sm:mt-4 ml-1">
              °{unit}
            </span>
          </div>

          {/* Weather Condition Label */}
          <div className="relative z-10 mt-1">
            <h2 className="text-xs sm:text-sm md:text-base font-bold tracking-widest text-slate-200 uppercase font-mono flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-neon-magenta animate-spin-slow" />
              {condition}
            </h2>
            <p className="text-[11px] font-mono text-slate-400 mt-1">
              Feels like <span className="text-cyan-300 font-semibold">{feelsLike}°{unit}</span> • Zero-G Equilibrium
            </p>
          </div>

          {/* Planetary High / Low floating HUD pill */}
          <div className="relative z-10 mt-4 flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-0.5 text-neon-cyan">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{highTemp}°</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-0.5 text-neon-magenta">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>{lowTemp}°</span>
            </div>
          </div>

          {/* Gravitational lens click hint */}
          <div className="absolute bottom-3 text-[9px] font-mono text-white/30 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to Pulse Gravity
          </div>
        </div>
      </motion.div>
    </div>
  );
}
