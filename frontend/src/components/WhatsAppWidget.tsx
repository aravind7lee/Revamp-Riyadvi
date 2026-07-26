import React, { useState, useEffect } from 'react';
import { X, Send, CheckCheck, Smile, Paperclip, Lock } from 'lucide-react';
import { Analytics } from '../services/analytics';

// Premium filled phone handset SVG icon
const PhoneCallIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.21 2.2z" />
  </svg>
);

interface WhatsAppWidgetProps {
  phoneNumber?: string; // Format: country code + number without + or spaces (e.g. 919876543210)
  callNumber?: string;
  companyName?: string;
  defaultMessage?: string;
}

// Authentic Official WhatsApp SVG Logo Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.85 0-3.665-.497-5.257-1.442l-.377-.224-3.908 1.025 1.043-3.809-.246-.391c-1.037-1.649-1.587-3.565-1.587-5.529 0-5.741 4.67-10.411 10.413-10.411 2.78 0 5.394 1.084 7.36 3.05 1.966 1.966 3.048 4.58 3.048 7.36 0 5.742-4.67 10.412-10.413 10.412m0-22.146C5.666-.303-.303 5.666-.303 12.372c0 2.274.636 4.486 1.841 6.408l-1.956 7.143 7.31-1.917c1.848 1.008 3.937 1.54 6.061 1.54 12.675 0 12.675-12.675 12.675-12.675 0-3.308-1.288-6.417-3.626-8.755S15.358-.303 12.051-.303" />
  </svg>
);

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber = '918072487427',
  callNumber = '+918072487427',
  companyName = 'Riyadvi Software',
  defaultMessage = "Hi! I'm interested in custom software development services.",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCurrentTime(formatted);
  }, []);

  const toggleWidget = () => {
    if (!isOpen) {
      setHasUnread(false);
    }
    setIsOpen(!isOpen);
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    Analytics.whatsappClick();

    const finalMsg = messageInput.trim() || defaultMessage;
    const encoded = encodeURIComponent(finalMsg);
    
    // Official WhatsApp API redirect
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[150] flex flex-col items-end gap-2.5 select-none font-sans transition-all duration-300">
      
      {/* ── ORIGINAL WHATSAPP ICONIC LIGHT EMERALD THEME CHAT MODAL ── */}
      {isOpen && (
        <div className="mb-2 w-[calc(100vw-32px)] max-w-[365px] sm:w-[365px] bg-[#E5DDD5] border border-[#D1C7BD] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 transform origin-bottom-right font-sans">
          
          {/* ORIGINAL WHATSAPP DEEP TEAL HEADER (#075E54 / #128C7E) */}
          <div className="bg-[#075E54] px-4 py-3.5 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* Official Business Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#128C7E] border border-white/40 flex items-center justify-center text-white shadow-sm overflow-hidden">
                  <img
                    src="/Riyadvi-logo.png"
                    alt="Riyadvi Logo"
                    className="w-7 h-7 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <WhatsAppIcon className="w-6 h-6 text-white hidden fallback-icon" />
                </div>
                {/* Active Online Indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#075E54]" />
              </div>

              <div>
                <h4 className="font-bold text-sm text-white leading-tight">
                  {companyName}
                </h4>
                <p className="text-[11px] text-[#25D366] font-semibold leading-none mt-0.5">
                  online
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-black/20 text-white/90 hover:text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ORIGINAL WHATSAPP CHAT WALLPAPER (#E5DDD5 / #ECE5DD) */}
          <div
            className="p-4 space-y-4 min-h-[200px] flex flex-col justify-between relative bg-[#E5DDD5]"
            style={{
              backgroundImage: `radial-gradient(#000000 0.4px, transparent 0.4px)`,
              backgroundSize: '16px 16px',
            }}
          >
            
            {/* DATE BADGE PILL */}
            <div className="flex justify-center">
              <span className="bg-[#FFFFFF] text-[#54656F] text-[10px] font-semibold px-3 py-1 rounded-md tracking-wide uppercase shadow-sm border border-black/5">
                Today
              </span>
            </div>

            {/* INCOMING WHATSAPP MESSAGE BUBBLE (Pure White #FFFFFF with Tail) */}
            <div className="self-start max-w-[88%] bg-[#FFFFFF] p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-[#111B21] space-y-1 relative shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
              {/* Message tail triangle */}
              <div className="absolute top-0 -left-2 w-0 h-0 border-t-[8px] border-t-[#FFFFFF] border-l-[8px] border-l-transparent" />
              
              <p className="text-xs leading-relaxed text-[#111B21]">
                Hello! 👋 Welcome to <strong className="text-black">Riyadvi Software Technologies</strong>.
              </p>
              <p className="text-xs leading-relaxed text-[#111B21]">
                How can we assist you with your software project today?
              </p>
              
              <div className="flex items-center justify-end gap-1 text-[10px] text-[#667781] pt-0.5">
                <span>{currentTime || '12:00 PM'}</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
              </div>
            </div>

            {/* ENCRYPTION BADGE */}
            <div className="flex items-center justify-center gap-1.5 bg-[#FFF4C4] text-[#54656F] text-[10px] py-1.5 px-3 rounded-lg border border-[#F5E6A3] shadow-xs font-sans">
              <Lock className="w-3 h-3 text-[#54656F] flex-shrink-0" />
              <span>End-to-end encrypted. Tap below to chat live.</span>
            </div>
          </div>

          {/* ORIGINAL WHATSAPP LIGHT FOOTER INPUT BAR (#F0F2F5) */}
          <form onSubmit={handleSend} className="bg-[#F0F2F5] p-2.5 flex items-center gap-2 border-t border-[#E0E2E5]">
            <div className="flex items-center gap-1.5 text-[#54656F] px-1">
              <Smile className="w-5 h-5 hover:text-[#111B21] cursor-pointer" />
              <Paperclip className="w-5 h-5 hover:text-[#111B21] cursor-pointer hidden sm:block" />
            </div>

            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[#FFFFFF] text-[#111B21] placeholder-[#667781] text-xs px-3.5 py-2.5 rounded-full focus:outline-none border border-[#D1D5DB] focus:border-[#00A884] transition-colors shadow-inner"
            />

            {/* Iconic WhatsApp Green Send Button (#25D366 / #00A884) */}
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-[#00A884] hover:bg-[#008f70] text-white flex items-center justify-center shadow-md transition-all cursor-pointer flex-shrink-0 active:scale-95"
              aria-label="Send message to WhatsApp"
            >
              <Send className="w-4 h-4 transform rotate-45 -ml-0.5 text-white" />
            </button>
          </form>

        </div>
      )}

      {/* ── FLOATING DIRECT PHONE CALL BUTTON ── */}
      <a
        href={`tel:${callNumber}`}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0D0D0D] border-[3px] border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all duration-300 shadow-[0_8px_24px_rgba(212,175,55,0.35)] cursor-pointer hover:scale-105 active:scale-95 flex-shrink-0 group ring-4 ring-[#D4AF37]/20"
        title={`Call Us Directly (${callNumber})`}
        aria-label={`Call ${callNumber}`}
      >
        <PhoneCallIcon className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-110" />
      </a>

      {/* ── OFFICIAL VIBRANT WHATSAPP FLOATING BUTTON (#25D366) ── */}
      <button
        onClick={toggleWidget}
        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_10px_25px_rgba(37,211,102,0.4)] cursor-pointer hover:scale-105 active:scale-95 flex-shrink-0 ${
          isOpen
            ? 'bg-[#00A884] text-white ring-4 ring-[#00A884]/30'
            : 'bg-[#25D366] text-white hover:bg-[#20bd5a] ring-4 ring-[#25D366]/30'
        }`}
        aria-label={isOpen ? 'Close WhatsApp Widget' : 'Open WhatsApp Widget'}
      >
        {isOpen ? (
          <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        ) : (
          <>
            <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9 text-white flex-shrink-0" />
            {/* UNREAD NOTIFICATION BADGE (PERFECT ROUND CIRCLE RED 1) */}
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 aspect-square rounded-full bg-[#FF3B30] text-white text-xs sm:text-sm font-sans font-black flex items-center justify-center border-2 border-white shadow-lg flex-shrink-0 leading-none z-20">
                1
              </span>
            )}
          </>
        )}
      </button>

    </div>
  );
};
