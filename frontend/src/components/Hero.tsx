import React, { useState, useEffect, useRef } from 'react';
import { PhoneCall, Download, ArrowRight, Award, Code2, Globe, Cpu, Server, Database, Layers, Box, Zap, Cloud, Share2, Sparkles, Palette, Terminal, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface HeroProps {
  onOpenCalendly: () => void;
  onScrollToLeadMagnet: () => void;
}

const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop',
    caption: 'ENTERPRISE SOLUTIONS',
    sub: 'Web & App Development',
  },
  {
    src: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=900&q=80&auto=format&fit=crop',
    caption: 'MOBILE INNOVATION',
    sub: 'iOS & Android Apps',
  },
  {
    src: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=900&q=80&auto=format&fit=crop',
    caption: 'IMMERSIVE TECHNOLOGY',
    sub: 'AR / VR & 3D Solutions',
  },
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop',
    caption: 'DIGITAL GROWTH',
    sub: 'Marketing & SEO',
  },
];

// Optimal slide rotation interval: 2800ms
const INTERVAL = 2800;

// GPU-Accelerated 120FPS Smooth Circular SVG Progress Ring (ZERO React state re-renders!)
const ProgressRing: React.FC<{ durationMs: number; total: number; current: number }> = ({
  durationMs, total, current,
}) => {
  const R = 20;
  const CIRC = 2 * Math.PI * R;

  return (
    <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-black/70 rounded-full border border-white/15 backdrop-blur-md shadow-xl">
      <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" />
        <circle
          key={current}
          cx="24" cy="24" r={R}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: CIRC,
            strokeDashoffset: CIRC,
            animation: `heroProgressFill ${durationMs}ms linear forwards`,
            willChange: 'stroke-dashoffset'
          }}
        />
      </svg>
      <span className="text-[9px] sm:text-[10px] font-mono font-bold text-white relative z-10">
        {current}/{total}
      </span>
    </div>
  );
};

const AVATARS = ['AR', 'SK', 'MJ', 'PR', 'VK'];
const AV_COLORS = ['bg-violet-600', 'bg-sky-600', 'bg-emerald-700', 'bg-orange-600', 'bg-pink-700'];

