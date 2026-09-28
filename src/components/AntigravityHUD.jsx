import React from 'react';
import { 
  Orbit, Wind, Droplets, CloudLightning, Sun, Snowflake, 
  Activity, ShieldAlert, Sparkles, RefreshCw
} from 'lucide-react';

export default function AntigravityHUD({
  unit,
  onToggleUnit,
  weatherType,
  onChangeWeather,
  onTriggerPulse,
  isPulsing,
}) {
  const simulationModes = [
    { id: 'rain', label: 'Bio-Rain', icon: Droplets, color: 'text-neon-cyan' },
    { id: 'storm', label: 'Ion Storm', icon: CloudLightning, color: 'text-neon-magenta' },
    { id: 'clear', label: 'Solar Flare', icon: Sun, color: 'text-neon-amber' },
    { id: 'frost', label: 'Zero-G Frost', icon: Snowflake, color: 'text-cyan-200' },
  ];

  return (
    <header className="relative z-40 w-full px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] bg-void/60 backdrop-blur-md">
      {/* Brand & Zero-G Telemetry */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-neon-cyan/10 border border-neon-cyan/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <Orbit className="w-5 h-5 text-neon-cyan animate-spin-slow" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-neon-lime animate-ping" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-black tracking-widest text-white font-mono uppercase">
              ANTIGRAVITY <span className="text-neon-cyan font-light">// ATMOSPHERE</span>
            </h1>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-400">
              V.4.2
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Activity className="w-3 h-3" /> G-FORCE: 0.02G
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-slate-400">ORBITAL DRIFT: STABLE</span>
          </div>
        </div>
      </div>

      {/* Interactive HUD Controls */}
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
        {/* Simulation Selector */}
        <div className="flex items-center p-1 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          {simulationModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = weatherType === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onChangeWeather(mode.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${mode.color}`} />
                <span className="hidden md:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gravitational Pulse Trigger */}
        <button
          onClick={onTriggerPulse}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all cursor-pointer ${
            isPulsing
              ? 'bg-neon-magenta/20 border-neon-magenta text-neon-magenta shadow-[0_0_20px_#FF007A]'
              : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-neon-magenta/50 hover:text-white'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${isPulsing ? 'animate-spin' : 'text-neon-magenta'}`} />
          <span className="hidden sm:inline">PULSE GRAVITY</span>
        </button>

        {/* Unit Switcher */}
        <button
          onClick={onToggleUnit}
          className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-neon-cyan hover:border-neon-cyan/40 hover:bg-neon-cyan/10 transition-all cursor-pointer font-bold"
        >
          °{unit}
        </button>
      </div>
    </header>
  );
}
