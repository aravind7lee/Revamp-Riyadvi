import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface AboutPageProps {
  onOpenCalendly: () => void;
  onOpenQuote?: () => void;
}

const timelineEvents = [
  {
    year: '2021',
    title: 'Company Founded',
    description: 'Incorporated in India with a focused mandate on custom web engineering, mobile applications, and enterprise software delivery.',
  },
  {
    year: '2022',
    title: 'International Expansion',
    description: 'Scaled client base across North America, Europe, Australia, and the broader APAC region.',
  },
  {
    year: '2023',
    title: 'AR/VR & 3D Studio Launch',
    description: 'Opened a dedicated spatial computing division — WebAR experiences, 3D product configurators, and CGI asset production.',
  },
  {
    year: '2024',
    title: 'Star of Excellence Award',
    description: 'Recognized for outstanding client satisfaction, on-time delivery, and technical quality across 700+ enterprise deliverables.',
  },
];

const stats = [
  { value: '700+', label: 'Projects Delivered' },
  { value: '4+',   label: 'Years in Operation' },
  { value: '40+',  label: 'Global Clients' },
  { value: '99%',  label: 'Client Satisfaction' },
];

const values = [
  {
    index: '01',
    title: 'Client-First Delivery',
    description: 'Every engineering decision is measured against one question: does it move the client\'s outcome forward? We solve business problems, not just technical ones.',
  },
  {
    index: '02',
    title: 'Technical Transparency',
    description: 'No black boxes. Every architecture decision, timeline risk, and trade-off is communicated clearly before a single line of code is written.',
  },
  {
    index: '03',
    title: 'Execution Accountability',
    description: 'Milestones are commitments, not estimates. We maintain on-time delivery rates that consistently exceed industry benchmarks.',
  },
  {
    index: '04',
    title: 'Continuous Improvement',
    description: 'Post-launch is not the end. Our teams monitor, optimize, and iterate products long after initial deployment.',
  },
];

