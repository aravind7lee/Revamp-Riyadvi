import React from 'react';
import { X, MapPin, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '../data/mockData';

interface CaseStudyModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ item, onClose, onOpenQuote }) => {
  if (!item) return null;

  return (
    // Outer: full-screen scroll container, z above navbar
    <div
      className="fixed inset-0 z-[200] overflow-y-auto bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Inner: centers modal horizontally with responsive padding */}
      <div className="min-h-full flex items-start justify-center px-3 sm:px-4 pt-16 sm:pt-24 pb-8 sm:pb-12">

        {/* Panel */}
        <div
          className="bg-[#080810] border border-[#1F1F2C] rounded-2xl max-w-3xl w-full relative shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button — sticky top right */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-9 h-9 rounded-xl bg-black/75 border border-white/20 text-neutral-300 hover:text-white hover:border-[#D4AF37] transition-all flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md active:scale-95"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Image */}
          <div className="relative h-44 sm:h-64 w-full overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="px-4 sm:px-10 py-5 sm:py-8 space-y-6 sm:space-y-8">

            {/* Header */}
            <div className="pb-5 sm:pb-8 border-b border-[#1F1F2C] space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded border border-[#D4AF37]/30 uppercase">
                  {item.category}
                </span>
                <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" />
                  <span>{item.client} · {item.clientLocation}</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">● Live &amp; Deployed</span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-3xl text-white tracking-tight leading-tight">
                {item.title}
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
                {item.summary}
              </p>
            </div>

            {/* Metrics row */}
            <div className="py-5 sm:py-8 border-b border-[#1F1F2C] grid grid-cols-3 gap-2 sm:gap-6">
              {item.metrics.map((m) => (
                <div key={m.label} className="space-y-0.5 p-2 sm:p-3 rounded-xl bg-[#0E0E16] border border-[#1E1E2C] text-center">
                  <p className="text-base sm:text-2xl font-display font-black text-[#D4AF37] leading-none">{m.value}</p>
                  <p className="text-[8px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-wider mt-1 truncate">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Challenge & Approach */}
            <div className="py-5 sm:py-8 border-b border-[#1F1F2C] grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">The Challenge</p>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">{item.problem}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-bold">Our Approach</p>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">{item.solution}</p>
              </div>
            </div>

            {/* Result */}
            <div className="py-5 sm:py-8 border-b border-[#1F1F2C] space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">Outcome &amp; Business Impact</p>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">{item.result}</p>
            </div>

            {/* Tech Stack */}
            <div className="py-5 sm:py-8 border-b border-[#1F1F2C] space-y-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">Technology Stack</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {item.toolsUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-[10px] sm:text-xs font-mono text-neutral-300 bg-[#0E0E14] border border-[#1E1E2C] rounded-lg"
                  >
                    #{tool}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <p className="text-xs text-neutral-400 text-center sm:text-left">
                Need a similar solution for your business?
              </p>
              <button
                onClick={() => { onClose(); onOpenQuote(); }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs hover:bg-[#c5a02e] active:bg-[#c5a02e] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md whitespace-nowrap"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
