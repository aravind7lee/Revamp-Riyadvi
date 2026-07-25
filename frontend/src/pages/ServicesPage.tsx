import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/mockData';
import {
  Globe, Smartphone, Layout, TrendingUp, Eye, Box, Gamepad2, ArrowRight, ArrowUpRight
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Smartphone, Layout, TrendingUp, Eye, Box, Gamepad2
};

interface ServicesPageProps {
  onOpenQuote: (serviceTitle?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="pt-28 sm:pt-32 pb-24 sm:pb-28 bg-[#050508] min-h-screen font-sans overflow-x-hidden">
      <SEOHead
        title="Services — Software & Digital Engineering"
        description="Explore our 7 core software engineering disciplines: Web, Mobile Apps, UI/UX, AR/VR, 3D Modeling & Digital Marketing."
        canonical="https://riyadvisoftwaretechnologies.com/services"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-10 sm:mb-16 space-y-3">
          <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            OUR CAPABILITIES
          </p>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            What We Build & Deliver
          </h1>
          <p className="text-neutral-400 text-sm max-w-xl leading-relaxed">
            Seven core engineering disciplines. Each one delivered with clear scope, defined technology stacks, and measurable outcomes.
          </p>
        </div>

        {/* Services Table */}
        <div className="border-t border-[#1F1F2C]">
          {SERVICES_DATA.map((service, idx) => {
            const IconComp = ICON_MAP[service.iconName] || Globe;
            return (
              <div
                key={service.id}
                className="border-b border-[#1F1F2C] py-8 sm:py-10 lg:py-12"
              >
                {/* Mobile: stacked layout, Desktop: 12-col grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">

                  {/* Left: Index + Title + Summary + Sub-services + CTAs */}
                  <div className="lg:col-span-7 space-y-4 sm:space-y-5">

                    {/* Index & Title Row */}
                    <div className="flex items-start gap-4">
                      <span className="text-xs font-mono text-neutral-500 pt-1 w-5 flex-shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                          <IconComp className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] flex-shrink-0" />
                          <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-tight">
                            {service.title}
                          </h2>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                          {service.fullDesc}
                        </p>
                      </div>
                    </div>

                    {/* Sub-services — no pl-11, use pl-9 on mobile */}
                    <div className="pl-9 sm:pl-11 flex flex-wrap gap-2">
                      {service.subServices.map((sub) => (
                        <span
                          key={sub.name}
                          className="px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs text-neutral-300 bg-[#111118] border border-[#222232] rounded-lg"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="pl-9 sm:pl-11 flex items-center gap-3 sm:gap-4 pt-1">
                      <Link
                        to={`/services/${service.id}`}
                        className="text-xs font-bold text-[#D4AF37] hover:text-white active:text-white transition-colors flex items-center gap-1.5"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
                      </Link>
                      <span className="text-neutral-600">·</span>
                      <button
                        onClick={() => onOpenQuote(service.title)}
                        className="text-xs font-bold text-neutral-400 hover:text-white active:text-white transition-colors cursor-pointer"
                      >
                        Get a Quote
                      </button>
                    </div>
                  </div>

                  {/* Right: Key Deliverables */}
                  <div className="lg:col-span-5 space-y-3 pt-0 lg:pt-1
                                  border-t border-[#1F1F2C] mt-2 pt-5
                                  lg:border-t-0 lg:mt-0 lg:pt-1">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                      KEY DELIVERABLES
                    </p>
                    <ul className="space-y-2">
                      {service.keyFeatures.slice(0, 5).map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed">
                          <span className="text-[#D4AF37] mt-1.5 text-[8px] flex-shrink-0">■</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#1F1F2C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <p className="text-white font-display font-bold text-base sm:text-lg">
              Have a project in mind?
            </p>
            <p className="text-neutral-400 text-sm">
              Let's discuss the right technology stack and timeline for your needs.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs hover:bg-[#c5a02e] active:bg-[#c5a02e] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </button>
        </div>

      </div>
    </div>
  );
};
