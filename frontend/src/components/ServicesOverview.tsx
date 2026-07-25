import React from 'react';
import { ThreeDServiceCarousel } from './ThreeDServiceCarousel';

export const ServicesOverview: React.FC = () => {
  return (
    <section id="what-we-do" className="py-14 sm:py-24 bg-[#000000] border-t border-[#1F1F1F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-10 space-y-2">
          <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            OUR SERVICES
          </p>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Web, App &amp; Digital Engineering Services
          </h2>
          <p className="text-neutral-400 text-xs sm:text-base leading-relaxed font-sans max-w-2xl">
            Custom web development, mobile applications, UI/UX design, AR/VR solutions, 3D modeling, and digital marketing tailored to your business goals.
          </p>
        </div>

        {/* 3D SERVICE CAROUSEL */}
        <div>
          <ThreeDServiceCarousel />
        </div>
      </div>
    </section>
  );
};
