import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SERVICES_DATA } from '../data/mockData';
import {
  ArrowLeft,
  Globe,
  Smartphone,
  Layout,
  TrendingUp,
  Eye,
  Box,
  Gamepad2,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface ServiceDetailPageProps {
  onOpenQuote: (serviceName?: string) => void;
  onOpenCalendly: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Smartphone, Layout, TrendingUp, Eye, Box, Gamepad2
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenQuote, onOpenCalendly }) => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const service = SERVICES_DATA.find((s) => s.id === serviceId);
  const serviceIndex = SERVICES_DATA.findIndex((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center text-white space-y-4">
        <h2 className="text-2xl font-bold">Service Not Found</h2>
        <Link to="/services" className="text-[#D4AF37] underline">Return to Services</Link>
      </div>
    );
  }

  const IconComp = ICON_MAP[service.iconName] || Globe;

  return (
    <div className="pt-28 sm:pt-32 pb-24 sm:pb-28 bg-[#050508] min-h-screen font-sans overflow-x-hidden">
      <SEOHead
        title={`${service.title} — Riyadvi Software Technologies`}
        description={`${service.shortDesc} Sub-services include ${service.subServices.map((s) => s.name).join(', ')}.`}
        canonical={`https://riyadvisoftwaretechnologies.com/services/${service.id}`}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors cursor-pointer mb-10 sm:mb-14"
        >
          <ArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
          <span>All Services</span>
        </button>

        {/* Page Header */}
        <div className="border-b border-[#1F1F2C] pb-8 sm:pb-10 mb-8 sm:mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-end">

            {/* Title block */}
            <div className="lg:col-span-8 space-y-4">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                {String(serviceIndex + 1).padStart(2, '0')} — OUR CAPABILITIES
              </p>

              {/* Icon + Title: stacked on mobile, inline on sm+ */}
              <div className="flex items-start gap-3">
                <IconComp className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] flex-shrink-0 mt-1 sm:mt-2" />
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight break-words min-w-0">
                  {service.title}
                </h1>
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed">
                {service.fullDesc}
              </p>
            </div>

            {/* Impact Metric */}
            <div className="lg:col-span-4 space-y-2 border-t border-[#1F1F2C] pt-5 lg:border-t-0 lg:pt-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                PERFORMANCE BENCHMARK
              </p>
              <p className="text-[#D4AF37] font-mono font-bold text-sm sm:text-base leading-snug break-words">
                {service.impactMetric}
              </p>
            </div>

          </div>
        </div>

        {/* Sub-Services */}
        <div className="mb-8 sm:mb-10 border-b border-[#1F1F2C] pb-8 sm:pb-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-5">
            INCLUDED SUB-SERVICES
          </p>
          <div className="border-t border-[#1F1F2C]">
            {service.subServices.map((sub, idx) => (
              <div
                key={sub.name}
                className="border-b border-[#1F1F2C] py-4 space-y-1.5 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-3 sm:items-start"
              >
                {/* Number */}
                <span className="text-xs font-mono text-neutral-600 sm:col-span-1 block">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {/* Name */}
                <span className="text-sm font-bold text-white sm:col-span-4 block">
                  {sub.name}
                </span>
                {/* Desc */}
                <span className="text-xs text-neutral-400 sm:col-span-7 leading-relaxed block">
                  {sub.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* The Challenge + Our Approach */}
        <div className="mb-8 sm:mb-10 border-b border-[#1F1F2C] pb-8 sm:pb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              THE CHALLENGE
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              {service.problem}
            </p>
          </div>
          <div className="space-y-3 border-t border-[#1F1F2C] pt-6 lg:border-t-0 lg:pt-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
              OUR APPROACH
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              {service.solution}
            </p>
          </div>
        </div>

        {/* Key Deliverables */}
        <div className="mb-8 sm:mb-10 border-b border-[#1F1F2C] pb-8 sm:pb-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-5">
            KEY DELIVERABLES & CAPABILITIES
          </p>
          <div className="border-t border-[#1F1F2C]">
            {service.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="border-b border-[#1F1F2C] py-3.5 flex items-start gap-3 sm:gap-4"
              >
                <span className="text-xs font-mono text-neutral-600 flex-shrink-0 w-5 pt-0.5">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-neutral-200 leading-relaxed break-words min-w-0">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-10 sm:mb-14 border-b border-[#1F1F2C] pb-8 sm:pb-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-5">
            INDUSTRY USE CASES
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {service.useCases.map((uc, i) => (
              <div key={i} className="space-y-1.5 border-l border-[#1F1F2C] pl-4">
                <p className="text-xs font-bold text-white uppercase tracking-wide">{uc.industry}</p>
                <p className="text-xs text-neutral-400 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <p className="text-white font-display font-bold text-base sm:text-lg">
              Ready to start with {service.title}?
            </p>
            <p className="text-neutral-400 text-sm">
              Get a custom quote or book a 30-minute consultation call.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3">
            <button
              onClick={() => onOpenQuote(service.title)}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs hover:bg-[#c5a02e] active:bg-[#c5a02e] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </button>
            <button
              onClick={onOpenCalendly}
              className="px-6 py-3 rounded-xl border border-[#2A2A3C] bg-[#0E0E14] text-neutral-200 text-xs font-bold hover:text-white hover:border-[#D4AF37]/40 active:border-[#D4AF37]/40 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
              <span>Book a Call</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
