import React, { useState } from 'react';
import { PORTFOLIO_DATA, PortfolioItem } from '../data/mockData';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { ElasticPortfolioSlider } from '../components/ElasticPortfolioSlider';
import { ArrowUpRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface PortfolioPageProps {
  onOpenQuote: () => void;
}

const CATEGORIES = ['All', 'Web Development', 'App Development', 'UI/UX Design', 'AR/VR', '3D Modeling', 'Digital Marketing'];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<PortfolioItem | null>(null);

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((item) => item.category === selectedCategory);

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-28 bg-[#050508] min-h-screen font-sans overflow-x-hidden">
      <SEOHead
        title="Portfolio — Selected Client Work & Case Studies"
        description="Browse our portfolio of web apps, mobile applications, AR/VR experiences, and 3D projects delivered for global clients."
        canonical="https://riyadvisoftwaretechnologies.com/portfolio"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Page Header */}
        <div className="flex flex-col gap-5 pb-7 sm:pb-8 border-b border-[#1F1F2C]">
          <div className="space-y-3">
            <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              FEATURED CLIENT WORK
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Selected Case Studies & Engineering Projects
            </h1>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">
              Explore how we architect and scale digital platforms, mobile apps, spatial AR/VR systems, and design systems for enterprise clients worldwide.
            </p>
          </div>

          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto self-start px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs hover:bg-[#c5a02e] active:bg-[#c5a02e] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 text-black flex-shrink-0" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 border-b border-[#1E1E2C] pb-5 sm:pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-black font-extrabold shadow-md'
                  : 'bg-[#0E0E14] text-neutral-300 border border-[#222232] hover:border-[#D4AF37]/40 hover:text-white active:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Studies Showcase */}
        {filteredItems.length > 0 ? (
          <div className="space-y-12">
            {/* Elastic Slider Pro — Featured Client Work Section */}
            <div className="space-y-4">
              {/* Elastic Slider Pro header — stacks on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3">
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] leading-relaxed">
                ELASTIC SLIDER PRO · FEATURED WORK INTERACTION
              </span>
              <span className="text-[10px] font-mono text-neutral-500">
                Swipe or use controls
              </span>
            </div>
              
              <ElasticPortfolioSlider
                items={filteredItems}
                onSelectCaseStudy={(item) => setSelectedCaseStudy(item)}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-500 text-sm font-mono">
            No case studies found for this category.
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-10 sm:mt-16 bg-[#0B0C10] border border-[#1F1F2C] p-6 sm:p-10 rounded-2xl sm:rounded-[24px] flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between shadow-xl">
          <div className="space-y-1">
            <h3 className="text-white font-display font-extrabold text-lg sm:text-2xl">
              Ready to engineer your next software product?
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Schedule a 30-minute technical scope review with our lead solution architects.
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs hover:bg-[#c5a02e] active:bg-[#c5a02e] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Request Custom Solution Quote</span>
            <ArrowUpRight className="w-4 h-4 text-black flex-shrink-0" />
          </button>
        </div>

      </div>

      <CaseStudyModal
        item={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenQuote={onOpenQuote}
      />
    </div>
  );
};
