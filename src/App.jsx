import React, { useState, useEffect, useCallback } from 'react';
import { 
  Wind, Droplets, Sun, Compass, ShieldAlert, Eye, 
  BarChart2, Zap, Orbit, Activity, Radio
} from 'lucide-react';
import StarfieldCanvas from './components/StarfieldCanvas';
import HolographicSearch from './components/HolographicSearch';
import CentralPlanetOrb from './components/CentralPlanetOrb';
import SatelliteCard from './components/SatelliteCard';
import AsteroidForecastBelt from './components/AsteroidForecastBelt';
import AntigravityHUD from './components/AntigravityHUD';

// Mock Planetary Weather Database
const CITY_DATABASE = {
  'Neo-Tokyo': {
    name: 'Neo-Tokyo // Sector 04',
    tempC: 22,
    feelsLikeC: 21,
    highC: 26,
    lowC: 18,
    condition: 'BIO-LUMINESCENT RAIN',
    weatherType: 'rain',
    windSpeed: '28 km/h',
    windDir: 'NNW 320°',
    humidity: 78,
    dewPoint: '18°',
    uvIndex: 4.2,
    uvStatus: 'MODERATE SHIELD',
    pressure: '1014 hPa',
    pressureTrend: '+1.4 hPa/hr',
    visibility: '16.4 km',
    airQuality: '32 AQI (OPTIMAL)',
    forecast: [
      { day: 'TODAY', condition: 'Bio-Rain', icon: 'rain', maxTemp: 26, minTemp: 18, precip: 85, asteroidCode: 'NT-1' },
      { day: 'TMRW', condition: 'Ion Storm', icon: 'storm', maxTemp: 24, minTemp: 17, precip: 92, asteroidCode: 'NT-2' },
      { day: 'WED', condition: 'Starlight', icon: 'clear', maxTemp: 27, minTemp: 19, precip: 15, asteroidCode: 'NT-3' },
      { day: 'THU', condition: 'Solar Flare', icon: 'clear', maxTemp: 29, minTemp: 21, precip: 5, asteroidCode: 'NT-4' },
      { day: 'FRI', condition: 'Nebula Mist', icon: 'rain', maxTemp: 23, minTemp: 16, precip: 60, asteroidCode: 'NT-5' },
      { day: 'SAT', condition: 'G-Zero Frost', icon: 'snow', maxTemp: 19, minTemp: 12, precip: 40, asteroidCode: 'NT-6' },
      { day: 'SUN', condition: 'Calm Void', icon: 'wind', maxTemp: 25, minTemp: 18, precip: 10, asteroidCode: 'NT-7' },
    ]
  },
  'New York': {
    name: 'New York // Manhattan Hub',
    tempC: 17,
    feelsLikeC: 15,
    highC: 21,
    lowC: 12,
    condition: 'ION LIGHTNING DRIFT',
    weatherType: 'storm',
    windSpeed: '42 km/h',
    windDir: 'ENE 070°',
    humidity: 64,
    dewPoint: '11°',
    uvIndex: 6.8,
    uvStatus: 'HIGH RADIATION',
    pressure: '998 hPa',
    pressureTrend: '-2.8 hPa/hr',
    visibility: '12.0 km',
    airQuality: '48 AQI (GOOD)',
    forecast: [
      { day: 'TODAY', condition: 'Ion Storm', icon: 'storm', maxTemp: 21, minTemp: 12, precip: 90, asteroidCode: 'NY-0' },
      { day: 'TMRW', condition: 'Atmospheric Gale', icon: 'wind', maxTemp: 18, minTemp: 10, precip: 45, asteroidCode: 'NY-1' },
      { day: 'WED', condition: 'Clear Sky', icon: 'clear', maxTemp: 22, minTemp: 13, precip: 10, asteroidCode: 'NY-2' },
      { day: 'THU', condition: 'Solar Ray', icon: 'clear', maxTemp: 24, minTemp: 15, precip: 0, asteroidCode: 'NY-3' },
      { day: 'FRI', condition: 'Acid Fog', icon: 'rain', maxTemp: 20, minTemp: 14, precip: 70, asteroidCode: 'NY-4' },
      { day: 'SAT', condition: 'Sub-Zero Drift', icon: 'snow', maxTemp: 15, minTemp: 8, precip: 30, asteroidCode: 'NY-5' },
      { day: 'SUN', condition: 'Ether Calm', icon: 'clear', maxTemp: 23, minTemp: 16, precip: 15, asteroidCode: 'NY-6' },
    ]
  },
  'Kepler-186f': {
    name: 'Kepler-186f // Exoplanet Outpost',
    tempC: -4,
    feelsLikeC: -9,
    highC: 2,
    lowC: -12,
    condition: 'ZERO-G ICE AURORA',
    weatherType: 'frost',
    windSpeed: '56 km/h',
    windDir: 'SSW 210°',
    humidity: 42,
    dewPoint: '-14°',
    uvIndex: 1.8,
    uvStatus: 'M-DWARF SPECTRUM',
    pressure: '890 hPa',
    pressureTrend: '0.0 hPa/hr',
    visibility: '45.0 km',
    airQuality: '15 AQI (PRISTINE)',
    forecast: [
      { day: 'SOL 01', condition: 'Ice Aurora', icon: 'snow', maxTemp: 2, minTemp: -12, precip: 30, asteroidCode: 'KP-1' },
      { day: 'SOL 02', condition: 'Sub-Zero', icon: 'snow', maxTemp: 0, minTemp: -14, precip: 50, asteroidCode: 'KP-2' },
      { day: 'SOL 03', condition: 'Red Sun', icon: 'clear', maxTemp: 5, minTemp: -8, precip: 5, asteroidCode: 'KP-3' },
      { day: 'SOL 04', condition: 'Plasma Winds', icon: 'wind', maxTemp: 3, minTemp: -10, precip: 15, asteroidCode: 'KP-4' },
      { day: 'SOL 05', condition: 'Cosmic Calm', icon: 'clear', maxTemp: 4, minTemp: -7, precip: 0, asteroidCode: 'KP-5' },
      { day: 'SOL 06', condition: 'Cryo Vapor', icon: 'rain', maxTemp: 1, minTemp: -11, precip: 75, asteroidCode: 'KP-6' },
      { day: 'SOL 07', condition: 'Glacier Drift', icon: 'snow', maxTemp: -1, minTemp: -15, precip: 60, asteroidCode: 'KP-7' },
    ]
  },
  'Reykjavik': {
    name: 'Reykjavik // Geothermal Dome',
    tempC: 9,
    feelsLikeC: 6,
    highC: 13,
    lowC: 5,
    condition: 'AURORA VAPOR SHIMMER',
    weatherType: 'clear',
    windSpeed: '22 km/h',
    windDir: 'NW 300°',
    humidity: 82,
    dewPoint: '6°',
    uvIndex: 2.1,
    uvStatus: 'LOW SPECTRUM',
    pressure: '1022 hPa',
    pressureTrend: '+3.1 hPa/hr',
    visibility: '28.0 km',
    airQuality: '18 AQI (PRISTINE)',
    forecast: [
      { day: 'TODAY', condition: 'Aurora Glow', icon: 'clear', maxTemp: 13, minTemp: 5, precip: 20, asteroidCode: 'RJ-1' },
      { day: 'TMRW', condition: 'Vapor Drizzle', icon: 'rain', maxTemp: 11, minTemp: 4, precip: 70, asteroidCode: 'RJ-2' },
      { day: 'WED', condition: 'High Wind', icon: 'wind', maxTemp: 10, minTemp: 3, precip: 40, asteroidCode: 'RJ-3' },
      { day: 'THU', condition: 'Geothermal Sun', icon: 'clear', maxTemp: 14, minTemp: 6, precip: 10, asteroidCode: 'RJ-4' },
      { day: 'FRI', condition: 'Cryo Mist', icon: 'snow', maxTemp: 8, minTemp: 1, precip: 55, asteroidCode: 'RJ-5' },
      { day: 'SAT', condition: 'Northern Light', icon: 'clear', maxTemp: 12, minTemp: 4, precip: 15, asteroidCode: 'RJ-6' },
      { day: 'SUN', condition: 'Steam Front', icon: 'rain', maxTemp: 10, minTemp: 5, precip: 80, asteroidCode: 'RJ-7' },
    ]
  },
  'Cyber-Dubai': {
    name: 'Cyber-Dubai // Spire Array',
    tempC: 36,
    feelsLikeC: 41,
    highC: 43,
    lowC: 31,
    condition: 'SOLAR FLARE RADIATION',
    weatherType: 'clear',
    windSpeed: '18 km/h',
    windDir: 'SSE 160°',
    humidity: 38,
    dewPoint: '20°',
    uvIndex: 11.2,
    uvStatus: 'EXTREME SHIELD REQUIRED',
    pressure: '1006 hPa',
    pressureTrend: '-0.5 hPa/hr',
    visibility: '14.0 km',
    airQuality: '68 AQI (MODERATE)',
    forecast: [
      { day: 'TODAY', condition: 'Solar Flare', icon: 'clear', maxTemp: 43, minTemp: 31, precip: 0, asteroidCode: 'DB-1' },
      { day: 'TMRW', condition: 'Dust Drift', icon: 'wind', maxTemp: 42, minTemp: 30, precip: 5, asteroidCode: 'DB-2' },
      { day: 'WED', condition: 'Ion Sun', icon: 'clear', maxTemp: 44, minTemp: 32, precip: 0, asteroidCode: 'DB-3' },
      { day: 'THU', condition: 'Cloud Seeding', icon: 'rain', maxTemp: 38, minTemp: 28, precip: 65, asteroidCode: 'DB-4' },
      { day: 'FRI', condition: 'Thermal Haze', icon: 'clear', maxTemp: 41, minTemp: 29, precip: 0, asteroidCode: 'DB-5' },
      { day: 'SAT', condition: 'Solar Calm', icon: 'clear', maxTemp: 42, minTemp: 30, precip: 0, asteroidCode: 'DB-6' },
      { day: 'SUN', condition: 'Ether Breeze', icon: 'wind', maxTemp: 39, minTemp: 28, precip: 10, asteroidCode: 'DB-7' },
    ]
  }
};

