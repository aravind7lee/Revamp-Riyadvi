import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Check, Calendar, ArrowRight, MessageCircle } from 'lucide-react';
import { api } from '../services/api';
import { Analytics } from '../services/analytics';
import { SEOHead } from '../components/SEOHead';

interface ContactPageProps {
  onOpenCalendly: () => void;
}

const SERVICES = [
  'Web Development',
  'App Development',
  'UI/UX Design',
  'Digital Marketing',
  'AR/VR Solutions',
  '3D Modeling & Rendering',
  'Game Development',
  'Other / Not Sure Yet',
];

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenCalendly }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    try {
      await api.submitContact(formData);
      Analytics.contactFormSubmit(formData.service);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-28 bg-[#050508] min-h-screen font-sans overflow-x-hidden">
      <SEOHead
        title="Contact — Get in Touch with Riyadvi Software Technologies"
        description="Request a custom quote, book a 30-minute consultation, or message our engineering team directly."
        canonical="https://riyadvisoftwaretechnologies.com/contact"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="border-b border-[#1F1F2C] pb-10 sm:pb-14 mb-10 sm:mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div className="space-y-5">
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                CONTACT US
              </p>
              <h1 className="font-display font-extrabold text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.0] sm:leading-[0.92]">
                Let's start a<br />conversation.
              </h1>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
                Whether you have a project in mind, want a custom quote, or just need to talk to someone technical — we're here.
              </p>
            </div>

            {/* Contact channels — stacked panel */}
            <div className="space-y-0 border border-[#1F1F2C] rounded-2xl overflow-hidden mt-6 lg:mt-0">
              {[
                {
                  icon: <Mail className="w-4 h-4 text-[#D4AF37]" />,
                  label: 'Email',
                  value: 'info@riyadvisoftwaretechnologies.com',
                  href: 'mailto:info@riyadvisoftwaretechnologies.com',
                },
                {
                  icon: <Phone className="w-4 h-4 text-[#D4AF37]" />,
                  label: 'Phone & WhatsApp',
                  value: '+91 8072487427',
                  href: 'https://wa.me/918072487427',
                },
                {
                  icon: <MapPin className="w-4 h-4 text-[#D4AF37]" />,
                  label: 'Headquarters',
                  value: 'Mylapore, Chennai, Tamil Nadu 600004',
                  href: null,
                },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5 bg-[#080810] ${i !== 2 ? 'border-b border-[#1F1F2C]' : ''}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#111120] border border-[#1E1E2C] flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500 mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-white truncate">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Content ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left: Contact Form (col 1–8) */}
          <div className="lg:col-span-8">
          <div className="mb-6 sm:mb-8 space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">SEND A MESSAGE</p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Tell us about your project.
              </h2>
            </div>

            {submitted ? (
              <div className="border border-[#1F1F2C] rounded-2xl p-10 space-y-4 max-w-lg">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-display font-bold text-xl text-white">Message received.</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Thanks, <strong className="text-white">{formData.name}</strong>. Our team will reply to{' '}
                  <strong className="text-white">{formData.email}</strong> within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Send another message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#0A0A12] border border-[#1E1E2C] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="yourname@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#0A0A12] border border-[#1E1E2C] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone + Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#0A0A12] border border-[#1E1E2C] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500">
                      Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#0A0A12] border border-[#1E1E2C] rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer"
                    >
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500">
                    Project Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your project — what you're building, your timeline, and any key requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-[#0A0A12] border border-[#1E1E2C] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-3 pt-2 border-t border-[#1F1F2C]">
                  <p className="text-xs text-neutral-500">We reply within 2 business hours on weekdays.</p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs hover:bg-[#c5a02e] active:bg-[#c5a02e] transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 flex-shrink-0" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Alternatives — top border on mobile, sidebar on lg */}
          <div className="lg:col-span-4 border-t border-[#1F1F2C] pt-8 lg:border-t-0 lg:pt-0">
            <div className="space-y-0 border border-[#1F1F2C] rounded-2xl overflow-hidden self-start">

            {/* Book a Call */}
            <div className="p-6 border-b border-[#1F1F2C] space-y-3 bg-[#080810]">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">Prefer a call?</p>
              <p className="text-base font-bold text-white leading-snug">Book a free 30-minute consultation</p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Skip the emails. Pick a slot on our calendar and talk directly with our engineering team.
              </p>
              <button
                onClick={onOpenCalendly}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs hover:bg-[#c5a02e] transition-all cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Free Call</span>
              </button>
            </div>

            {/* WhatsApp */}
            <div className="p-6 border-b border-[#1F1F2C] space-y-3 bg-[#080810]">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">Quick question?</p>
              <p className="text-base font-bold text-white leading-snug">Chat on WhatsApp</p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                For urgent inquiries or quick project estimates, reach us directly on WhatsApp.
              </p>
              <a
                href="https://wa.me/918072487427"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#1E1E2C] bg-[#0E0E14] text-white font-bold text-xs hover:border-emerald-500/40 hover:text-emerald-400 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Response time note */}
            <div className="p-6 bg-[#080810] space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">Response Times</p>
              {[
                { channel: 'Email / Form', time: '< 2 hours' },
                { channel: 'WhatsApp', time: '< 30 minutes' },
                { channel: 'Calendly Call', time: 'Your chosen slot' },
              ].map((r) => (
                <div key={r.channel} className="flex items-center justify-between text-xs py-1 border-b border-[#1A1A26] last:border-0">
                  <span className="text-neutral-400">{r.channel}</span>
                  <span className="font-mono font-bold text-[#D4AF37]">{r.time}</span>
                </div>
              ))}
            </div>
            </div>{/* end inner sidebar border wrapper */}
          </div>{/* end right col */}

        </div>
      </div>
    </div>
  );
};
