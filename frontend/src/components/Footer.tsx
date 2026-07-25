import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Award, CheckCircle2, Send } from 'lucide-react';
import { api } from '../services/api';
import { Analytics } from '../services/analytics';
import logoImg from '../public/Riyadvi-logo.png';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try {
      await api.subscribeNewsletter({ email, name: 'Newsletter Subscriber' });
      Analytics.newsletterSubscribe(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-[#050508] border-t border-[#1F1F2C] pt-12 sm:pt-20 pb-8 sm:pb-12 font-sans relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[200px] sm:h-[300px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Brand + Contact (full width on mobile) ──────────── */}
        <div className="pb-8 sm:pb-12 border-b border-[#1F1F2C] space-y-5 sm:space-y-6">
          
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 group focus:outline-none">
            <img
              src={logoImg}
              alt="Riyadvi Software Technologies Logo"
              className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105 flex-shrink-0"
            />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-[#D4AF37] transition-colors leading-none">
                  RIYADVI
                </span>
                <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 uppercase tracking-wider">
                  ENTERPRISE
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-neutral-400 font-mono font-medium uppercase mt-1 leading-none">
                Software Technologies
              </span>
            </div>
          </Link>

          {/* Description */}
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-md font-sans">
            Riyadvi Software Technologies is an enterprise solution partner architecting high-performance Web Platforms, Mobile Applications, UI/UX Design Systems, AR/VR Spatial Computing, and 3D Modeling since 2021.
          </p>

          {/* Award Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#0E0E14] border border-[#1E1E2C] text-xs text-neutral-300">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] flex-shrink-0" />
            <span className="text-xs">
              Winner: <strong className="text-white font-semibold">Star of Excellence Award</strong>
            </span>
          </div>

          {/* Contact details — compact on mobile */}
          <div className="space-y-2 text-xs text-neutral-400 font-sans">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed text-neutral-300">
                17, Aarti Arcade, Dr Radha Krishnan Salai, opp. AVM Rajeswari Kalyana Mandapam, Mylapore, Chennai, Tamil Nadu 600004
              </span>
            </div>
            <a
              href="mailto:info@riyadvisoftwaretechnologies.com"
              className="flex items-center gap-2 text-neutral-300 hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
              <span className="truncate">info@riyadvisoftwaretechnologies.com</span>
            </a>
            <a
              href="tel:+918072487427"
              className="flex items-center gap-2 text-neutral-300 hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
              <span>+91 8072487427</span>
            </a>
          </div>
        </div>

        {/* ── Navigation + Capabilities side by side on mobile ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-10 border-b border-[#1F1F2C]">

          {/* Navigation */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
              Navigation
            </p>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'About Us', path: '/about' },
                { name: 'Blog Insights', path: '/blog' },
                { name: 'Careers', path: '/careers' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-white active:text-white transition-colors block py-0.5">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
              Capabilities
            </p>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium">
              {[
                { name: 'Web Development', id: 'web-development' },
                { name: 'App Development', id: 'app-development' },
                { name: 'UI/UX Design', id: 'ui-ux-design' },
                { name: 'Digital Marketing', id: 'digital-marketing' },
                { name: 'AR/VR Solutions', id: 'ar-vr' },
                { name: '3D Modeling', id: '3d-modeling' },
              ].map((srv) => (
                <li key={srv.id}>
                  <Link to={`/services/${srv.id}`} className="hover:text-white active:text-white transition-colors block py-0.5">
                    {srv.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter — full width across both cols on mobile, 2 cols on lg */}
          <div className="col-span-2 lg:col-span-2 space-y-3 sm:space-y-4 pt-4 sm:pt-0 border-t border-[#1F1F2C] sm:border-t-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
              Tech Insights
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans max-w-xs">
              Subscribe for enterprise architecture blueprints & monthly tech trend audits.
            </p>

            {status === 'success' ? (
              <div className="p-3.5 rounded-xl bg-[#12121A] border border-[#D4AF37]/40 text-[#D4AF37] text-xs flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Subscribed! Welcome to Riyadvi Insights.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 font-sans">
                <div className="relative max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-[#0E0E14] border border-[#1E1E2C] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]/60 transition-colors disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-[#D4AF37] text-black rounded-lg font-extrabold text-xs hover:bg-[#c5a02e] transition-all flex items-center justify-center disabled:opacity-50 cursor-pointer shadow-sm"
                    aria-label="Subscribe to newsletter"
                  >
                    {status === 'loading' ? '...' : <Send className="w-3.5 h-3.5 text-black" />}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="text-rose-400 text-[11px]">Something went wrong. Please try again.</p>
                )}

                <p className="text-[10px] text-neutral-500 font-mono">
                  Verified Mailchimp · No spam · Unsubscribe anytime
                </p>
              </form>
            )}
          </div>

        </div>

        {/* ── Bottom Copyright Bar ─────────────────────────────── */}
        <div className="pt-6 sm:pt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-400 font-medium font-sans">
          <div className="flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0 mt-1" />
            <p className="leading-snug">© {new Date().getFullYear()} Riyadvi Software Technologies Pvt. Ltd. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-neutral-400 flex-wrap">
            <span className="hover:text-white active:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white active:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white active:text-white cursor-pointer transition-colors">Security Standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
