import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Video, MessageCircle, ExternalLink, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { Analytics } from '../services/analytics';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    notes: ''
  });

  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !selectedDate || !selectedTime) return;

    setLoading(true);
    const generatedTicket = `AUDIT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedTicket);

    try {
      await api.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: `Consultation Booking (${formData.service}) [${generatedTicket}]`,
        message: `Booked Consultation Date: ${selectedDate} at ${selectedTime}. Ticket: ${generatedTicket}. Notes: ${formData.notes}`
      });
      Analytics.consultationOpened();
      setBooked(true);
    } catch (err) {
      console.error(err);
      setBooked(true);
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

  // Real-time Google Calendar Event Link
  const formattedDate = selectedDate.replace(/-/g, '');
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Solution Audit (${formData.service}) - Riyadvi Software`
  )}&details=${encodeURIComponent(
    `30-Min Solution Audit for ${formData.name}. Ticket: ${ticketId}. Service: ${formData.service}. Phone: ${formData.phone}`
  )}&dates=${formattedDate}T100000Z/${formattedDate}T103000Z`;

  // Real-time WhatsApp Direct Link
  const waMsg = `Hi Riyadvi Software Team! I just booked a 30-min Solution Audit for ${selectedDate} at ${selectedTime} under Ticket #${ticketId}. Name: ${formData.name}, Email: ${formData.email}.`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=919876543210&text=${encodeURIComponent(waMsg)}`;

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
          className="bg-[#0D0D0D] border border-[#D4AF37]/50 rounded-2xl max-w-2xl w-full relative p-4 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black/80 border border-[#333333] text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {booked ? (
            <div className="text-center py-6 sm:py-8 space-y-5 font-sans">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#141414] text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
              </div>

              <div className="space-y-1">
                <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-[11px] font-mono font-bold uppercase tracking-wider">
                  REAL-TIME TICKET: #{ticketId}
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">Consultation Booking Confirmed!</h3>
              </div>

              <div className="p-4 rounded-xl bg-[#000000] border border-[#262626] max-w-lg mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-neutral-400">Client Name:</span>
                  <strong className="text-white">{formData.name}</strong>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-neutral-400">Date &amp; Time:</span>
                  <strong className="text-[#D4AF37]">{selectedDate} @ {selectedTime}</strong>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-neutral-400">Target Service:</span>
                  <strong className="text-white">{formData.service}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Confirmation Email:</span>
                  <strong className="text-neutral-200">{formData.email}</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={googleCalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Add to Google Calendar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#25D366] text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Instant WhatsApp Confirmation</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setBooked(false);
                    onClose();
                  }}
                  className="text-xs text-neutral-400 hover:text-white underline font-mono cursor-pointer"
                >
                  Close &amp; Return to Homepage
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4 sm:space-y-6 font-sans">
              <div className="pr-8">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#141414] border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] sm:text-xs font-mono font-bold uppercase mb-1.5">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>INTERACTIVE SCHEDULING DESK</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-3xl text-white leading-tight">
                  Book a Free 30-Min <span className="text-[#D4AF37]">Solution Audit</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-sans leading-relaxed">
                  Discuss your project architecture, tech stack selection, and timeline estimates directly with our technical leads.
                </p>
              </div>

              {/* Date & Time Picker */}
              <div className="space-y-3 p-3 sm:p-4 rounded-xl bg-[#000000] border border-[#262626]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Select Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-xl bg-[#0D0D0D] border border-[#262626] text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Select Slot *
                    </label>
                    <select
                      required
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-xl bg-[#0D0D0D] border border-[#262626] text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                    >
                      <option value="">-- Pick a Time Slot --</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-xl bg-[#000000] border border-[#262626] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-xl bg-[#000000] border border-[#262626] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-xl bg-[#000000] border border-[#262626] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Service Interested In</label>
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Brief Description / Requirements</label>
                <textarea
                  rows={2}
                  placeholder="Tell us briefly about your business goal..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs rounded-xl bg-[#000000] border border-[#262626] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#c5a02e] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <Video className="w-4 h-4 text-black flex-shrink-0" />
                <span>{loading ? 'Confirming Booking...' : 'Confirm Consultation Booking'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
