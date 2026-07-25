import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Globe,
  Smartphone,
  TrendingUp,
  Eye,
  Box,
  Gamepad2,
  Layout
} from 'lucide-react';

const SERVICE_CAROUSEL_ITEMS = [
  {
    id: 'web-development',
    title: 'Web Development',
    badge: 'POPULAR',
    badgeBg: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50',
    accentColor: '#D4AF37',
    desc: 'High-performance websites & SaaS platforms built with modern React, Next.js, and Node.js.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80&auto=format&fit=crop',
    icon: Globe,
    subServices: ['Custom Website', 'SaaS Platform', 'E-Commerce']
  },
  {
    id: 'app-development',
    title: 'App Development',
    badge: 'FEATURED',
    badgeBg: 'bg-sky-500/20 text-sky-400 border-sky-500/50',
    accentColor: '#38BDF8',
    desc: 'Native iOS & Android mobile applications engineered with React Native & Flutter for high engagement.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&q=80&auto=format&fit=crop',
    icon: Smartphone,
    subServices: ['Native Android', 'Cross-Platform', 'Native iOS']
  },
  {
    id: 'ar-vr',
    title: 'AR & VR Solutions',
    badge: 'FUTURE TECH',
    badgeBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
    accentColor: '#10B981',
    desc: 'Immersive 3D spatial computing, WebAR product visualization, and virtual reality training simulations.',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=900&q=80&auto=format&fit=crop',
    icon: Eye,
    subServices: ['Virtual Reality', 'Augmented Reality', 'Spatial 3D']
  },
  {
    id: '3d-modeling',
    title: '3D Modelling & Renders',
    badge: 'PREMIUM',
    badgeBg: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    accentColor: '#F97316',
    desc: 'Photorealistic 3D assets, architectural walkthroughs, and CAD product prototyping.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format&fit=crop',
    icon: Box,
    subServices: ['3D Product Renders', 'Game Assets', 'CGI Animation']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    badge: 'HIGH ROI',
    badgeBg: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    accentColor: '#A855F7',
    desc: 'Data-driven search engine optimization, performance ad campaigns, and automated lead funnels.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop',
    icon: TrendingUp,
    subServices: ['Technical SEO', 'Social Media', 'Lead Funnels']
  },
  {
    id: 'game-development',
    title: 'Game Development',
    badge: 'NEW',
    badgeBg: 'bg-pink-500/20 text-pink-400 border-pink-500/50',
    accentColor: '#EC4899',
    desc: 'Captivating 2D/3D mobile & desktop games powered by Unity 3D & Unreal Engine 5.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80&auto=format&fit=crop',
    icon: Gamepad2,
    subServices: ['Mobile Gaming', '3D Worlds', 'Multiplayer Engine']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Systems',
    badge: 'DESIGN SYSTEM',
    badgeBg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50',
    accentColor: '#6366F1',
    desc: 'Research-backed wireframes, interactive Figma prototypes, and cohesive UI component libraries.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&q=80&auto=format&fit=crop',
    icon: Layout,
    subServices: ['Wireframing', 'Design Tokens', 'UX Research']
  }
];

