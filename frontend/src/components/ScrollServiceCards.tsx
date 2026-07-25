import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Stethoscope, Layers, Headphones, CheckCircle2 } from 'lucide-react';

interface PillarScrollItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  icon: React.ElementType;
  highlight: string;
}

const PILLAR_ITEMS: PillarScrollItem[] = [
  {
    id: 'pillar-01',
    number: '(01)',
    title: 'Pioneering Since 2021',
    description: 'Founded with a clear mandate to deliver custom software products that consistently exceed enterprise customer expectations. Over 3 years of proven engineering excellence.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&q=80&auto=format&fit=crop',
    tag: 'PILLAR 01',
    icon: ShieldCheck,
    highlight: '3+ Years Enterprise Track Record'
  },
  {
    id: 'pillar-02',
    number: '(02)',
    title: 'Free Technical Audit',
    description: 'We diagnose bottleneck vulnerabilities in your web, app, or marketing stack and deliver a strategic engineering roadmap.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop',
    tag: 'PILLAR 02',
    icon: Stethoscope,
    highlight: 'Zero-Cost Strategic Diagnosis'
  },
  {
    id: 'pillar-03',
    number: '(03)',
    title: 'End-to-End Execution',
    description: 'From wireframes and design systems to backend microservices, DevOps pipelines, and performance marketing—100% under one roof.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&q=80&auto=format&fit=crop',
    tag: 'PILLAR 03',
    icon: Layers,
    highlight: '100% In-House Multidisciplinary Team'
  },
  {
    id: 'pillar-04',
    number: '(04)',
    title: 'Dedicated Solution Partner',
    description: 'We operate as an extended engineering arm for your team, offering 24/7 technical support, strict SLAs, and dedicated account management.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80&auto=format&fit=crop',
    tag: 'PILLAR 04',
    icon: Headphones,
    highlight: '24/7 SLA & Direct Account Lead'
  }
];

export const ScrollServiceCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-triggered active item switching
  useEffect(() => {
    const handleScroll = () => {
      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.2) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeItem = PILLAR_ITEMS[activeIndex];

  return (
    <div className="w-full py-4 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* ══ LEFT STICKY PREVIEW PANEL (DESKTOP ONLY lg:block) ══ */}
        <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28 space-y-5 transition-all duration-500">
          
          {/* IMAGE CARD PREVIEW */}
          <div className="relative rounded-[28px] overflow-hidden bg-[#0D0D0D] border border-[#1F1F1F] shadow-2xl group aspect-[4/3] sm:aspect-[16/11]">
            {PILLAR_ITEMS.map((item, idx) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              />
            ))}

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/25 to-transparent opacity-85" />

            {/* Tag Badge */}
            <div className="absolute top-4 left-5 z-10">
              <span className="px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold bg-[#000000]/85 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md uppercase tracking-wider">
                {activeItem.tag}
              </span>
            </div>

            {/* Highlight Badge */}
            <div className="absolute bottom-4 right-5 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#000000]/85 border border-[#262626] backdrop-blur-md text-xs font-mono font-bold text-white">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{activeItem.highlight}</span>
            </div>
          </div>

          {/* DYNAMIC DESCRIPTION TEXT BELOW IMAGE */}
          <div className="space-y-2 px-1">
            <h4 className="font-display font-black text-xl text-white tracking-tight">
              {activeItem.title}
            </h4>
            <p className="text-neutral-300 text-sm leading-relaxed font-sans">
              {activeItem.description}
            </p>
          </div>
        </div>

        {/* ══ RIGHT SCROLLABLE LIST OF THE 4 PILLARS (INTERACTIVE ON MOBILE & DESKTOP) ══ */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4 pt-1">
          {PILLAR_ITEMS.map((item, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={item.id}
                ref={(el) => (itemRefs.current[idx] = el)}
                onClick={() => setActiveIndex(idx)}
                className={`w-full transition-all duration-300 rounded-2xl cursor-pointer ${
                  isActive
                    ? 'bg-[#0D0D0D] border border-[#D4AF37]/60 shadow-[0_15px_40px_rgba(0,0,0,0.8)] p-4 sm:p-7 translate-x-0 sm:translate-x-1'
                    : 'bg-transparent border-b border-[#1F1F1F] hover:border-[#333333] p-4 sm:p-6 opacity-65 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between gap-3 sm:gap-4">
                  {/* Left Index & Title */}
                  <div className="flex items-center gap-3 sm:gap-6">
                    <span
                      className={`font-mono text-xs sm:text-base font-bold transition-colors ${
                        isActive ? 'text-[#D4AF37]' : 'text-neutral-400'
                      }`}
                    >
                      {item.number}
                    </span>
                    <h3
                      className={`font-display font-bold text-sm sm:text-xl transition-colors ${
                        isActive ? 'text-white' : 'text-neutral-300'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Right Arrow Icon */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                      isActive
                        ? 'bg-[#D4AF37] text-black shadow-md'
                        : 'bg-[#141414] text-neutral-400 border border-[#262626]'
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Mobile expansion view — rendered directly inside the active pillar card on mobile */}
                {isActive && (
                  <div className="mt-3 pt-3 border-t border-[#1F1F1F] lg:hidden text-xs text-neutral-300 space-y-3 font-sans animate-in fade-in duration-300">
                    {/* Inline Image Preview for Mobile */}
                    <div className="relative rounded-xl overflow-hidden bg-[#000000] border border-[#22222E] aspect-[16/10] my-2 shadow-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/30 to-transparent" />

                      {/* Tag Badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold bg-[#000000]/90 text-[#D4AF37] border border-[#D4AF37]/40 uppercase tracking-wider">
                        {item.tag}
                      </span>

                      {/* Highlight Checkmark */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#000000]/90 border border-white/10 text-[10px] font-mono text-white">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                        <span>{item.highlight}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
