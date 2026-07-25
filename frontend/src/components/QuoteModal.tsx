import React, { useState } from 'react';
import { X, CheckCircle2, Send } from 'lucide-react';
import { api } from '../services/api';
import { Analytics } from '../services/analytics';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || 'Web Development',
    budget: '$5,000 - $15,000',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    try {
      await api.submitContact(formData);
      Analytics.quoteRequested(formData.service);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Outer scroll container, z-[300] ensures high stacking over all navbars & floating bars
    <div
      className="fixed inset-0 z-[300] overflow-y-auto bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Inner flex container to center modal */}
      <div className="min-h-full flex items-center justify-center px-3 sm:px-4 py-8 sm:py-16">

        {/* Modal Card */}
        <div
          className="bg-[#0D0D0D] border border-[#D4AF37]/50 rounded-2xl max-w-xl w-full relative p-4 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black/80 border border-[#333333] text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-8 sm:py-10 space-y-4 font-sans">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#141414] text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#D4AF37]" />
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white">Quote Request Received!</h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                Our lead solutions engineer is analyzing your project details for <strong>{formData.service}</strong>. A detailed proposal and cost breakdown will be delivered to <strong>{formData.email}</strong> within 2 hours.
              </p>
              <div className="pt-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#c5a02e] transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 font-sans">
              <div className="pr-8">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#141414] border border-[#262626] text-[10px] sm:text-xs font-mono font-medium mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span className="text-neutral-300">PROJECT ESTIMATION REQUEST</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-3xl text-white leading-tight">
                  Get a Custom <span className="text-[#D4AF37]">Project Quote</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-sans leading-relaxed">
                  Receive a precise cost &amp; timeline breakdown tailored to your technology requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-xl bg-[#000000] border border-[#262626] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-xl bg-[#000000] border border-[#262626] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Target Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-xl bg-[#000000] border border-[#262626] text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="AR/VR Solutions">AR/VR Solutions</option>
                    <option value="3D Modeling">3D Modeling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Estimated Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-xl bg-[#000000] border border-[#262626] text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                  >
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                    <option value="$5,000 - $30,000">$15,000 - $30,000</option>
                    <option value="$30,000+">$30,000+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Project Overview &amp; Requirements *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe features, target platform, and expected launch date..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-xl bg-[#000000] border border-[#262626] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#c5a02e] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <Send className="w-4 h-4 text-black flex-shrink-0" />
                <span>{loading ? 'Submitting Quote Request...' : 'Submit Quote Request'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