export const Hero: React.FC<HeroProps> = ({ onOpenCalendly, onScrollToLeadMagnet }) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Preload all 4 hero images into browser memory immediately on mount to prevent any slow loading delays
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, INTERVAL);
  };

  useEffect(() => {
    startCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    startCycle();
  };

  const prevSlide = () => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
    startCycle();
  };

  const nextSlide = () => {
    setCurrent((c) => (c + 1) % SLIDES.length);
    startCycle();
  };

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
        nextSlide(); // Swiped left -> next slide
      } else {
        prevSlide(); // Swiped right -> prev slide
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative bg-[#000000] overflow-hidden"
      style={{ paddingTop: '72px', minHeight: '100vh' }}
    >
      {/* ── Keyframe style for GPU direct 120FPS progress ring animation ── */}
      <style>{`
        @keyframes heroProgressFill {
          0% {
            stroke-dashoffset: 125.66;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {/* ── Subtle Luxury Mesh Lighting ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/3 left-10 w-[550px] h-[350px] bg-gradient-to-br from-[#D4AF37]/10 via-amber-500/5 to-transparent rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-gradient-to-tl from-indigo-900/10 via-purple-900/5 to-transparent rounded-full blur-[140px]" />
        
        {/* Crisp Technical Grid */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 h-full">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center"
          style={{ minHeight: 'calc(100vh - 72px)' }}
        >

          {/* ══ LEFT COLUMN: High-Impact Typography & Social Proof ══ */}
          <div className="flex flex-col justify-center py-10 sm:py-16 lg:py-0 space-y-6 sm:space-y-8 lg:pr-16">

            {/* Social Proof Bar with Star Rating */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center">
                {AVATARS.map((av, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${AV_COLORS[i]} border-2 border-black flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 shadow-md`}
                    style={{ marginLeft: i === 0 ? 0 : '-10px', zIndex: AVATARS.length - i }}
                  >
                    {av}
                  </div>
                ))}
                <div
                  className="w-8 h-8 rounded-full bg-[#1A1A1A] border-2 border-black flex items-center justify-center text-[9px] font-bold text-neutral-300 flex-shrink-0 shadow-md"
                  style={{ marginLeft: '-10px' }}
                >
                  +32
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-medium">
                <div className="flex items-center text-[#D4AF37]">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <span>
                  <strong className="text-white font-semibold">4.9/5</strong> (1,000+ Clients)
                </span>
              </div>
            </div>

            {/* Crisp Executive Headline */}
            <div className="space-y-1">
              <h1
                className="font-display font-black text-white tracking-tight leading-[1.05] text-3xl sm:text-5xl lg:text-auto"
                style={{ fontSize: 'var(--hero-h1-size, clamp(2.6rem, 4.8vw, 4rem))' }}
              >
                We Build
              </h1>
              <h1
                className="font-display font-black tracking-tight leading-[1.05] text-3xl sm:text-5xl lg:text-auto text-white/40"
                style={{ fontSize: 'var(--hero-h1-size, clamp(2.6rem, 4.8vw, 4rem))' }}
              >
                Software That
              </h1>
              <h1
                className="font-display font-black text-[#D4AF37] tracking-tight leading-[1.05] text-3xl sm:text-5xl lg:text-auto drop-shadow-[0_4px_24px_rgba(212,175,55,0.25)]"
                style={{ fontSize: 'var(--hero-h1-size, clamp(2.6rem, 4.8vw, 4rem))' }}
              >
                Drives Growth.
              </h1>
            </div>

            {/* Sub-headline / Value Proposition */}
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-[450px] font-sans">
              Enterprise Web Platforms, Mobile Apps, AR/VR Experiences, and Digital Growth Engines — engineered end-to-end for businesses that want to scale seamlessly.
            </p>

            {/* High-Contrast CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={onOpenCalendly}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-neutral-100 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
              >
                <PhoneCall className="w-4 h-4 flex-shrink-0" />
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </button>
              <button
                onClick={onScrollToLeadMagnet}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#0F0F14] text-white font-bold text-xs sm:text-sm border border-[#2A2A38] hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition-all cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4 flex-shrink-0" />
                <span>Free Blueprint</span>
              </button>
            </div>

            {/* Industry Award Credibility */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 pt-1">
              <Award className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span>
                <strong className="text-neutral-300 font-semibold">Star of Excellence Winner</strong>
                {' '}· National Integrity Cultural Academy
              </span>
            </div>
          </div>

          {/* ══ RIGHT COLUMN: Premium Image Showcase Container ══ */}
          <div className="flex lg:flex items-center justify-center lg:justify-end py-6 lg:py-10">
            <div className="relative w-full group" style={{ maxWidth: '580px' }}>

              {/* Main Slideshow Frame */}
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-[#1F1F2C] border-t-2 border-t-[#D4AF37]/70 shadow-[0_20px_50px_rgba(0,0,0,0.8)] touch-pan-y select-none"
                style={{ aspectRatio: '4/3' }}
              >
                {/* Image Slides */}
                {SLIDES.map((slide, idx) => (
                  <img
                    key={idx}
                    src={slide.src}
                    alt={slide.sub}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                    style={{ opacity: idx === current ? 1 : 0 }}
                  />
                ))}

                {/* Manual Navigation Controls (Hover Arrow Overlay) */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black cursor-pointer shadow-lg"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black cursor-pointer shadow-lg"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Bottom Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Slide Caption Overlay */}
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 space-y-0.5 z-20">
                  <div className="text-[10px] font-mono font-semibold text-[#D4AF37] uppercase tracking-[0.18em]">
                    {SLIDES[current].caption}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    {SLIDES[current].sub}
                  </div>
                </div>

                {/* GPU Direct 120FPS Circular Progress Ring */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20">
                  <ProgressRing
                    durationMs={INTERVAL}
                    total={SLIDES.length}
                    current={current + 1}
                  />
                </div>
              </div>

              {/* Slide Dot Indicators Below */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      idx === current
                        ? 'w-6 h-1.5 bg-[#D4AF37]'
                        : 'w-1.5 h-1.5 bg-[#2A2A2A] hover:bg-[#555]'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM STRIP: Stats + Marquee ── */}
      <div className="border-t border-[#1A1A1A] relative z-10">
        {/* Stats Row */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#1A1A1A]">
            {[
              { value: '700+',  label: 'Projects Delivered' },
              { value: '1000+', label: 'Global Clients' },
              { value: '4+',    label: 'Years of Excellence' },
              { value: '100%',  label: 'Client Satisfaction', gold: true },
            ].map((s) => (
              <div key={s.label} className="py-5 sm:py-6 px-4 sm:px-6 text-center">
                <div className={`font-display font-black text-xl sm:text-2xl leading-none ${s.gold ? 'text-[#D4AF37]' : 'text-white'}`}>
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-[11px] text-neutral-600 font-mono uppercase tracking-wide mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modern Tech Marquee Section */}
        <div className="border-t border-[#16161C] py-4 sm:py-5 relative overflow-hidden bg-[#000000]">
          {/* Gradient Side Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 lg:w-36 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 lg:w-36 bg-gradient-to-l from-[#000000] via-[#000000]/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Header Eyebrow */}
          <div className="text-center mb-2.5 sm:mb-3 px-4">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#D4AF37] block leading-snug">
              ENTERPRISE TECH STACK &amp; ENGINE ARCHITECTURE
            </span>
          </div>

          <div className="flex overflow-hidden relative">
            <div className="flex animate-marquee gap-2 sm:gap-3 py-1 items-center">
              {[
                { name: 'React.js', icon: Code2 },
                { name: 'Next.js', icon: Globe },
                { name: 'TypeScript', icon: Terminal },
                { name: 'Node.js', icon: Server },
                { name: 'Python', icon: Cpu },
                { name: 'Flutter', icon: Share2 },
                { name: 'Unity 3D', icon: Box },
                { name: 'AWS Cloud', icon: Cloud },
                { name: 'Docker', icon: Layers },
                { name: 'MongoDB', icon: Database },
                { name: 'PostgreSQL', icon: Database },
                { name: 'GraphQL', icon: Zap },
                { name: 'Unreal Engine', icon: Sparkles },
                { name: 'Figma', icon: Palette },
                { name: 'React.js', icon: Code2 },
                { name: 'Next.js', icon: Globe },
                { name: 'TypeScript', icon: Terminal },
                { name: 'Node.js', icon: Server },
                { name: 'Python', icon: Cpu },
                { name: 'Flutter', icon: Share2 },
                { name: 'Unity 3D', icon: Box },
                { name: 'AWS Cloud', icon: Cloud },
                { name: 'Docker', icon: Layers },
                { name: 'MongoDB', icon: Database },
                { name: 'PostgreSQL', icon: Database },
                { name: 'GraphQL', icon: Zap },
                { name: 'Unreal Engine', icon: Sparkles },
                { name: 'Figma', icon: Palette },
              ].map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#09090D] border border-[#1E1E26] hover:border-[#D4AF37]/50 transition-all duration-300 group whitespace-nowrap cursor-default shadow-md flex-shrink-0"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-[11px] sm:text-xs font-sans font-semibold text-neutral-200 group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
