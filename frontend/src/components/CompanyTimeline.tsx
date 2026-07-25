import React from 'react';
import { Rocket, TrendingUp, Globe, Award, CheckCircle2 } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  impactMetric: string;
  icon: React.ElementType;
  position: 'left' | 'right';
  tags: string[];
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2021',
    title: 'Company Foundation & R&D Lab',
    subtitle: 'Laying the technical foundation for enterprise software solutions',
    description: 'Launched with a clear engineering mandate: to replace legacy software with high-impact, security-first custom technology stacks built for fast-growing enterprises.',
    highlight: 'R&D Headquarters Established',
    impactMetric: 'Established Core R&D Hub in Chennai',
    icon: Rocket,
    position: 'left',
    tags: ['Custom SaaS', 'Cloud Native Architecture', 'React & Node Ecosystems']
  },
  {
    year: '2022',
    title: 'Multidisciplinary Scaling',
    subtitle: 'Expanding software engineering across web, mobile & AR/VR',
    description: 'Scaled core divisions to deliver full-spectrum digital services, including iOS/Android native development, AR/VR spatial computing, and enterprise UI/UX design systems.',
    highlight: 'Multidisciplinary Growth',
    impactMetric: 'Scaled to 50+ Engineers & Designers',
    icon: TrendingUp,
    position: 'right',
    tags: ['Mobile Engineering', 'Spatial Computing', 'UI/UX Design Systems']
  },
  {
    year: '2023',
    title: 'Global Market Reach',
    subtitle: 'Delivering continuous software engineering to global clients',
    description: 'Expanded client base globally, serving enterprise organizations and high-growth scale-ups across Australia, North America, UK, and the Asia-Pacific region.',
    highlight: 'Global Enterprise Expansion',
    impactMetric: 'Serving Enterprise Clients Across 4 Continents',
    icon: Globe,
    position: 'left',
    tags: ['Enterprise SLAs', 'Global Delivery Hubs', '24/7 Support']
  },
  {
    year: '2024',
    title: 'Industry Recognition & Excellence',
    subtitle: 'Awarded for software innovation and quality assurance standards',
    description: 'Received the prestigious "Star of Excellence" Award from the National Integrity Cultural Academy for outstanding software delivery, zero technical debt, and service quality.',
    highlight: 'National Excellence Award',
    impactMetric: 'Star of Excellence Award Winner',
    icon: Award,
    position: 'right',
    tags: ['Star of Excellence Award', 'ISO-Grade Delivery', 'AI & Automation']
  }
];

export const CompanyTimeline: React.FC = () => {
  return (
    <section id="timeline" className="py-10 sm:py-24 bg-[#050508] border-t border-[#16161F] relative overflow-hidden text-white">
      {/* Background ambient radial glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[200px] sm:h-[300px] bg-[#D4AF37]/5 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-16">
        
        {/* REFINED ELEGANT SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
          <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            OUR JOURNEY
          </p>
          
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Company Timeline &amp; Growth Milestones
          </h2>
          
          <p className="text-neutral-400 text-xs sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Key milestones and achievements from our founding in 2021 to building digital solutions for clients worldwide.
          </p>
        </div>

        {/* TIMELINE TRACK & CARDS CONTAINER */}
        <div className="relative">
          
          {/* VERTICAL TIMELINE TRACK LINE */}
          {/* Mobile Left Track (left-3.5), Desktop Center Track (left-1/2) */}
          <div className="absolute left-3.5 sm:left-5 lg:left-1/2 top-4 bottom-4 w-0.5 lg:-translate-x-1/2 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/50 to-[#D4AF37]/10" />

          {/* EVENTS LIST */}
          <div className="space-y-6 sm:space-y-12 lg:space-y-16">
            {TIMELINE_EVENTS.map((event) => {
              const IconComp = event.icon;
              const isLeft = event.position === 'left';

              return (
                <div
                  key={event.year}
                  className="relative flex flex-col lg:flex-row items-center justify-between group"
                >
                  {/* NODE ICON MARKER */}
                  {/* Mobile Left Marker (left-3.5), Desktop Center Marker (left-1/2) */}
                  <div className="absolute left-3.5 sm:left-5 lg:left-1/2 -translate-x-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#09090E] border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.35)] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                    <IconComp className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  </div>

                  {/* CONTENT SLOT (Full-width on Mobile with left padding pl-9, 46% Alternating on Desktop) */}
                  <div className={`w-full lg:w-[46%] pl-9 sm:pl-12 lg:pl-0 ${isLeft ? 'lg:text-right lg:mr-auto' : 'lg:order-2 lg:ml-auto'}`}>
                    <div
                      className={`bg-[#0A0A10] p-3.5 sm:p-8 rounded-xl sm:rounded-2xl border border-[#1C1C28] group-hover:border-[#D4AF37]/50 transition-all duration-300 shadow-2xl space-y-2 sm:space-y-4 relative ${
                        isLeft ? 'lg:text-right' : 'text-left'
                      }`}
                    >
                      {/* Subtle hover background radial lighting */}
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Year Header & Badge */}
                      <div className={`flex flex-wrap items-center gap-2 sm:gap-3 relative z-10 ${isLeft ? 'lg:justify-end' : 'justify-start'}`}>
                        <span className="font-mono font-extrabold text-2xl sm:text-4xl text-[#D4AF37] tracking-tight">
                          {event.year}
                        </span>
                        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-mono font-semibold bg-[#141420] text-neutral-300 border border-[#28283A] uppercase tracking-wider">
                          {event.highlight}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="space-y-0.5 sm:space-y-1 relative z-10">
                        <h3 className="font-display font-bold text-sm sm:text-2xl text-white tracking-tight group-hover:text-[#D4AF37] transition-colors leading-snug">
                          {event.title}
                        </h3>
                        <p className="text-[11px] sm:text-sm font-medium text-neutral-400 leading-snug">
                          {event.subtitle}
                        </p>
                      </div>

                      {/* Description — Desktop Only for compact mobile height */}
                      <p className="hidden sm:block text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans relative z-10">
                        {event.description}
                      </p>

                      {/* Key Impact Bar */}
                      <div className={`flex items-center pt-0.5 sm:pt-2 relative z-10 ${isLeft ? 'lg:justify-end' : 'justify-start'}`}>
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#0F0F1A] border border-[#222234] text-[10px] sm:text-xs font-mono text-neutral-300 max-w-full">
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] flex-shrink-0" />
                          <span className="leading-tight break-words">{event.impactMetric}</span>
                        </div>
                      </div>

                      {/* Tech Tags */}
                      <div className={`flex flex-wrap gap-1.5 sm:gap-2 pt-0.5 sm:pt-1 relative z-10 ${isLeft ? 'lg:justify-end' : 'justify-start'}`}>
                        {event.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[9px] sm:text-[11px] font-mono bg-[#12121C] text-neutral-400 border border-[#222230]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* EMPTY SLOT FOR BALANCING GRID ON DESKTOP */}
                  <div className={`hidden lg:block w-[46%] ${isLeft ? 'order-2' : 'order-1'}`} />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
