import React, { useState, useEffect } from 'react';
import { Calendar, X, ArrowRight, PhoneCall } from 'lucide-react';

interface StickyCtaBarProps {
  onOpenCalendly: () => void;
  onOpenQuote: () => void;
}

export const StickyCtaBar: React.FC<StickyCtaBarProps> = ({ onOpenCalendly, onOpenQuote }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:inset-x-auto z-40 w-full sm:w-auto sm:max-w-2xl bg-[#09090D]/95 backdrop-blur-xl border-t sm:border border-[#222230] sm:rounded-2xl p-3.5 sm:p-4 px-4 sm:px-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4 font-sans animate-fadeInUp"
    >
      {/* Left Info: Icon & Headline */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#14141F] border border-[#28283A] flex-shrink-0 flex items-center justify-center text-[#D4AF37]">
          <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-display font-bold text-xs sm:text-sm text-white tracking-tight leading-snug">
            Ready to Build Your Software Project?
          </h4>
          <p className="text-[11px] text-neutral-400 hidden md:block">
            Book a 1-on-1 strategy call or request a custom estimate within 24 hours.
          </p>
        </div>
      </div>

      {/* Right Actions: Buttons & Dismiss */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onOpenCalendly}
          className="px-3.5 sm:px-4 py-2 text-xs font-extrabold text-black bg-[#D4AF37] hover:bg-[#c5a02e] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95 whitespace-nowrap"
        >
          <Calendar className="w-3.5 h-3.5 text-black" />
          <span>Book Call</span>
        </button>

        <button
          onClick={onOpenQuote}
          className="px-3.5 py-2 text-xs font-bold text-neutral-200 border border-[#2A2A3A] bg-[#14141F] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] rounded-xl transition-all hidden sm:flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span>Get Quote</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsDismissed(true)}
          className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer ml-1"
          aria-label="Dismiss sticky CTA bar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
