import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { Analytics } from '../services/analytics';

interface WhatsAppWidgetProps {
  phoneNumber?: string; // Format: country code + number without + or spaces (e.g. 919876543210)
  prefilledMessage?: string;
  buttonText?: string;
  headerTitle?: string;
  greetingText?: string;
  openHour?: number; // 24-hour format (e.g. 9)
  closeHour?: number; // 24-hour format (e.g. 21)
}

// Official WhatsApp SVG Logo Icon
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
  phoneNumber = '919876543210', // Default WhatsApp number formatted without +
  prefilledMessage = "Hello! I'm interested in Riyadvi Software Technologies services.",
  buttonText = 'Send message',
  headerTitle = 'WhatsApp',
  greetingText = 'Hello 👋, You can place your inquiry right here in the chat.',
  openHour = 9,
  closeHour = 21,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  // Check online status based on 24-hour business hours
  useEffect(() => {
    const now = new Date();
    const currentHr = now.getHours();
    const online = currentHr >= openHour && currentHr < closeHour;
    setIsOnline(online);

    // Format current time for speech bubble timestamp (e.g., 1:21 PM)
    const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCurrentTime(formatted);
  }, [openHour, closeHour]);

  const toggleWidget = () => {
    if (!isOpen) {
      setHasUnread(false);
    }
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    Analytics.whatsappClick();
    const encoded = encodeURIComponent(prefilledMessage);
    
    // Universal WhatsApp API link - directly prompts & opens WhatsApp Desktop App or Mobile App
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end select-none font-sans transition-all duration-300">
      
      {/* ── VARIANT 2: OPEN CHAT MODAL WINDOW ── */}
      {isOpen && (
        <div className="mb-4 w-[340px] xs:w-[360px] bg-[#0A0A0A] border border-[#222226] rounded-2xl shadow-2xl overflow-hidden animate-scaleIn transform origin-bottom-right">
          
          {/* HEADER BAR (WhatsApp Deep Teal Green) */}
          <div className="bg-[#008069] px-4 py-3.5 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <WhatsAppIcon className="w-6 h-6 text-white" />
              <span className="font-display font-bold text-base tracking-tight text-white">
                {headerTitle}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-black/20 text-white/90 hover:text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CHAT INTERIOR BODY */}
          <div className="p-4 bg-[#0A0A0A] space-y-5">
            
            {/* SPEECH BUBBLE */}
            <div className="bg-[#2B2D31] p-4 rounded-2xl text-white space-y-2 relative shadow-sm">
              <p className="text-sm font-medium leading-snug text-gray-100">
                {greetingText}
              </p>
              <div className="flex items-center justify-end gap-1 text-[10px] font-mono text-neutral-400">
                <span>{currentTime || 'Just now'}</span>
              </div>
            </div>

            {/* ONLINE / OFFLINE STATUS BADGE */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-neutral-400">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#25D366]' : 'bg-neutral-500'}`} />
              <span>{isOnline ? 'Available for instant reply' : 'Currently offline — Leave a message'}</span>
            </div>

            {/* ACTION BUTTON */}
            <button
              onClick={handleSendMessage}
              className={`w-full py-3.5 px-5 rounded-full font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                isOnline
                  ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white'
                  : 'bg-[#DBD5D5] hover:bg-[#c9c3c3] text-black'
              }`}
            >
              <Send className="w-4 h-4 transform rotate-45" />
              <span>{isOnline ? buttonText : 'Send Offline Message'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ── VARIANT 1: CLOSED / OPEN FLOATING TOGGLE BUTTON ── */}
      <button
        onClick={toggleWidget}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer hover:scale-105 active:scale-95 ${
          isOpen
            ? 'bg-[#25D366] text-white ring-4 ring-[#25D366]/30'
            : 'bg-[#25D366] text-white hover:bg-[#20bd5a] ring-4 ring-[#25D366]/20'
        }`}
        aria-label={isOpen ? 'Close WhatsApp Widget' : 'Open WhatsApp Widget'}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <>
            <WhatsAppIcon className="w-8 h-8 text-white" />
            {/* UNREAD NOTIFICATION BADGE (RED 1) */}
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FF3B30] text-white text-xs font-mono font-bold flex items-center justify-center border-2 border-black shadow-md animate-pulse">
                1
              </span>
            )}
          </>
        )}
      </button>

    </div>
  );
};
