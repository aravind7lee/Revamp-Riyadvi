import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const total = TESTIMONIALS_DATA.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Mobile Touch Swipe Handlers (Left/Right swipe for mobile screens)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        nextSlide(); // Swiped left -> next testimonial
      } else {
        prevSlide(); // Swiped right -> prev testimonial
      }
    }
    touchStartX.current = null;
  };

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying || expandedIndex !== null) return;
    timerRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, expandedIndex, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Calculate circular offset for 3D orbital positioning
  const getOffset = (index: number) => {
    let diff = (index - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-[#050508] border-t border-[#1F1F2A] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              CLIENT TESTIMONIALS
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              What Our Clients Say About Working With Us
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-sans max-w-xl mx-auto">
              Read reviews and feedback from founders, product managers, and technology leaders who have partnered with us.
            </p>
          </div>
        </ScrollReveal>

        {/* ORBITAL CAROUSEL STAGE CONTAINER - Perfectly Sized */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative h-[300px] sm:h-[320px] flex items-center justify-center select-none overflow-visible touch-pan-y"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {TESTIMONIALS_DATA.map((item, index) => {
            const offset = getOffset(index);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;
            const isExpanded = expandedIndex === index;

            if (!isVisible) return null;

            // Tight 3D Orbital Transform Calculations for seamless perspective without dead space
            let translateX = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (offset === 0) {
              translateX = 0;
              scale = 1.02;
              opacity = 1;
              zIndex = 40;
            } else if (offset === 1) {
              translateX = 190; // Right immediate
              scale = 0.88;
              opacity = 0.72;
              zIndex = 25;
            } else if (offset === -1) {
              translateX = -190; // Left immediate
              scale = 0.88;
              opacity = 0.72;
              zIndex = 25;
            } else if (offset === 2) {
              translateX = 340; // Far right
              scale = 0.75;
              opacity = 0.35;
              zIndex = 10;
            } else if (offset === -2) {
              translateX = -340; // Far left
              scale = 0.75;
              opacity = 0.35;
              zIndex = 10;
            }

            return (
              <div
                key={item.id || index}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(index);
                  }
                }}
                style={{
                  transform: `translate3d(${translateX}px, 0, 0) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                className={`absolute w-[300px] sm:w-[380px] transition-all duration-700 ease-out cursor-pointer ${
                  isCenter ? 'cursor-default' : 'hover:opacity-90'
                }`}
              >
                {/* Orbital Card Element */}
                <div
                  className={`rounded-[22px] p-6 flex flex-col justify-between h-[260px] sm:h-[280px] transition-all duration-500 shadow-2xl ${
                    isCenter
                      ? 'bg-white text-neutral-900 border border-white shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
                      : 'bg-[#E5E7EB] text-neutral-800 border border-neutral-300 shadow-lg'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            isCenter
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-amber-500 text-amber-500'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Headline Title */}
                    <h3 className="font-display font-bold text-sm sm:text-base text-neutral-900 leading-snug line-clamp-1">
                      {item.title}
                    </h3>

                    {/* Testimonial Quote */}
                    <p
                      className={`font-sans text-xs text-neutral-600 leading-relaxed ${
                        !isExpanded ? 'line-clamp-3' : ''
                      }`}
                    >
                      {item.quote}
                    </p>

                    {/* Read More Toggle */}
                    {item.quote.length > 120 && isCenter && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedIndex(isExpanded ? null : index);
                        }}
                        className="text-[11px] font-bold text-neutral-900 hover:text-[#D4AF37] underline transition-colors cursor-pointer"
                      >
                        {isExpanded ? 'Show Less' : 'Read Full Review'}
                      </button>
                    )}
                  </div>

                  {/* Author Bio Footer */}
                  <div className="pt-4 border-t border-neutral-200 flex items-center gap-3">
                    {/* Avatar Photo or Initials Fallback */}
                    {item.photo ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-300 flex-shrink-0">
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                            (e.target as HTMLElement).nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className={`hidden w-full h-full ${item.avatarColor || 'bg-emerald-600'} text-white font-bold text-xs flex items-center justify-center rounded-full`}>
                          {item.initials || item.name.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                    ) : (
                      <div className={`w-10 h-10 rounded-full ${item.avatarColor || 'bg-emerald-600'} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-md`}>
                        {item.initials || item.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="space-y-0.5 overflow-hidden">
                      <h4 className="font-display font-bold text-xs sm:text-sm text-neutral-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-sans truncate">
                        {item.role} at <strong className="text-neutral-800 font-semibold">{item.company}</strong>
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ORBITAL CONTROLS (Prev / Dots / Next) - Positioned cleanly right below cards */}
        <div className="flex items-center justify-center gap-5 pt-2">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-[#14141E] border border-[#2B2B3D] text-neutral-200 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-6 bg-[#D4AF37]'
                    : 'w-2 bg-[#252536] hover:bg-neutral-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-[#14141E] border border-[#2B2B3D] text-neutral-200 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Global Reputation Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto pt-6 border-t border-[#1C1C28]">
          <div className="p-3.5 rounded-xl bg-[#0C0C12] border border-[#1E1E2C] text-center space-y-0.5">
            <span className="font-display font-extrabold text-xl text-[#D4AF37] block">4.9 / 5.0</span>
            <span className="text-[10px] text-neutral-400 font-mono block">Client Satisfaction Rating</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0C0C12] border border-[#1E1E2C] text-center space-y-0.5">
            <span className="font-display font-extrabold text-xl text-[#D4AF37] block">700+</span>
            <span className="text-[10px] text-neutral-400 font-mono block">Enterprise Deliveries</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0C0C12] border border-[#1E1E2C] text-center space-y-0.5">
            <span className="font-display font-extrabold text-xl text-[#D4AF37] block">12+</span>
            <span className="text-[10px] text-neutral-400 font-mono block">Global Markets</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0C0C12] border border-[#D4AF37]/40 text-center space-y-0.5">
            <span className="font-display font-extrabold text-xl text-[#D4AF37] block">100%</span>
            <span className="text-[10px] text-neutral-300 font-mono block">On-Time Delivery</span>
          </div>
        </div>

      </div>
    </section>
  );
};