const teamMembers = [
  {
    name: 'Engineering Lead',
    role: 'Chief Solution Architect',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: '10+ years architecting distributed systems, React micro-frontends, and Node.js microservices at scale.',
    expertise: ['React / Next.js', 'Node.js', 'System Architecture'],
  },
  {
    name: 'Mobile & XR Lead',
    role: 'Head of Mobile & AR/VR',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Expert in React Native, Flutter, and WebXR spatial computing for enterprise retail and logistics.',
    expertise: ['React Native', 'WebXR', 'Flutter'],
  },
  {
    name: 'Design Director',
    role: 'Lead Product Designer',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Human-centered design systems, Figma token libraries, and high-converting interface design.',
    expertise: ['Figma Systems', 'UX Research', 'Motion Design'],
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenCalendly, onOpenQuote }) => {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-28 bg-[#050508] min-h-screen font-sans overflow-x-hidden">
      <SEOHead
        title="About Us — Riyadvi Software Technologies"
        description="Learn about Riyadvi Software Technologies — our story since 2021, our award-winning team, and how we deliver enterprise software engineering with transparency."
        canonical="https://riyadvisoftwaretechnologies.com/about"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ─────────────────────────────────────── */}
        <div className="border-b border-[#1F1F2C] pb-10 sm:pb-14 mb-10 sm:mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-end">

            {/* Left: eyebrow + title + body */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                ABOUT RIYADVI
              </p>
              {/* Responsive display title: tighter on mobile */}
              <h1 className="font-display font-extrabold text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.0] sm:leading-[0.95]">
                Software built<br />to last.
              </h1>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
                Founded in 2021, Riyadvi Software Technologies is an engineering-first product studio delivering web platforms, mobile applications, spatial computing, and digital growth systems for global businesses.
              </p>
            </div>

            {/* Right: Award — moves below on mobile with a top separator */}
            <div className="lg:col-span-4 space-y-2 border-t border-[#1F1F2C] pt-6 lg:border-t-0 lg:pt-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                RECOGNITION
              </p>
              <p className="text-white font-display font-black text-lg sm:text-xl leading-tight">
                "Star of Excellence" Award
              </p>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Awarded for outstanding client satisfaction, delivery accuracy, and engineering quality across 700+ enterprise projects.
              </p>
            </div>

          </div>
        </div>

        {/* ── Stats Grid ───────────────────────────────── */}
        <div className="border-b border-[#1F1F2C] pb-10 sm:pb-14 mb-10 sm:mb-14">
          {/* 2-col on mobile, 4-col on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="space-y-1.5">
                {/* Stat value — smaller on mobile so it doesn't overflow */}
                <p className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#D4AF37] leading-none">
                  {s.value}
                </p>
                {/* Label — force wrap on mobile */}
                <p className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Our Story ────────────────────────────────── */}
        <div className="border-b border-[#1F1F2C] pb-10 sm:pb-14 mb-10 sm:mb-14">
          {/* Stacked on mobile, 12-col grid on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 space-y-2 pt-1">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                OUR STORY
              </p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                Built to solve real problems.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-4 sm:space-y-5 text-sm text-neutral-300 leading-relaxed">
              <p>
                Riyadvi Software Technologies was incorporated in 2021 with a focused goal — build software products that consistently exceed what clients expect, not just what they ask for.
              </p>
              <p>
                We work directly with founders, CTOs, and product leaders across North America, Europe, Australia, and APAC. Every project is scoped with business outcomes as the primary driver, not just a feature list.
              </p>
              <p>
                From high-throughput React web platforms to native mobile apps, WebAR spatial experiences, and performance marketing engines, our team collaborates tightly across every discipline — design, engineering, and strategy — under one roof.
              </p>
            </div>
          </div>
        </div>

        {/* ── Company Timeline ─────────────────────────── */}
        <div className="border-b border-[#1F1F2C] pb-10 sm:pb-14 mb-10 sm:mb-14">
          <div className="mb-6 sm:mb-8 space-y-1">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              COMPANY TIMELINE
            </p>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Growth milestones.
            </h2>
          </div>
          <div className="border-t border-[#1F1F2C]">
            {timelineEvents.map((evt, idx) => (
              <div
                key={idx}
                className="border-b border-[#1A1A26] py-5 sm:py-6 flex items-start gap-5 sm:gap-0 sm:grid sm:grid-cols-12"
              >
                {/* Year — bold gold, fixed width on mobile */}
                <span className="font-display font-black text-xl sm:text-2xl text-[#D4AF37] flex-shrink-0 sm:col-span-2">
                  {evt.year}
                </span>
                {/* Content */}
                <div className="sm:col-span-10 space-y-1">
                  <p className="text-sm font-bold text-white">{evt.title}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed">{evt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Values / Operating Principles ────────────── */}
        <div className="border-b border-[#1F1F2C] pb-10 sm:pb-14 mb-10 sm:mb-14">
          <div className="mb-6 sm:mb-8 space-y-1">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              HOW WE WORK
            </p>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Our operating principles.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 sm:gap-x-12 gap-y-6 sm:gap-y-8">
            {values.map((v) => (
              <div key={v.index} className="space-y-2 border-t border-[#1F1F2C] pt-5">
                <span className="text-[10px] font-mono text-neutral-600">{v.index}</span>
                <p className="text-sm sm:text-base font-bold text-white">{v.title}</p>
                <p className="text-xs text-neutral-400 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Team ─────────────────────────────────────── */}
        <div className="border-b border-[#1F1F2C] pb-10 sm:pb-14 mb-10 sm:mb-14">
          <div className="mb-6 sm:mb-8 space-y-1">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              THE TEAM
            </p>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Meet the architects.
            </h2>
          </div>
          {/* Single column on mobile, 3-col on md+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="space-y-4">
                {/* Photo */}
                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#0E0E14]">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 to-transparent" />
                </div>
                {/* Info */}
                <div className="space-y-1.5">
                  <p className="text-sm sm:text-base font-bold text-white">{member.name}</p>
                  <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">{member.role}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed pt-1">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {member.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-[#0E0E14] border border-[#1E1E2C] rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1.5">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-white tracking-tight">
              Ready to work together?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Book a free 30-minute consultation. No commitments, just a straight conversation about your project.
            </p>
          </div>

          {/* Buttons: full-width column on mobile, inline row on sm+ */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3 sm:flex-shrink-0">
            <button
              onClick={onOpenCalendly}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs hover:bg-[#c5a02e] active:bg-[#c5a02e] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Book a Free Call</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </button>
            {onOpenQuote && (
              <button
                onClick={onOpenQuote}
                className="px-6 py-3 rounded-xl border border-[#2A2A3C] bg-[#0E0E14] text-neutral-200 text-xs font-bold hover:text-white hover:border-[#D4AF37]/40 active:border-[#D4AF37]/40 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
