import React, { useState, useRef, useEffect } from 'react';
import { PortfolioItem } from '../data/mockData';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';

interface ElasticPortfolioSliderProps {
  items: PortfolioItem[];
  onSelectCaseStudy: (item: PortfolioItem) => void;
}

export const ElasticPortfolioSlider: React.FC<ElasticPortfolioSliderProps> = ({
  items,
  onSelectCaseStudy,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isElasticAnimating, setIsElasticAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const totalCards = items.length;

  // Reset activeIndex when filtered items change
  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  // Auto-scroll active tab pill into view inside the tab bar container
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeTabBtn = tabsContainerRef.current.children[activeIndex] as HTMLElement;
      if (activeTabBtn) {
        activeTabBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeIndex]);

  const goToSlide = (index: number) => {
    if (index < 0 || index >= totalCards || index === activeIndex) return;
    setIsElasticAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsElasticAnimating(false), 600);
  };

  const handleNext = () => {
    if (activeIndex < totalCards - 1) {
      goToSlide(activeIndex + 1);
    } else {
      // Loop back to start with elastic bounce
      goToSlide(0);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      goToSlide(activeIndex - 1);
    } else {
      // Loop to end
      goToSlide(totalCards - 1);
    }
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="space-y-4 sm:space-y-6 select-none font-sans">
      
      {/* Top Navigation Controls Bar (Framer Elastic Slider Pro Header) */}
      <div className="flex items-center justify-between gap-3">
        
        {/* Left: Tab Pills Pill Bar with Auto-Center Scroll */}
        <div
          ref={tabsContainerRef}
          className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#0E0E14] border border-[#1E1E2C] shadow-inner overflow-x-auto max-w-[calc(100%-85px)] sm:max-w-full flex-1 scroll-smooth no-scrollbar"
        >
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => goToSlide(idx)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono font-bold transition-all duration-300 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                0{idx + 1} Card
              </button>
            );
          })}
        </div>

        {/* Right: Arrow Controls (Framer Style) */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <button
            onClick={handlePrev}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0E0E14] border border-[#1E1E2C] text-neutral-300 hover:text-white hover:border-[#D4AF37]/50 hover:bg-[#141420] active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-md"
            aria-label="Previous Slide"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0E0E14] border border-[#1E1E2C] text-neutral-300 hover:text-white hover:border-[#D4AF37]/50 hover:bg-[#141420] active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-md"
            aria-label="Next Slide"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

      </div>

      {/* Elastic Slider Viewport Window */}
      <div
        className="overflow-hidden rounded-2xl sm:rounded-[32px] relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex transition-transform duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            // Alternating white and dark theme cards for premium contrast like Framer Elastic Slider Pro!
            const isLightCard = idx % 2 === 0;

            return (
              <div
                key={item.id}
                className="w-full flex-shrink-0 px-0.5 sm:px-2 py-1"
              >
                <div
                  onClick={() => onSelectCaseStudy(item)}
                  className={`rounded-2xl sm:rounded-[32px] p-5 sm:p-10 border cursor-pointer transition-all duration-500 group shadow-2xl relative overflow-hidden ${
                    isLightCard
                      ? 'bg-white text-black border-neutral-200 hover:shadow-[#D4AF37]/10'
                      : 'bg-[#0B0C10] text-white border-[#1F1F2C] hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                    
                    {/* Left Panel: Content & Narrative (6 cols) */}
                    <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                      
                      {/* Kicker Header */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <span
                            className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-wider ${
                              isLightCard
                                ? 'bg-black text-white'
                                : 'bg-[#D4AF37] text-black'
                            }`}
                          >
                            0{idx + 1} CARD · {item.category}
                          </span>
                          <span
                            className={`text-[11px] sm:text-xs font-mono flex items-center gap-1 ${
                              isLightCard ? 'text-neutral-600' : 'text-neutral-400'
                            }`}
                          >
                            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37]" />
                            {item.client} ({item.clientLocation})
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className={`font-display font-black text-xl sm:text-3xl lg:text-4xl leading-snug sm:leading-tight tracking-tight uppercase ${
                            isLightCard ? 'text-black' : 'text-white'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>

                      {/* Summary */}
                      <p
                        className={`text-xs sm:text-sm leading-relaxed font-sans ${
                          isLightCard ? 'text-neutral-700' : 'text-neutral-300'
                        }`}
                      >
                        {item.summary}
                      </p>

                      {/* Key Performance Metrics (Fixed for non-truncating text on mobile) */}
                      <div
                        className={`grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${
                          isLightCard
                            ? 'bg-neutral-100 border-neutral-200'
                            : 'bg-[#12121A] border-[#222230]'
                        }`}
                      >
                        {item.metrics.map((m) => (
                          <div key={m.label} className="space-y-1 min-w-0">
                            <p
                              className={`font-display font-black text-xs sm:text-lg leading-none ${
                                isLightCard ? 'text-black' : 'text-[#D4AF37]'
                              }`}
                            >
                              {m.value}
                            </p>
                            <p
                              className={`text-[8px] sm:text-[9px] font-mono uppercase tracking-wider leading-snug break-words ${
                                isLightCard ? 'text-neutral-500' : 'text-neutral-400'
                              }`}
                            >
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="pt-1 sm:pt-2">
                        <span
                          className={`inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs font-extrabold transition-all group-hover:scale-105 ${
                            isLightCard
                              ? 'bg-black text-white hover:bg-neutral-800'
                              : 'bg-[#D4AF37] text-black hover:bg-[#c5a02e]'
                          }`}
                        >
                          <span>Explore Case Study</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>

                    </div>

                    {/* Right Panel: Large Rounded Image Viewport (6 cols) */}
                    <div className="lg:col-span-6 aspect-[16/10] sm:aspect-[4/3] rounded-xl sm:rounded-[28px] overflow-hidden bg-[#12121A] border border-black/10 relative shadow-inner">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
