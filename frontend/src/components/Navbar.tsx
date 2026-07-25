import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, ArrowRight, ChevronDown,
  Globe, Smartphone, Layout, TrendingUp, Eye, Box, Gamepad2, Code2, ChevronRight,
  Mail, MapPin, Phone
} from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';
import logoImg from '../public/Riyadvi-logo.png';

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Smartphone, Layout, TrendingUp, Eye, Box, Gamepad2,
};

interface NavbarProps {
  onOpenCalendly: () => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCalendly, onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const location = useLocation();
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mobileServicesList = [
    { name: 'Web Development', path: '/services/web-development', icon: Globe },
    { name: 'App Development', path: '/services/app-development', icon: Smartphone },
    { name: 'UI/UX Design', path: '/services/ui-ux-design', icon: Layout },
    { name: 'Digital Marketing', path: '/services/digital-marketing', icon: TrendingUp },
    { name: 'AR & VR Solutions', path: '/services/ar-vr', icon: Eye },
    { name: '3D Modelling & Rendering', path: '/services/3d-modeling', icon: Box },
    { name: 'Game Development', path: '/services/game-development', icon: Gamepad2 }
  ];

  const handleMouseEnterMega = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeaveMega = () => {
    megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 250);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home',       path: '/',         num: '01' },
    { name: 'What We Do', path: '/services',  num: '02', isMega: true },
    { name: 'Portfolio',  path: '/portfolio', num: '03' },
    { name: 'About Us',   path: '/about',     num: '04' },
    { name: 'Blog',       path: '/blog',      num: '05' },
    { name: 'Careers',    path: '/careers',   num: '06' },
    { name: 'Contact',    path: '/contact',   num: '07' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        mobileMenuOpen
          ? 'h-screen bg-[#050508] flex flex-col overflow-hidden'
          : isScrolled
          ? 'bg-[#000000]/98 border-b border-[#1A1A1A] backdrop-blur-md'
          : 'bg-[#000000]/90 border-b border-[#111] backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full flex-shrink-0">
        <div className="flex items-center justify-between h-[68px]">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group focus:outline-none">
            <img
              src={logoImg}
              alt="Riyadvi Software Technologies"
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <span className="font-display font-black text-[17px] tracking-tight text-white group-hover:text-[#D4AF37] transition-colors duration-200 leading-none">
              RIYADVI
            </span>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              if (link.isMega) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={handleMouseEnterMega}
                    onMouseLeave={handleMouseLeaveMega}
                  >
                    <Link
                      to={link.path}
                      className={`group flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-150 relative ${
                        isActive(link.path) || megaMenuOpen
                          ? 'text-white'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${
                          megaMenuOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                      {/* Active underline */}
                      {(isActive(link.path) || megaMenuOpen) && (
                        <span className="absolute bottom-0 left-4 right-4 h-px bg-[#D4AF37]" />
                      )}
                    </Link>

                    {/* Mega Menu */}
                    {megaMenuOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
                        onMouseEnter={handleMouseEnterMega}
                        onMouseLeave={handleMouseLeaveMega}
                      >
                        <div className="w-[860px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl overflow-hidden">
                          <div className="grid grid-cols-3 gap-px bg-[#141414] p-5 gap-4">
                            {SERVICES_DATA.slice(0, 6).map((service) => {
                              const IconComp = ICON_MAP[service.iconName] || Globe;
                              return (
                                <div key={service.id} className="space-y-2 p-3 rounded-xl hover:bg-[#111] transition-colors">
                                  <Link
                                    to={`/services/${service.id}`}
                                    className="flex items-center gap-2.5 group/item"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#242424] flex items-center justify-center flex-shrink-0 group-hover/item:border-[#D4AF37]/40 transition-colors">
                                      <IconComp className="w-4 h-4 text-[#D4AF37]" />
                                    </div>
                                    <span className="text-sm font-semibold text-white group-hover/item:text-[#D4AF37] transition-colors">
                                      {service.title}
                                    </span>
                                  </Link>
                                  <div className="pl-11 space-y-1">
                                    {service.subServices.map((sub) => (
                                      <Link
                                        key={sub.name}
                                        to={`/services/${service.id}`}
                                        className="block text-[12px] text-neutral-500 hover:text-neutral-200 transition-colors py-0.5"
                                      >
                                        {sub.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {/* Footer row */}
                          <div className="px-5 py-3.5 border-t border-[#1A1A1A] flex items-center justify-between bg-[#070707]">
                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                              <Code2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Game Dev · AR/VR · 3D Modelling and more</span>
                            </div>
                            <Link
                              to="/services"
                              className="flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:text-white transition-colors"
                            >
                              View all services
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-[#D4AF37]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── DESKTOP CTAs ── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onOpenCalendly}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-3 py-2 cursor-pointer"
            >
              Book a Call
            </button>
            <button
              onClick={onOpenQuote}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D4AF37] text-black font-bold text-sm hover:bg-[#c5a02e] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Get a Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ── MOBILE TOGGLE BUTTON ── */}
          <div className="lg:hidden flex items-center gap-3">
            {!mobileMenuOpen && (
              <button
                onClick={onOpenQuote}
                className="px-3.5 py-1.5 text-xs font-extrabold text-black bg-[#D4AF37] rounded-lg hover:bg-[#c5a02e] transition-colors cursor-pointer"
              >
                Get Quote
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl bg-[#12121A] border border-[#222232] flex items-center justify-center text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── MOBILE FULLSCREEN NAVIGATION OVERLAY ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden flex-1 overflow-y-auto bg-[#07070A] px-5 py-4 flex flex-col justify-between border-t border-[#1F1F2C]">
          
          {/* Compact Navigation Links List */}
          <div className="space-y-1 py-1">
            {navLinks.map((link) => {
              if (link.isMega) {
                return (
                  <div key={link.name} className="space-y-1">
                    <div
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                        isActive(link.path) || mobileServicesOpen
                          ? 'text-[#D4AF37] bg-white/5'
                          : 'text-neutral-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileServicesOpen ? 'rotate-180 text-[#D4AF37]' : 'text-neutral-500'
                        }`}
                      />
                    </div>

                    {/* Sub-Services Accordion */}
                    {mobileServicesOpen && (
                      <div className="pl-3 pr-2 py-2 space-y-0.5 bg-[#0C0C12] rounded-xl border border-[#1F1F2C] my-1">
                        {mobileServicesList.map((svc) => {
                          const IconComp = svc.icon;
                          return (
                            <Link
                              key={svc.name}
                              to={svc.path}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileServicesOpen(false);
                              }}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              <IconComp className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>{svc.name}</span>
                            </Link>
                          );
                        })}

                        <Link
                          to="/services"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileServicesOpen(false);
                          }}
                          className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#D4AF37] hover:underline pt-2 border-t border-[#1F1F2C]"
                        >
                          <span>View All Services</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'text-[#D4AF37] bg-white/5'
                      : 'text-neutral-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Footer Action Buttons & Contact Info */}
          <div className="pt-4 space-y-3 border-t border-[#1F1F2C] mt-4 pb-12">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 hover:bg-[#c5a02e] transition-all cursor-pointer shadow-md"
              >
                <span>Get Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenCalendly(); }}
                className="w-full py-2.5 px-3 rounded-xl border border-[#2A2A3C] bg-[#12121C] text-neutral-200 font-bold text-xs hover:text-white hover:border-[#D4AF37]/50 transition-all text-center cursor-pointer"
              >
                Book Call
              </button>
            </div>

            {/* Location & Contact Info */}
            <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                <span>Chennai, India</span>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#D4AF37]" />
                <span>info@riyadvi.com</span>
              </span>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
