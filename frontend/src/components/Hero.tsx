import React, { useState, useEffect, useRef } from 'react';
import { PhoneCall, Download, ArrowRight, Award, Code2, Globe, Cpu, Server, Database, Layers, Box, Zap, Cloud, Share2, Sparkles, Palette, Terminal } from 'lucide-react';

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

const INTERVAL = 5000; // ms per slide

// Circular SVG progress ring
const ProgressRing: React.FC<{ progress: number; total: number; current: number }> = ({
  progress, total, current,
}) => {
  const R = 20;
  const CIRC = 2 * Math.PI * R;
  const dash = CIRC * progress;
  return (
    <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
      <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" />
        <circle
          cx="24" cy="24" r={R}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${CIRC}`}
          style={{ transition: 'stroke-dasharray 0.1s linear' }}
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
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    const step = 50;
    const ticks = INTERVAL / step;
    let tick = 0;

    progressRef.current = setInterval(() => {
      tick++;
      setProgress(tick / ticks);
    }, step);

    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
      tick = 0;
      setProgress(0);
    }, INTERVAL);
  };

  useEffect(() => {
    startCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    startCycle();
  };

  return (
    <section
      className="relative bg-[#000000] overflow-hidden"
      style={{ paddingTop: '72px', minHeight: '100vh' }}
    >
      {/* ── Background Grid & Lines ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        <svg
          className="absolute left-0 top-0 w-full lg:w-1/2 h-full opacity-[0.04]"
          viewBox="0 0 500 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <rect x="60" y="60" width="340" height="480" rx="4" stroke="white" strokeWidth="0.8"/>
          <rect x="100" y="100" width="260" height="380" rx="4" stroke="white" strokeWidth="0.6"/>
          <line x1="60" y1="60" x2="400" y2="540" stroke="white" strokeWidth="0.5"/>
          <line x1="400" y1="60" x2="60" y2="540" stroke="white" strokeWidth="0.5"/>
          <circle cx="230" cy="300" r="120" stroke="white" strokeWidth="0.6"/>
          <rect x="160" y="220" width="140" height="160" rx="2" stroke="white" strokeWidth="0.5"/>
        </svg>
      </div>

      {/* ── SPLIT GRID ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 h-full">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center"
          style={{ minHeight: 'calc(100vh - 72px)' }}
        >

          {/* ══ LEFT CONTENT ══ */}
          <div className="flex flex-col justify-center py-10 sm:py-16 lg:py-0 space-y-6 sm:space-y-8 lg:pr-16">

            {/* Avatar row social proof */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="flex items-center">
                {AVATARS.map((av, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${AV_COLORS[i]} border-2 border-black flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}
                    style={{ marginLeft: i === 0 ? 0 : '-10px', zIndex: AVATARS.length - i }}
                  >
                    {av}
                  </div>
                ))}
                <div
                  className="w-8 h-8 rounded-full bg-[#1A1A1A] border-2 border-black flex items-center justify-center text-[9px] font-bold text-neutral-300 flex-shrink-0"
                  style={{ marginLeft: '-10px' }}
                >
                  +32
                </div>
              </div>
              <span className="text-xs sm:text-sm text-neutral-400 font-medium">
                Trusted by <span className="text-white font-semibold">1000+ clients</span> worldwide
              </span>
            </div>

            {/* Headline — Original Clamp on Desktop, Crisp Scale on Mobile */}
            <div className="space-y-1">
              <h1
                className="font-display font-black text-white tracking-tight leading-[1.06] text-3xl sm:text-5xl lg:text-auto"
                style={{ fontSize: 'var(--hero-h1-size, clamp(2.6rem, 4.8vw, 4rem))' }}
              >
                We Build
              </h1>
              <h1
                className="font-display font-black tracking-tight leading-[1.06] text-3xl sm:text-5xl lg:text-auto"
                style={{ fontSize: 'var(--hero-h1-size, clamp(2.6rem, 4.8vw, 4rem))', color: 'rgba(255,255,255,0.35)' }}
              >
                Software That
              </h1>
              <h1
                className="font-display font-black text-[#D4AF37] tracking-tight leading-[1.06] text-3xl sm:text-5xl lg:text-auto"
                style={{ fontSize: 'var(--hero-h1-size, clamp(2.6rem, 4.8vw, 4rem))' }}
              >
                Drives Growth.
              </h1>
            </div>

            {/* Body */}
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-[420px] font-sans">
              Enterprise Web Platforms, Mobile Apps, AR/VR Experiences, and Digital Growth Engines — engineered end-to-end for businesses that want to scale.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenCalendly}
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-neutral-100 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md"
              >
                <PhoneCall className="w-4 h-4 flex-shrink-0" />
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </button>
              <button
                onClick={onScrollToLeadMagnet}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-transparent text-white font-bold text-xs sm:text-sm border border-[#2A2A2A] hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 flex-shrink-0" />
                <span>Free Blueprint</span>
              </button>
            </div>

            {/* Award */}
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <Award className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
              <span>
                <span className="text-neutral-400">Star of Excellence 2021</span>
                {' '}· National Integrity Cultural Academy
              </span>
            </div>
          </div>

          {/* ══ RIGHT — Slideshow (100% Original Desktop Layout + Responsive Mobile) ══ */}
          <div className="flex lg:flex items-center justify-center lg:justify-end py-6 lg:py-10">
            <div className="relative w-full" style={{ maxWidth: '580px' }}>

              {/* Slideshow container */}
              <div
                className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-[#1F1F2C]"
                style={{ aspectRatio: '4/3' }}
              >
                {/* Slides */}
                {SLIDES.map((slide, idx) => (
                  <img
                    key={idx}
                    src={slide.src}
                    alt={slide.sub}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: idx === current ? 1 : 0 }}
                  />
                ))}

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Caption — bottom left */}
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 space-y-0.5">
                  <div className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-[0.18em]">
                    {SLIDES[current].caption}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {SLIDES[current].sub}
                  </div>
                </div>

                {/* Progress ring — bottom right */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                  <ProgressRing
                    progress={progress}
                    total={SLIDES.length}
                    current={current + 1}
                  />
                </div>
              </div>

              {/* Dot indicators below */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      idx === current
                        ? 'w-6 h-1.5 bg-[#D4AF37]'
                        : 'w-1.5 h-1.5 bg-[#2A2A2A] hover:bg-[#444]'
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
        {/* Stats row */}
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
          {/* Gradient Side Fade Masks — Slim on mobile (w-8), wide on desktop (w-36) */}
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