export const ThreeDServiceCarousel: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const total = SERVICE_CAROUSEL_ITEMS.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer (3.6s interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, 3600);

    return () => clearInterval(timer);
  }, [total]);

  // Keyboard arrow keys listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 40) nextSlide();
    if (diff < -40) prevSlide();
    setTouchStart(null);
  };

  const currentItem = SERVICE_CAROUSEL_ITEMS[activeIdx];

  return (
    <div
      className="relative w-full py-4 sm:py-6 select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* BACKGROUND AMBIENT RADIAL GLOW BEHIND CENTER ACTIVE CARD */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] rounded-full pointer-events-none transition-all duration-700 blur-[80px] sm:blur-[100px] opacity-25"
        style={{ backgroundColor: currentItem.accentColor }}
      />

      {/* STAGE CONTAINER WITH PERSPECTIVE */}
      <div className="relative min-h-[500px] sm:min-h-[620px] flex items-center justify-center">

        {/* LEFT ARROW NAVIGATION BUTTON */}
        <button
          onClick={prevSlide}
          className="absolute left-1 sm:left-6 lg:left-12 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#0E0E12]/90 border border-[#262632] text-neutral-200 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#181822] active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xl backdrop-blur-lg group"
          aria-label="Previous Capability"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* RIGHT ARROW NAVIGATION BUTTON */}
        <button
          onClick={nextSlide}
          className="absolute right-1 sm:right-6 lg:right-12 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#0E0E12]/90 border border-[#262632] text-neutral-200 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#181822] active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xl backdrop-blur-lg group"
          aria-label="Next Capability"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* 3D PERSPECTIVE CAROUSEL STAGE */}
        <div
          className="w-full max-w-[1240px] h-[490px] sm:h-[550px] relative flex items-center justify-center"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          {SERVICE_CAROUSEL_ITEMS.map((item, idx) => {
            let offset = idx - activeIdx;
            if (offset > Math.floor(total / 2)) offset -= total;
            if (offset < -Math.floor(total / 2)) offset += total;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isFarLeft = offset === -2;
            const isFarRight = offset === 2;

            // Compute dynamic responsive 3D transforms
            let transformStr = 'translateX(0px) rotateY(0deg) scale(1) translateZ(0px)';
            let opacityVal = 0;
            let zIndexVal = 10;
            let filterVal = 'brightness(0.4)';
            let pointerEventsVal: 'auto' | 'none' = 'none';

            if (isMobile) {
              // Mobile 3D Coverflow Stage (Scaled 3D Perspective for small screens)
              if (isCenter) {
                transformStr = 'translateX(0%) rotateY(0deg) scale(1.02) translateZ(0px)';
                opacityVal = 1;
                zIndexVal = 30;
                filterVal = 'brightness(1)';
                pointerEventsVal = 'auto';
              } else if (isLeft) {
                transformStr = 'translateX(-58%) rotateY(28deg) scale(0.8) translateZ(-70px)';
                opacityVal = 0.65;
                zIndexVal = 20;
                filterVal = 'brightness(0.55)';
                pointerEventsVal = 'auto';
              } else if (isRight) {
                transformStr = 'translateX(58%) rotateY(-28deg) scale(0.8) translateZ(-70px)';
                opacityVal = 0.65;
                zIndexVal = 20;
                filterVal = 'brightness(0.55)';
                pointerEventsVal = 'auto';
              } else if (isFarLeft) {
                transformStr = 'translateX(-105%) rotateY(40deg) scale(0.6) translateZ(-140px)';
                opacityVal = 0.15;
                zIndexVal = 10;
                filterVal = 'brightness(0.3)';
                pointerEventsVal = 'none';
              } else if (isFarRight) {
                transformStr = 'translateX(105%) rotateY(-40deg) scale(0.6) translateZ(-140px)';
                opacityVal = 0.15;
                zIndexVal = 10;
                filterVal = 'brightness(0.3)';
                pointerEventsVal = 'none';
              }
            } else {
              // Desktop 3D Coverflow Stage (sm+)
              if (isCenter) {
                transformStr = 'translateX(0%) rotateY(0deg) scale(1.05) translateZ(0px)';
                opacityVal = 1;
                zIndexVal = 30;
                filterVal = 'brightness(1)';
                pointerEventsVal = 'auto';
              } else if (isLeft) {
                transformStr = 'translateX(-78%) rotateY(32deg) scale(0.85) translateZ(-90px)';
                opacityVal = 0.75;
                zIndexVal = 20;
                filterVal = 'brightness(0.68)';
                pointerEventsVal = 'auto';
              } else if (isRight) {
                transformStr = 'translateX(78%) rotateY(-32deg) scale(0.85) translateZ(-90px)';
                opacityVal = 0.75;
                zIndexVal = 20;
                filterVal = 'brightness(0.68)';
                pointerEventsVal = 'auto';
              } else if (isFarLeft) {
                transformStr = 'translateX(-135%) rotateY(46deg) scale(0.65) translateZ(-180px)';
                opacityVal = 0.15;
                zIndexVal = 10;
                filterVal = 'brightness(0.3)';
                pointerEventsVal = 'none';
              } else if (isFarRight) {
                transformStr = 'translateX(135%) rotateY(-46deg) scale(0.65) translateZ(-180px)';
                opacityVal = 0.15;
                zIndexVal = 10;
                filterVal = 'brightness(0.3)';
                pointerEventsVal = 'none';
              }
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isLeft) prevSlide();
                  if (isRight) nextSlide();
                }}
                className="absolute w-[240px] xs:w-[270px] sm:w-[350px] md:w-[370px] h-[470px] sm:h-[520px] rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer"
                style={{
                  transform: transformStr,
                  opacity: opacityVal,
                  zIndex: zIndexVal,
                  filter: filterVal,
                  pointerEvents: pointerEventsVal,
                  backgroundColor: '#09090D',
                  border: isCenter ? `1.5px solid ${item.accentColor}` : '1px solid #1E1E26',
                  boxShadow: isCenter
                    ? `0 30px 60px -15px rgba(0,0,0,0.95), 0 0 35px ${item.accentColor}35`
                    : '0 15px 35px rgba(0,0,0,0.8)',
                  transition: 'transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.65s ease, filter 0.65s ease'
                }}
              >
                {/* TOP IMAGE SECTION */}
                <div className="relative h-[260px] sm:h-[310px] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090D] via-[#09090D]/30 to-transparent" />

                  {/* TOP BADGE LABEL */}
                  <div className="absolute top-3.5 left-4 sm:top-4 sm:left-5 z-10 flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase border backdrop-blur-md ${item.badgeBg}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* CARD COUNT INDEX IN TOP RIGHT */}
                  <div className="absolute top-3.5 right-4 sm:top-4 sm:right-5 z-10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono font-bold text-neutral-300">
                    0{idx + 1} / 0{total}
                  </div>
                </div>

                {/* BOTTOM CONTENT AREA */}
                <div className="p-5 sm:p-6 pt-2 space-y-2.5 sm:space-y-3 flex flex-col justify-between h-[210px] bg-[#09090D]">
                  <div className="space-y-1.5 sm:space-y-2">
                    {/* TITLE */}
                    <h3 className="font-display font-bold text-lg sm:text-2xl text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed font-sans line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* DOT INDICATOR NAVIGATION */}
                  {isCenter && (
                    <div className="flex items-center justify-center gap-1.5 py-1">
                      {SERVICE_CAROUSEL_ITEMS.map((_, dotIdx) => {
                        const isDotActive = dotIdx === activeIdx;
                        return (
                          <button
                            key={dotIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveIdx(dotIdx);
                            }}
                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                              isDotActive
                                ? 'w-5 h-1.5'
                                : 'w-1.5 h-1.5 bg-[#252532] hover:bg-[#444455]'
                            }`}
                            style={{
                              backgroundColor: isDotActive ? item.accentColor : undefined
                            }}
                            aria-label={`Jump to slide ${dotIdx + 1}`}
                          />
                        );
                      })}
                    </div>
                  )}

                  {/* CTA LINK */}
                  <div className="pt-0.5">
                    <Link
                      to={`/services/${item.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold transition-all group/btn"
                      style={{ color: item.accentColor }}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
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
