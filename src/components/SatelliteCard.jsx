import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function SatelliteCard({
  title,
  value,
  subvalue,
  unit = '',
  icon: Icon,
  accentColor = 'cyan', // cyan | magenta | purple | lime
  orbitPosition = { x: 0, y: 0, depth: 1 },
  mousePos = { x: 0, y: 0 },
  driftDelay = 0,
  gravityPulse = 0,
  children
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Springs for magnetic repulsion
  const springConfig = { damping: 20, stiffness: 120, mass: 0.6 };
  const magneticX = useSpring(0, springConfig);
  const magneticY = useSpring(0, springConfig);

  // Tilt springs
  const tiltX = useSpring(0, springConfig);
  const tiltY = useSpring(0, springConfig);

  useEffect(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const dx = mousePos.x - cardCenterX;
    const dy = mousePos.y - cardCenterY;
    const distance = Math.hypot(dx, dy);
    const repulsionRadius = 190;

    if (distance < repulsionRadius && distance > 0) {
      // Repel away from cursor (inverting vector)
      const force = (1 - distance / repulsionRadius) * 36;
      const angle = Math.atan2(dy, dx);
      magneticX.set(-Math.cos(angle) * force);
      magneticY.set(-Math.sin(angle) * force);
    } else {
      magneticX.set(0);
      magneticY.set(0);
    }
  }, [mousePos, magneticX, magneticY]);

  // Handle pulse wave
  useEffect(() => {
    if (gravityPulse > 0) {
      magneticY.set(Math.sin(orbitPosition.x) * 25);
      const timer = setTimeout(() => magneticY.set(0), 600);
      return () => clearTimeout(timer);
    }
  }, [gravityPulse]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    tiltX.set(-y * 0.12);
    tiltY.set(x * 0.12);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  const colorStyles = {
    cyan: {
      border: 'hover:border-neon-cyan/50 border-cyan-500/20',
      glow: 'hover:shadow-[0_0_30px_rgba(0,240,255,0.35)]',
      text: 'text-neon-cyan',
      badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
      halo: 'from-cyan-500/10 to-transparent',
    },
    magenta: {
      border: 'hover:border-neon-magenta/50 border-magenta-500/20',
      glow: 'hover:shadow-[0_0_30px_rgba(255,0,122,0.35)]',
      text: 'text-neon-magenta',
      badge: 'bg-pink-950/60 text-pink-300 border-pink-500/30',
      halo: 'from-pink-500/10 to-transparent',
    },
    purple: {
      border: 'hover:border-neon-purple/50 border-purple-500/20',
      glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]',
      text: 'text-neon-purple',
      badge: 'bg-purple-950/60 text-purple-300 border-purple-500/30',
      halo: 'from-purple-500/10 to-transparent',
    },
    lime: {
      border: 'hover:border-neon-lime/50 border-emerald-500/20',
      glow: 'hover:shadow-[0_0_30px_rgba(0,255,157,0.35)]',
      text: 'text-neon-lime',
      badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
      halo: 'from-emerald-500/10 to-transparent',
    }
  }[accentColor] || {};

  return (
    <motion.div
      ref={cardRef}
      style={{
        x: magneticX,
        y: magneticY,
        rotateX: tiltX,
        rotateY: tiltY,
        scale: orbitPosition.depth ? 0.9 + orbitPosition.depth * 0.12 : 1,
        zIndex: Math.round((orbitPosition.depth || 1) * 10),
      }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: driftDelay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative group cursor-pointer select-none transition-shadow duration-500 ${colorStyles.glow}`}
    >
      {/* Zero-G ambient continuous floating wrapper */}
      <div 
        className={
          driftDelay % 3 === 0 ? 'drift-1' : driftDelay % 2 === 0 ? 'drift-2' : 'drift-3'
        }
      >
        <div
          className={`relative p-5 rounded-2xl glass-panel ${colorStyles.border} transition-all duration-300 overflow-hidden min-w-[210px] sm:min-w-[240px]`}
        >
          {/* Subtle light refraction corner flare */}
          <div className="absolute -top-12 -left-12 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
          <div className={`absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-tl ${colorStyles.halo} rounded-full blur-xl pointer-events-none`} />

          {/* Holographic Header */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              {Icon && (
                <div className={`p-2 rounded-xl bg-white/[0.04] border border-white/10 ${colorStyles.text} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-4 h-4" />
                </div>
              )}
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
                {title}
              </span>
            </div>
            
            {/* Satellite telemetry tag */}
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border bg-white/[0.03] border-white/10 text-slate-400">
              ORBIT #{orbitPosition.id || 'SAT'}
            </span>
          </div>

          {/* Metric Value */}
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-bold tracking-tight text-white font-mono group-hover:text-glow-cyan transition-all">
              {value}
            </span>
            {unit && (
              <span className="text-sm font-mono text-slate-400 font-medium">
                {unit}
              </span>
            )}
          </div>

          {/* Subvalue / Telemetry status */}
          {subvalue && (
            <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
              <span>{subvalue}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${colorStyles.badge} font-mono font-medium`}>
                LIVE
              </span>
            </div>
          )}

          {/* Optional inline custom visualizer */}
          {children && <div className="mt-3 pt-2 border-t border-white/[0.06]">{children}</div>}

          {/* Orbital connection line indicator on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-neon-cyan/70 transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );
}
