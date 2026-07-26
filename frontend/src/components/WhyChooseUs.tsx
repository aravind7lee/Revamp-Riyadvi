import React from 'react';
import { Award, CheckCircle2, XCircle } from 'lucide-react';
import { ScrollServiceCards } from './ScrollServiceCards';
import { ScrollReveal } from './ScrollReveal';

export const WhyChooseUs: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Engineering Speed & Onboarding',
      riyadvi: 'Immediate 48-Hour Deployment',
      others: '3 to 6 Weeks Onboarding Delay'
    },
    {
      feature: 'Quality Assurance & Security',
      riyadvi: 'Automated CI/CD & Security Audits',
      others: 'Manual & Ad-Hoc Testing'
    },
    {
      feature: 'IP & Source Code Ownership',
      riyadvi: '100% Client Ownership Guarantee',
      others: 'Locked Proprietary Frameworks'
    },
    {
      feature: '24/7 SLA Support',
      riyadvi: 'Dedicated Solution Director',
      others: 'Slow Support Ticketing System'
    },
    {
      feature: 'Cost-to-Output Efficiency',
      riyadvi: 'Zero Tech Debt & Scalable Architecture',
      others: 'High Maintenance Tech Debt'
    }
  ];

  return (
    <section className="py-14 sm:py-24 bg-[#000000] border-t border-[#1F1F1F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl space-y-2">
            <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              WHY CHOOSE US
            </p>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Why Work with Riyadvi Software Technologies
            </h2>
            <p className="text-neutral-400 text-xs sm:text-base leading-relaxed font-sans">
              We combine technical expertise, transparent communication, and reliable project delivery to help your business succeed.
            </p>
          </div>
        </ScrollReveal>

        {/* FEATURE: SCROLL SERVICE CARDS (4 PILLARS SHOWCASE) */}
        <ScrollReveal direction="up" delay={100}>
          <div className="pt-1">
            <ScrollServiceCards />
          </div>
        </ScrollReveal>

        {/* EDITORIAL COMPARISON MATRIX */}
        <ScrollReveal direction="up" delay={150}>
          <div className="pt-6 sm:pt-8 border-t border-[#1A1A1E]">
            {/* Header text */}
            <div className="mb-6 sm:mb-8 space-y-1.5 sm:space-y-2">
              <h3 className="font-display font-black text-xl sm:text-3xl text-white tracking-tight leading-tight">
                Riyadvi Vetted Engineering Engine <span className="text-neutral-500">vs.</span> Standard Agencies
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans">
                See why global founders switch to Riyadvi for high-stakes enterprise software delivery.
              </p>
            </div>

            {/* Table Container */}
            <div className="w-full overflow-x-auto no-scrollbar">
              <div className="min-w-[650px]">
                
                {/* Column Headers */}
                <div className="grid grid-cols-12 gap-4 pb-3 border-b border-[#22222B] text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase">
                  <div className="col-span-4 text-neutral-400">CRITERIA &amp; STANDARDS</div>
                  <div className="col-span-4 text-[#D4AF37] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <span>RIYADVI HIGH-VELOCITY ENGINE</span>
                  </div>
                  <div className="col-span-4 text-neutral-500">TRADITIONAL AGENCIES</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-[#181820]">
                  {comparisonRows.map((row, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 gap-4 py-4 sm:py-5 items-center hover:bg-[#08080C] transition-colors px-2 rounded-lg"
                    >
                      {/* Feature Name */}
                      <div className="col-span-4 font-display font-bold text-xs sm:text-sm text-white">
                        {row.feature}
                      </div>

                      {/* Riyadvi Standard */}
                      <div className="col-span-4 flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                        <span>{row.riyadvi}</span>
                      </div>

                      {/* Traditional Agency Standard */}
                      <div className="col-span-4 flex items-center gap-2 text-[11px] sm:text-xs font-medium text-neutral-400">
                        <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500/70 flex-shrink-0" />
                        <span>{row.others}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* AWARD TRUST STRIP */}
        <ScrollReveal direction="scale" delay={200}>
          <div className="p-5 sm:p-7 rounded-2xl bg-[#09090D] border border-[#1E1E26] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 shadow-xl">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#14141C] border border-[#252532] flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-display font-black text-white text-base sm:text-lg">
                  Star of Excellence Award Winner — 2021
                </h4>
                <p className="text-neutral-400 text-xs mt-0.5 font-sans">
                  Conferred by National Integrity Cultural Academy for outstanding software innovation &amp; service quality.
                </p>
              </div>
            </div>
            <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#14141C] border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] sm:text-xs font-mono font-bold rounded-xl flex-shrink-0">
              VERIFIED EXCELLENCE STANDARD
            </span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