const CITY_PRESETS = [
  { name: 'Neo-Tokyo' },
  { name: 'New York' },
  { name: 'Kepler-186f' },
  { name: 'Reykjavik' },
  { name: 'Cyber-Dubai' },
];

export default function App() {
  const [selectedCityName, setSelectedCityName] = useState('Neo-Tokyo');
  const [unit, setUnit] = useState('C'); // 'C' | 'F'
  const [overrideWeatherType, setOverrideWeatherType] = useState(null);
  const [activeForecastDay, setActiveForecastDay] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [gravityPulseCount, setGravityPulseCount] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  // Mouse tracker for magnetic zero-g physics
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // City data fallback
  const cityData = CITY_DATABASE[selectedCityName] || {
    ...CITY_DATABASE['Neo-Tokyo'],
    name: `${selectedCityName.toUpperCase()} // ORBITAL SECTOR`,
  };

  const currentWeatherType = overrideWeatherType || cityData.weatherType;

  // Temperature converter helper
  const convertTemp = (tempC) => {
    if (unit === 'F') {
      return Math.round((tempC * 9) / 5 + 32);
    }
    return tempC;
  };

  const handleToggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  const triggerGravityPulse = useCallback(() => {
    setIsPulsing(true);
    setGravityPulseCount((prev) => prev + 1);
    setTimeout(() => setIsPulsing(false), 800);
  }, []);

  return (
    <div className="relative min-h-screen bg-void text-slate-100 flex flex-col justify-between selection:bg-neon-cyan/20 selection:text-neon-cyan overflow-hidden">
      {/* 1. Dynamic Zero-G Interactive Particle & Starfield Background */}
      <StarfieldCanvas 
        weatherType={currentWeatherType} 
        mousePos={mousePos} 
      />

      {/* Shockwave Gravitational Pulse Overlay Ring */}
      {isPulsing && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="w-10 h-10 rounded-full border-2 border-neon-cyan animate-ping opacity-90" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-neon-magenta/40 animate-pulse-glow" />
        </div>
      )}

      {/* 2. Top Antigravity HUD */}
      <AntigravityHUD
        unit={unit}
        onToggleUnit={handleToggleUnit}
        weatherType={currentWeatherType}
        onChangeWeather={(type) => setOverrideWeatherType(type)}
        onTriggerPulse={triggerGravityPulse}
        isPulsing={isPulsing}
      />

      {/* 3. Holographic Command & City Search Bar */}
      <HolographicSearch
        currentCity={selectedCityName}
        presets={CITY_PRESETS}
        onSelectCity={(city) => {
          setSelectedCityName(city);
          setOverrideWeatherType(null);
          setActiveForecastDay(0);
        }}
      />

      {/* 4. Core Antigravity Space: Central Planet Orb with Satellite Constellation */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-8 z-10">
        
        {/* Antigravity Floating Stage */}
        <div className="relative w-full max-w-7xl min-h-[520px] flex items-center justify-center">
          
          {/* Gravitational Field Lines (Defying Rigid Grid Layout) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[700px] h-[700px] rounded-full border border-dashed border-neon-cyan/30" />
            <div className="absolute w-[950px] h-[950px] rounded-full border border-white/5" />
          </div>

          {/* Central Temperature Planet Orb */}
          <CentralPlanetOrb
            temperature={convertTemp(cityData.tempC)}
            unit={unit}
            condition={cityData.condition}
            location={cityData.name}
            feelsLike={convertTemp(cityData.feelsLikeC)}
            highTemp={convertTemp(cityData.highC)}
            lowTemp={convertTemp(cityData.lowC)}
            onPulse={triggerGravityPulse}
          />

          {/* ================= SATELLITE ORBITING DATA CARDS ================= */}
          {/* Defying rigid layout: placed organically at varying angular orbits and depths */}

          {/* Satellite Card 1: Vector Wind Dynamics (Top-Left Orbit) */}
          <div className="absolute top-2 left-4 sm:left-12 lg:left-24 z-20">
            <SatelliteCard
              title="Vector Wind"
              value={cityData.windSpeed}
              subvalue={cityData.windDir}
              accentColor="cyan"
              orbitPosition={{ id: 'W-01', depth: 1.15, x: 100 }}
              mousePos={mousePos}
              driftDelay={0}
              gravityPulse={gravityPulseCount}
              icon={Wind}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300/80">
                <span className="flex items-center gap-1">
                  <Compass className="w-3 h-3 text-neon-cyan animate-spin-slow" /> DRIFT VECTOR
                </span>
                <span className="text-white/80">GUST: 38 km/h</span>
              </div>
            </SatelliteCard>
          </div>

          {/* Satellite Card 2: Moisture & Dew Equilibrium (Top-Right Orbit) */}
          <div className="absolute top-4 right-4 sm:right-12 lg:right-24 z-20">
            <SatelliteCard
              title="Atmospheric Moisture"
              value={`${cityData.humidity}%`}
              subvalue={`Dew Point: ${cityData.dewPoint}`}
              accentColor="magenta"
              orbitPosition={{ id: 'M-02', depth: 0.95, x: 200 }}
              mousePos={mousePos}
              driftDelay={1.5}
              gravityPulse={gravityPulseCount}
              icon={Droplets}
            >
              {/* Floating moisture progress bar */}
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-neon-cyan to-neon-magenta h-full rounded-full transition-all duration-1000"
                  style={{ width: `${cityData.humidity}%` }}
                />
              </div>
            </SatelliteCard>
          </div>

          {/* Satellite Card 3: Quantum Radiation & UV (Mid-Left Orbit) */}
          <div className="absolute bottom-12 left-2 sm:left-8 lg:left-16 z-20">
            <SatelliteCard
              title="Quantum UV Index"
              value={cityData.uvIndex}
              subvalue={cityData.uvStatus}
              accentColor="purple"
              orbitPosition={{ id: 'R-03', depth: 1.05, x: 300 }}
              mousePos={mousePos}
              driftDelay={2.5}
              gravityPulse={gravityPulseCount}
              icon={Sun}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-purple-300">
                <span>SOLAR SPECTRUM</span>
                <span className="text-neon-purple font-semibold">CLASS 3</span>
              </div>
            </SatelliteCard>
          </div>

          {/* Satellite Card 4: Void Barometric Pressure (Mid-Right Orbit) */}
          <div className="absolute bottom-10 right-2 sm:right-8 lg:right-16 z-20">
            <SatelliteCard
              title="Barometric Pressure"
              value={cityData.pressure}
              subvalue={cityData.pressureTrend}
              accentColor="lime"
              orbitPosition={{ id: 'P-04', depth: 1.1, x: 400 }}
              mousePos={mousePos}
              driftDelay={3.2}
              gravityPulse={gravityPulseCount}
              icon={BarChart2}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                <span>STABILITY INDEX</span>
                <span className="font-semibold">99.8% STABLE</span>
              </div>
            </SatelliteCard>
          </div>

          {/* Satellite Card 5: Atmospheric Clarity / Visibility (Floating Upper Center Left) */}
          <div className="hidden xl:block absolute -top-4 left-1/4 -translate-x-12 z-10">
            <SatelliteCard
              title="Void Visibility"
              value={cityData.visibility}
              subvalue="Light Transmittance"
              accentColor="cyan"
              orbitPosition={{ id: 'V-05', depth: 0.85, x: 500 }}
              mousePos={mousePos}
              driftDelay={4.1}
              gravityPulse={gravityPulseCount}
              icon={Eye}
            />
          </div>

          {/* Satellite Card 6: Bio-Safety / Air Quality (Floating Upper Center Right) */}
          <div className="hidden xl:block absolute -top-4 right-1/4 translate-x-12 z-10">
            <SatelliteCard
              title="Bio-Air Quality"
              value={cityData.airQuality.split(' ')[0]}
              subvalue="Particulate Purity"
              accentColor="purple"
              orbitPosition={{ id: 'Q-06', depth: 0.9, x: 600 }}
              mousePos={mousePos}
              driftDelay={4.8}
              gravityPulse={gravityPulseCount}
              icon={Activity}
            />
          </div>

        </div>
      </main>

      {/* 5. Curved Asteroid Belt 7-Day Forecast */}
      <AsteroidForecastBelt
        forecast={cityData.forecast.map((item) => ({
          ...item,
          maxTemp: convertTemp(item.maxTemp),
          minTemp: convertTemp(item.minTemp),
        }))}
        activeDay={activeForecastDay}
        onSelectDay={(idx) => setActiveForecastDay(idx)}
      />

      {/* 6. Orbital Status Footer */}
      <footer className="relative z-20 py-2.5 px-6 border-t border-white/[0.05] bg-void/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping" />
          <span>ZERO-GRAVITY TELEMETRY SYNCED</span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400">LATENCY: 1.4ms</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">DEFYING RIGID GRIDS</span>
          <span className="text-neon-cyan">ANTIGRAVITY // ATMOSPHERE ENGINE</span>
        </div>
      </footer>
    </div>
  );
}
