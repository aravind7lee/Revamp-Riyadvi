import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA, PortfolioItem } from '../data/mockData';
import { ArrowUpRight, Grid, Layers } from 'lucide-react';

interface PortfolioPreviewProps {
  onSelectCaseStudy: (item: PortfolioItem) => void;
}

// BrandAppart / Framer exact color palettes for the Stack Scroll Reveal cards
const STACK_CARD_THEMES = [
  {
    bg: 'bg-[#A14E00]', // Warm Amber/Rust (Card 01)
    border: 'border-[#E58025]',
    numColor: 'text-[#FFD1A3]',
    badgeBg: 'bg-[#6D3400] text-[#FFE8D1] border-[#E58025]/40',
    btnBg: 'bg-[#FFD1A3] text-[#5C2B00] hover:bg-white',
    imgBg: 'bg-[#FFF4E8]'
  },
  {
    bg: 'bg-[#007A8C]', // Ocean Teal / Cyan (Card 02)
    border: 'border-[#38BDF8]',
    numColor: 'text-[#BEE7F5]',
    badgeBg: 'bg-[#004D58] text-[#E0F7FC] border-[#38BDF8]/40',
    btnBg: 'bg-[#BEE7F5] text-[#00424D] hover:bg-white',
    imgBg: 'bg-[#F0FAFD]'
  },
  {
    bg: 'bg-[#8B004F]', // Deep Magenta / Berry (Card 03)
    border: 'border-[#F43F5E]',
    numColor: 'text-[#FCD3DE]',
    badgeBg: 'bg-[#580032] text-[#FFE4EC] border-[#F43F5E]/40',
    btnBg: 'bg-[#FCD3DE] text-[#4A002A] hover:bg-white',
    imgBg: 'bg-[#FFF0F5]'
  },
  {
    bg: 'bg-[#4C1D95]', // Rich Violet / Purple (Card 04)
    border: 'border-[#A855F7]',
    numColor: 'text-[#E9D5FF]',
    badgeBg: 'bg-[#321266] text-[#F3E8FF] border-[#A855F7]/40',
    btnBg: 'bg-[#E9D5FF] text-[#2E1065] hover:bg-white',
    imgBg: 'bg-[#FAF5FF]'
  },
  {
    bg: 'bg-[#1C1917]', // Obsidian Dark Gold (Card 05)
    border: 'border-[#D4AF37]',
    numColor: 'text-[#FDE68A]',
    badgeBg: 'bg-[#292524] text-[#FEF3C7] border-[#D4AF37]/40',
    btnBg: 'bg-[#D4AF37] text-black hover:bg-white',
    imgBg: 'bg-[#292524]'
  }
];

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ onSelectCaseStudy }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const categories = [
    'All',
    'Web Development',
    'App Development',
    'UI/UX Design',
    'AR/VR',
    '3D Modeling',
    'Digital Marketing'
  ];

  const filteredItems = PORTFOLIO_DATA.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  // 120FPS GPU Direct DOM scroll transform updater (ZERO React state re-renders during scroll!)
  useEffect(() => {
    if (viewMode !== 'stack' || filteredItems.length === 0) return;

    let ticking = false;

    const updateTransforms = () => {
      const windowHeight = window.innerHeight;

      cardRefs.current.forEach((cardEl, i) => {
        if (!cardEl) return;
        const rect = cardEl.getBoundingClientRect();

        const stickyTop = 70 + i * 12;
        const entryDistance = windowHeight - stickyTop;
        const currentDist = windowHeight - rect.top;
        
        const p = Math.min(Math.max(currentDist / Math.max(entryDistance, 1), 0), 1);

        const rotateX = (1 - p) * -15;
        const translateY = (1 - p) * 25;

        const innerCard = cardEl.firstElementChild as HTMLElement;
        if (innerCard) {
          innerCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) translateY(${translateY}px)`;
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateTransforms);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateTransforms();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [viewMode, filteredItems.length]);

  return (
    <section id="portfolio-preview" className="py-14 sm:py-20 bg-[#050508] border-t border-[#1F1F2A] relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[200px] sm:h-[350px] bg-[#D4AF37]/5 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              OUR PORTFOLIO
            </p>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Featured Client Projects &amp; Case Studies
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl leading-relaxed font-sans">
              Explore recent web applications, mobile apps, UI/UX design systems, and digital marketing projects we have delivered.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#0E0E14] p-1 sm:p-1.5 rounded-xl border border-[#222232] self-start sm:self-auto shadow-md">
            <button
              onClick={() => setViewMode('stack')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                viewMode === 'stack'
                  ? 'bg-[#D4AF37] text-black font-extrabold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Stack Scroll</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#D4AF37] text-black font-extrabold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills — Smooth horizontal scroll on mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-[#1E1E2C]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#D4AF37] text-black font-extrabold shadow-sm'
                  : 'bg-[#0E0E14] text-neutral-300 border border-[#222232] hover:border-[#D4AF37]/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 1. STACK SCROLL REVEAL MODE (GPU Direct DOM Stacking) */}
        {viewMode === 'stack' && (
          <div className="space-y-8 sm:space-y-16 pb-12 sm:pb-16 pt-2">
            {filteredItems.map((item, idx) => {
              const theme = STACK_CARD_THEMES[idx % STACK_CARD_THEMES.length];
              const stickyTopPx = 70 + idx * 12;

              return (
                <div
                  key={item.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  style={{
                    position: 'sticky',
                    top: `${stickyTopPx}px`,
                    zIndex: 10 + idx,
                  }}
                  className="w-full max-w-5xl mx-auto"
                >
                  {/* Inner 3D GPU Card Wrapper */}
                  <div
                    style={{
                      willChange: 'transform',
                      transformOrigin: 'top center'
                    }}
                    onClick={() => onSelectCaseStudy(item)}
                    className={`${theme.bg} ${theme.border} border-2 rounded-2xl sm:rounded-[28px] p-4 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group cursor-pointer hover:scale-[1.01] transition-transform duration-300`}
                  >
                    {/* Inner 2-Column Responsive Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
                      
                      {/* Left Column: Number, Category, Headline, Summary, Tech Stack & CTA */}
                      <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-white">
                        
                        {/* Number & Category Badge */}
                        <div className="flex items-center gap-2.5">
                          <span className={`font-display font-black text-xl sm:text-3xl ${theme.numColor}`}>
                            0{idx + 1}
                          </span>
                          <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-mono font-bold uppercase tracking-wider border ${theme.badgeBg}`}>
                            {item.category}
                          </span>
                        </div>

                        {/* Case Study Title */}
                        <h3 className="font-display font-black text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight text-white">
                          {item.title}
                        </h3>

                        {/* Summary Description */}
                        <p className="text-white/90 text-xs sm:text-sm font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {item.summary}
                        </p>

                        {/* Key Metrics Grid */}
                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 pt-1">
                          {item.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-black/35 border border-white/15 text-center">
                              <span className="text-[8px] sm:text-[9px] text-white/70 uppercase tracking-wider block font-mono font-bold truncate">
                                {m.label}
                              </span>
                              <span className="font-display font-black text-xs sm:text-sm text-white block mt-0.5">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Tools & CTA */}
                        <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-1">
                            {item.toolsUsed.map((tool, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-black/40 text-white/90 border border-white/20"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCaseStudy(item);
                            }}
                            className={`w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl ${theme.btnBg} font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95`}
                          >
                            <span>Read Full Case Study</span>
                            <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
                          </button>
                        </div>

                      </div>

                      {/* Right Column: Case Study Preview Image Frame */}
                      <div className="lg:col-span-5">
                        <div className={`${theme.imgBg} p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-white/30 shadow-xl overflow-hidden group`}>
                          <div className="relative h-36 sm:h-64 rounded-lg sm:rounded-xl overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-[10px] sm:text-[11px] font-mono font-bold text-white bg-black/70 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg border border-white/20">
                              Client: {item.client}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. GRID VIEW MODE */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectCaseStudy(item)}
                className="bg-[#0B0C12] rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all hover-lift group cursor-pointer flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="relative h-44 sm:h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C12] via-transparent to-transparent" />

                    <span className="absolute top-3 left-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-black bg-[#D4AF37] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md shadow-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
                    <span className="text-[11px] sm:text-xs text-[#D4AF37] font-mono font-bold block">
                      Client: {item.client}
                    </span>

                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 flex items-center justify-between border-t border-[#1E202E]">
                  <span className="text-xs text-neutral-400 font-medium">
                    Impact: <strong className="text-[#D4AF37] font-bold">{item.metrics[0]?.value}</strong>
                  </span>
                  <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1 group-hover:underline">
                    <span>View Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
