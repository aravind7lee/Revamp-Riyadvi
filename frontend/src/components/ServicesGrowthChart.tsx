import React, { useState } from 'react';
import { TrendingUp, CheckCircle2 } from 'lucide-react';

interface GrowthSeries {
  year: string;
  appDev: number;
  webDev: number;
  digitalMarketing: number;
}

const CHART_DATA: GrowthSeries[] = [
  { year: '2021', appDev: 65, webDev: 60, digitalMarketing: 55 },
  { year: '2022', appDev: 70, webDev: 65, digitalMarketing: 60 },
  { year: '2023', appDev: 75, webDev: 70, digitalMarketing: 68 },
  { year: '2024', appDev: 80, webDev: 72, digitalMarketing: 75 },
];

export const ServicesGrowthChart: React.FC = () => {
  // Active selected bar state (defaults to 2024 Web Development)
  const [hoveredBar, setHoveredBar] = useState<{
    year: string;
    label: string;
    value: number;
    color: string;
  }>({
    year: '2024',
    label: 'Web Development',
    value: 72,
    color: '#FF9800'
  });

  const yTicks = [100, 80, 60, 40, 20, 0];

  return (
    <section className="py-14 sm:py-20 bg-[#050508] border-t border-[#16161F] relative overflow-hidden text-white">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[200px] sm:h-[250px] bg-[#D4AF37]/5 rounded-full blur-[120px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-10">
        
        {/* COMPACT SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
          <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            PERFORMANCE METRICS
          </p>
          
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Services Growth &amp; Performance Metrics
          </h2>
          
          <p className="text-neutral-400 text-xs sm:text-base leading-relaxed font-sans">
            Year-over-year project delivery growth across App Development, Web Development, and Digital Marketing (2021 – 2024).
          </p>
        </div>

        {/* COMPACT CHART CONTAINER */}
        <div className="bg-[#0A0A10] border border-[#1C1C28] rounded-2xl p-3 sm:p-8 shadow-2xl space-y-5 sm:space-y-8">
          
          {/* CHART LEGEND (TOP CENTER) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-sm font-sans font-medium text-neutral-300">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm bg-[#4CAF50] inline-block shadow-sm" />
              <span>App Development</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm bg-[#FF9800] inline-block shadow-sm" />
              <span>Web Development</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm bg-[#2196F3] inline-block shadow-sm" />
              <span>Digital Marketing</span>
            </div>
          </div>

          {/* MAIN GRAPH CANVAS AREA */}
          <div className="relative pt-6 pb-6 pl-7 sm:pl-14 pr-2 sm:pr-4 border border-[#1A1A26] rounded-xl bg-[#07070D]">
            
            {/* Y-AXIS TITLE (DESKTOP ONLY ROTATED) */}
            <div className="hidden sm:block absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-sans text-neutral-400 font-medium whitespace-nowrap">
              Percentage (%)
            </div>

            {/* HORIZONTAL GRIDLINES & Y-AXIS LABELS */}
            <div className="absolute inset-0 top-6 bottom-12 left-7 sm:left-14 right-2 sm:right-4 flex flex-col justify-between pointer-events-none">
              {yTicks.map((tick) => (
                <div key={tick} className="relative flex items-center w-full">
                  <span className="absolute -left-6 sm:-left-10 text-[9px] sm:text-[11px] font-mono text-neutral-500 text-right w-5 sm:w-6">
                    {tick}
                  </span>
                  <div className="w-full border-b border-[#1E1E2C] border-solid" />
                </div>
              ))}
            </div>

            {/* BARS STAGE */}
            <div className="relative z-10 h-[240px] sm:h-[320px] flex items-end justify-around pt-2">
              {CHART_DATA.map((d, colIdx) => {
                const isRightHalf = colIdx >= 2;

                return (
                  <div key={d.year} className="flex-1 max-w-[140px] h-full flex flex-col justify-end items-center px-0.5 sm:px-1">
                    
                    {/* GROUPED BARS FOR THIS YEAR */}
                    <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full pb-1 relative">
                      
                      {/* App Dev Bar (Green) */}
                      <div
                        onMouseEnter={() =>
                          setHoveredBar({
                            year: d.year,
                            label: 'App Development',
                            value: d.appDev,
                            color: '#4CAF50'
                          })
                        }
                        onClick={() =>
                          setHoveredBar({
                            year: d.year,
                            label: 'App Development',
                            value: d.appDev,
                            color: '#4CAF50'
                          })
                        }
                        className="w-1/3 max-w-[26px] sm:max-w-[28px] bg-[#4CAF50] hover:bg-[#5CB860] active:bg-[#5CB860] rounded-t-sm transition-all duration-300 cursor-pointer relative group"
                        style={{ height: `${d.appDev}%` }}
                      >
                        {/* Tooltip (Smart Left/Right position to prevent mobile overflow) */}
                        {hoveredBar.year === d.year && hoveredBar.label === 'App Development' && (
                          <div
                            className={`absolute -top-11 sm:-top-12 bg-[#22222E] border border-[#3A3A4C] text-white px-2.5 py-1 sm:py-1.5 rounded-md shadow-2xl text-[10px] sm:text-xs font-sans whitespace-nowrap z-30 pointer-events-none flex flex-col items-center ${
                              isRightHalf ? 'right-0 sm:left-1/2 sm:-translate-x-1/2' : 'left-0 sm:left-1/2 sm:-translate-x-1/2'
                            }`}
                          >
                            <span className="font-bold text-[10px] sm:text-[11px] text-neutral-300">{d.year}</span>
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold">
                              <span className="w-2 h-2 rounded-sm bg-[#4CAF50]" />
                              <span>App Dev: {d.appDev}%</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Web Dev Bar (Orange) */}
                      <div
                        onMouseEnter={() =>
                          setHoveredBar({
                            year: d.year,
                            label: 'Web Development',
                            value: d.webDev,
                            color: '#FF9800'
                          })
                        }
                        onClick={() =>
                          setHoveredBar({
                            year: d.year,
                            label: 'Web Development',
                            value: d.webDev,
                            color: '#FF9800'
                          })
                        }
                        className="w-1/3 max-w-[26px] sm:max-w-[28px] bg-[#FF9800] hover:bg-[#FFA726] active:bg-[#FFA726] rounded-t-sm transition-all duration-300 cursor-pointer relative group"
                        style={{ height: `${d.webDev}%` }}
                      >
                        {/* Tooltip */}
                        {hoveredBar.year === d.year && hoveredBar.label === 'Web Development' && (
                          <div
                            className={`absolute -top-11 sm:-top-12 bg-[#22222E] border border-[#3A3A4C] text-white px-2.5 py-1 sm:py-1.5 rounded-md shadow-2xl text-[10px] sm:text-xs font-sans whitespace-nowrap z-30 pointer-events-none flex flex-col items-center ${
                              isRightHalf ? 'right-0 sm:left-1/2 sm:-translate-x-1/2' : 'left-0 sm:left-1/2 sm:-translate-x-1/2'
                            }`}
                          >
                            <span className="font-bold text-[10px] sm:text-[11px] text-neutral-300">{d.year}</span>
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold">
                              <span className="w-2 h-2 rounded-sm bg-[#FF9800]" />
                              <span>Web Dev: {d.webDev}%</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Digital Marketing Bar (Blue) */}
                      <div
                        onMouseEnter={() =>
                          setHoveredBar({
                            year: d.year,
                            label: 'Digital Marketing',
                            value: d.digitalMarketing,
                            color: '#2196F3'
                          })
                        }
                        onClick={() =>
                          setHoveredBar({
                            year: d.year,
                            label: 'Digital Marketing',
                            value: d.digitalMarketing,
                            color: '#2196F3'
                          })
                        }
                        className="w-1/3 max-w-[26px] sm:max-w-[28px] bg-[#2196F3] hover:bg-[#42A5F5] active:bg-[#42A5F5] rounded-t-sm transition-all duration-300 cursor-pointer relative group"
                        style={{ height: `${d.digitalMarketing}%` }}
                      >
                        {/* Tooltip */}
                        {hoveredBar.year === d.year && hoveredBar.label === 'Digital Marketing' && (
                          <div
                            className={`absolute -top-11 sm:-top-12 bg-[#22222E] border border-[#3A3A4C] text-white px-2.5 py-1 sm:py-1.5 rounded-md shadow-2xl text-[10px] sm:text-xs font-sans whitespace-nowrap z-30 pointer-events-none flex flex-col items-center ${
                              isRightHalf ? 'right-0 sm:left-1/2 sm:-translate-x-1/2' : 'left-0 sm:left-1/2 sm:-translate-x-1/2'
                            }`}
                          >
                            <span className="font-bold text-[10px] sm:text-[11px] text-neutral-300">{d.year}</span>
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold">
                              <span className="w-2 h-2 rounded-sm bg-[#2196F3]" />
                              <span>Marketing: {d.digitalMarketing}%</span>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* YEAR TICK LABEL */}
                    <span className="text-[11px] sm:text-xs font-mono font-medium text-neutral-300 mt-2">
                      {d.year}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* X-AXIS TITLE (BOTTOM CENTER) */}
            <div className="text-center text-[11px] sm:text-xs font-sans font-medium text-neutral-400 pt-2">
              Years
            </div>

          </div>

          {/* ACTIVE SELECTION SUMMARY CARD (PERFECT READABILITY ON MOBILE) */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#12121D] border border-[#252536] flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: hoveredBar.color }}
              />
              <span className="text-neutral-300 font-bold">{hoveredBar.year}</span>
              <span className="text-neutral-400 font-sans">• {hoveredBar.label}</span>
            </div>
            <span className="font-black text-white text-sm" style={{ color: hoveredBar.color }}>
              {hoveredBar.value}% Growth
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
