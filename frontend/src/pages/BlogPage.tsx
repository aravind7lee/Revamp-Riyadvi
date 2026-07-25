import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/mockData';
import {
  Clock, ArrowRight, User, Calendar, ArrowLeft, Search,
  ChevronLeft, ChevronRight, Tag
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

/* ─────────────────────────────────────────────
   Horizontal ScrollX Carousel
   Pointer / touch drag with momentum + arrows
   Mobile-first: cards sized to viewport width
───────────────────────────────────────────── */
const HorizontalScrollX: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const pointerDownX = useRef(0);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const rafId = useRef<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDraggingState, setIsDraggingState] = useState(false);

  // On mobile fingers move more — use a slightly larger threshold
  const DRAG_THRESHOLD = 8;

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      ro.disconnect();
    };
  }, [updateArrows]);

  /* Momentum deceleration */
  const runMomentum = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    if (Math.abs(velocity.current) < 0.5) {
      velocity.current = 0;
      return;
    }
    el.scrollLeft += velocity.current;
    velocity.current *= 0.92;
    rafId.current = requestAnimationFrame(runMomentum);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    pointerDownX.current = e.pageX;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    lastX.current = e.pageX;
    velocity.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const el = trackRef.current;
    if (!el) return;

    const totalMove = Math.abs(e.pageX - pointerDownX.current);

    if (!hasDragged.current) {
      if (totalMove < DRAG_THRESHOLD) return;
      hasDragged.current = true;
      setIsDraggingState(true);
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
    }

    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    velocity.current = (e.pageX - lastX.current) * 1.4;
    lastX.current = e.pageX;
    el.scrollLeft = scrollLeft.current - walk;
  };

  const onPointerUp = () => {
    isDragging.current = false;
    setIsDraggingState(false);
    if (hasDragged.current) {
      rafId.current = requestAnimationFrame(runMomentum);
    }
  };

  /* Block click only if a real drag happened */
  const onClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation();
      hasDragged.current = false;
    }
  };

  const scrollByCard = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-blog-card]') as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 20 : 300;
    el.scrollBy({ left: dir === 'right' ? cardWidth : -cardWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Left Arrow — hidden on mobile, shown on md+ */}
      <button
        onClick={() => scrollByCard('left')}
        className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 w-10 h-10 rounded-full bg-[#0D0D0D] border border-[#262626] items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-xl ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Right Arrow — hidden on mobile, shown on md+ */}
      <button
        onClick={() => scrollByCard('right')}
        className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 w-10 h-10 rounded-full bg-[#0D0D0D] border border-[#262626] items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-xl ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Fade edges — only on md+ where arrows exist */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />

      {/* Scrollable track
          On mobile: no extra px — the cards use 100vw-based width so they fit perfectly
          On md+:    px-4 to give arrow overlap room */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onClickCapture={onClickCapture}
        className={`flex gap-5 overflow-x-auto scrollbar-hide pb-4 select-none ${isDraggingState ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', touchAction: 'pan-x' }}
      >
        {children}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Category pill color map
───────────────────────────────────────────── */
const CAT_COLORS: Record<string, string> = {
  'Web Development':   'text-sky-400 bg-sky-400/10 border-sky-400/20',
  'App Development':   'text-violet-400 bg-violet-400/10 border-violet-400/20',
  'Digital Marketing': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'AR/VR':             'text-rose-400 bg-rose-400/10 border-rose-400/20',
  'Architecture':      'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'Business Strategy': 'text-teal-400 bg-teal-400/10 border-teal-400/20',
};

/* ─────────────────────────────────────────────
   Blog Card
   Width: (100vw - outer px*2 - gap) on mobile
          360px fixed on sm+
───────────────────────────────────────────── */
const BlogCard: React.FC<{ post: BlogPost; onClick: () => void }> = ({ post, onClick }) => {
  const colorCls = CAT_COLORS[post.category] ?? 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20';

  return (
    <article
      data-blog-card
      onClick={onClick}
      /* On mobile: fill (100vw - 32px for px-4 outer*2), cap at 340px for sm+ */
      className="flex-shrink-0 w-[calc(100vw-32px)] max-w-[340px] sm:w-[340px] sm:max-w-none bg-[#0A0A12] border border-[#1A1A2A] rounded-2xl overflow-hidden flex flex-col group hover:border-[#D4AF37]/40 active:border-[#D4AF37]/60 transition-all duration-300 cursor-pointer"
      style={{ userSelect: 'none' }}
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden flex-shrink-0">
        <img
          src={post.image}
          alt={post.title}
          draggable={false}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-[#0A0A12]/20 to-transparent" />
        <span className={`absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${colorCls}`}>
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        {/* Meta */}
        <div className="flex items-center gap-2.5 text-[11px] font-mono text-neutral-500">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3 flex-shrink-0" />{post.date}</span>
          <span className="text-neutral-700">·</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3 flex-shrink-0" />{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-sm sm:text-[15px] text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 sm:line-clamp-3 font-sans flex-1">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1A1A2A]">
          <span className="text-[11px] text-neutral-400 font-mono truncate pr-2">{post.author.name}</span>
          <span className="flex-shrink-0 flex items-center gap-1 text-[11px] font-bold text-[#D4AF37]">
            Read <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </article>
  );
};

/* ─────────────────────────────────────────────
   Article Detail View — fully mobile-safe
───────────────────────────────────────────── */
const ArticleDetail: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
  const colorCls = CAT_COLORS[post.category] ?? 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20';

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 sm:space-y-8">
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-neutral-400 hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 flex-shrink-0" />
        Back to All Articles
      </button>

      {/* Hero Image */}
      <div className="w-full h-52 sm:h-72 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden border border-[#1A1A2A]">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Category + Title + Meta */}
      <div className="space-y-4">
        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border inline-block ${colorCls}`}>
          {post.category}
        </span>

        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white leading-tight break-words">
          {post.title}
        </h2>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-neutral-400 border-b border-[#1A1A2A] pb-5 sm:pb-6">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
            <span className="break-words">{post.author.name}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 bg-[#0D0D0D] border border-[#1A1A2A] px-2.5 py-1 rounded-full"
            >
              <Tag className="w-2.5 h-2.5 flex-shrink-0" />{tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="text-neutral-300 text-sm leading-relaxed font-sans whitespace-pre-line break-words overflow-hidden">
        {post.content}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main BlogPage
───────────────────────────────────────────── */
export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = [
    'All', 'Web Development', 'App Development',
    'Digital Marketing', 'AR/VR', 'Architecture', 'Business Strategy',
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePost]);

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#000000] min-h-screen overflow-x-hidden">
      <SEOHead
        title="Blog — Engineering Insights, Web Dev & Digital Strategy"
        description="Technical articles, web development guides, React 19 benchmarks, mobile app strategies, and digital marketing insights from Riyadvi Software Technologies."
        canonical="https://riyadvisoftwaretechnologies.com/blog"
      />

      {activePost ? (
        /* ── Article Detail: has its own px padding ── */
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ArticleDetail post={activePost} onBack={() => setActivePost(null)} />
        </div>
      ) : (
        /* ── Listing ── */
        <div className="space-y-10 sm:space-y-12">

          {/* ── Header: padded ── */}
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="border-b border-[#1A1A2A] pb-8 sm:pb-10 space-y-4">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                TECHNICAL ARTICLES & INSIGHTS
              </p>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
                <div className="space-y-2 max-w-xl">
                  <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                    Knowledge Hub
                  </h1>
                  <p className="text-neutral-400 text-sm leading-relaxed font-sans">
                    In-depth engineering benchmarks, architectural guides, and strategic digital advice
                    written by our senior solution architects.
                  </p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72 flex-shrink-0">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-[#0A0A12] border border-[#1A1A2A] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]/60 transition-all"
                  />
                  <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Category Filter: padded ── */}
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#D4AF37] text-black'
                      : 'bg-[#0A0A12] border border-[#1A1A2A] text-neutral-400 hover:text-white hover:border-[#D4AF37]/40 active:border-[#D4AF37]/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Horizontal ScrollX Carousel
               The track itself is NOT wrapped in max-w / px — cards fill edge-to-edge
               We use px-4 as scroll-padding so first card aligns with content ── */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-3">
              {/* Count + drag hint */}
              <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-500">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
                </span>
                <span className="text-[11px] font-mono text-neutral-600 flex items-center gap-1.5">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  Swipe to explore
                </span>
              </div>

              {/* Carousel — full-width, padded internally via px-4 on track */}
              <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <HorizontalScrollX>
                  {filteredPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      onClick={() => setActivePost(post)}
                    />
                  ))}

                  {/* End-of-track spacer */}
                  <div className="flex-shrink-0 w-40 sm:w-48 flex flex-col items-center justify-center gap-3 border border-dashed border-[#1A1A2A] rounded-2xl px-4 text-center opacity-50">
                    <span className="text-[11px] font-mono text-neutral-500 leading-relaxed">
                      More articles<br />coming soon
                    </span>
                  </div>
                </HorizontalScrollX>
              </div>
            </div>
          ) : (
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24 text-center space-y-3">
              <p className="text-neutral-500 text-sm font-mono">No articles match your search.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="text-xs text-[#D4AF37] font-mono hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* ── Editorial category stats ── */}
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="border-t border-[#1A1A2A] pt-8 sm:pt-10">
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                {[
                  { label: 'Web Dev',  full: 'Web Development', count: BLOG_POSTS.filter(p => p.category === 'Web Development').length },
                  { label: 'AR / VR',  full: 'AR/VR',           count: BLOG_POSTS.filter(p => p.category === 'AR/VR').length },
                  { label: 'Strategy', full: 'Business Strategy', count: BLOG_POSTS.filter(p => p.category === 'Business Strategy').length },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setSelectedCategory(item.full)}
                    className="text-left p-4 sm:p-5 border border-[#1A1A2A] rounded-xl hover:border-[#D4AF37]/40 active:border-[#D4AF37]/60 group transition-all cursor-pointer"
                  >
                    <div className="text-xl sm:text-2xl font-display font-black text-white group-hover:text-[#D4AF37] transition-colors">
                      {item.count}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono text-neutral-500 mt-1">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
