import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, ArrowRight, Lock, ShieldCheck, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { Analytics } from '../services/analytics';

const TABLE_OF_CONTENTS = [
  {
    number: '01',
    title: 'Microservices vs. Monolith Decision Engine',
    description: 'System traffic thresholds, state management, and database decoupling strategies for growing applications.'
  },
  {
    number: '02',
    title: 'Cloud Infrastructure & Cost Benchmarks',
    description: 'Performance metrics and projected monthly AWS/GCP infrastructure costs for modern web and mobile stacks.'
  },
  {
    number: '03',
    title: 'Enterprise Security & Compliance Checklist',
    description: 'Audit requirements and security architecture for ISO 27001, HIPAA, GDPR, OAuth 2.0, and SOC 2 Type II.'
  },
  {
    number: '04',
    title: 'Vendor RFP & Evaluation Scorecard',
    description: 'A 15-point criteria matrix and scorecard template for evaluating third-party engineering agencies.'
  }
];

export const LeadMagnetSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const triggerPdfDownload = () => {
    const link = document.createElement('a');
    link.href = '/Software_Project_Planning_Guide.pdf';
    link.download = 'Riyadvi_Enterprise_Software_Architecture_Blueprint.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your name and business email address.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      await api.submitLeadMagnet(formData);
      Analytics.leadMagnetDownload(formData.email);
      setSubmitted(true);

      setTimeout(() => {
        triggerPdfDownload();
      }, 300);
    } catch (err) {
      console.error('Lead magnet error:', err);
      setSubmitted(true);
      triggerPdfDownload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead-magnet" className="py-14 sm:py-20 bg-[#070709] border-t border-[#1C1C24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Clean Professional Content & Table of Contents */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Header */}
            <div className="space-y-1.5 sm:space-y-2">
              <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                PROJECT PLANNING GUIDE
              </p>
              
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                Software Project Planning &amp; Architecture Guide
              </h2>
              
              <p className="text-neutral-400 text-xs sm:text-base leading-relaxed font-sans max-w-2xl">
                A practical 48-page guide covering technology stack choices, architecture decision matrices, cloud cost benchmarks, and project checklists.
              </p>
            </div>

            {/* Table of Contents List */}
            <div className="space-y-0 border-t border-b border-[#1C1C26]">
              {TABLE_OF_CONTENTS.map((item) => (
                <div 
                  key={item.number}
                  className="py-4 sm:py-5 border-b last:border-b-0 border-[#1C1C26] flex gap-3 sm:gap-5 items-start group"
                >
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#D4AF37] pt-0.5 flex-shrink-0">
                    {item.number}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-sans font-bold text-sm sm:text-base text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Metadata Footer bar */}
            <div className="pt-1 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-[10px] sm:text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] flex-shrink-0" />
                Format: PDF (14.2 MB)
              </span>
              <span>•</span>
              <span>Length: 48 Pages</span>
              <span>•</span>
              <span>Updated: Q3 2026</span>
            </div>

          </div>

          {/* RIGHT COLUMN: Clean Enterprise Download Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#0E0E14] border border-[#222230] rounded-2xl p-4 sm:p-8 shadow-xl space-y-4 sm:space-y-6">
              
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  Get Your Instant PDF Copy
                </h3>
                <p className="text-xs text-neutral-400 font-sans mt-0.5 sm:mt-1">
                  Complete the form below for immediate access to the PDF manual.
                </p>
              </div>

              {submitted ? (
                <div className="py-6 sm:py-8 text-center space-y-4 sm:space-y-5 font-sans">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg sm:text-xl text-white">Download Triggered!</h4>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Your PDF report is downloading to your device.
                    </p>
                  </div>

                  <div className="pt-2 space-y-2.5 sm:space-y-3">
                    <button
                      onClick={triggerPdfDownload}
                      className="w-full py-3 sm:py-3.5 px-4 bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-extrabold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Download className="w-4 h-4 text-black flex-shrink-0" />
                      <span>Download PDF Manual Again</span>
                    </button>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-neutral-400 hover:text-white font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Submit with another email</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 font-sans">
                  {errorMsg && (
                    <div className="p-2.5 sm:p-3 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Full Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-lg bg-[#14141E] border border-[#252535] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Business Email <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-lg bg-[#14141E] border border-[#252535] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Company Name <span className="text-neutral-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Enterprise Systems Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-lg bg-[#14141E] border border-[#252535] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 sm:py-3.5 px-4 bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-extrabold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1 sm:mt-2 shadow-md"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Processing Download...</span>
                      </span>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-black flex-shrink-0" />
                        <span>Download 48-Page PDF Guide</span>
                        <ArrowRight className="w-4 h-4 text-black flex-shrink-0" />
                      </>
                    )}
                  </button>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-neutral-400 font-sans border-t border-[#1C1C28]">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                      100% Free Technical Resource
                    </span>
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-neutral-500 flex-shrink-0" />
                      Strict Data Privacy
                    </span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
