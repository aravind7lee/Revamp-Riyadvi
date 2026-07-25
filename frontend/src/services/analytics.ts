/**
 * Analytics Service
 * Dynamically initializes and wraps Google Analytics 4 (gtag) and Meta Pixel (fbq).
 */

declare global {
  interface Window {
    gtag?: any;
    fbq?: any;
    _fbq?: any;
    dataLayer?: any[];
  }
}

export const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || 'XXXXXXXXXXXXXXXXXX';

/**
 * Auto-initialize GA4 and Meta Pixel scripts if not already present
 */
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  // 1. Initialize GA4
  if (GA_ID && GA_ID !== 'G-XXXXXXXXXX' && !window.gtag) {
    console.log(`[Analytics]: Dynamic GA4 Init (${GA_ID})`);
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { page_path: window.location.pathname });
  }

  // 2. Initialize Meta Pixel
  if (META_PIXEL_ID && META_PIXEL_ID !== 'XXXXXXXXXXXXXXXXXX' && !window.fbq) {
    console.log(`[Analytics]: Dynamic Meta Pixel Init (${META_PIXEL_ID})`);
    (function (f: Window, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = function (...args: unknown[]) {
        n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
      };
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s?.parentNode?.insertBefore(t, s);
      f.fbq = n;
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    if (window.fbq) {
      window.fbq('init', META_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  }
};

// Execute auto-init on module load
initAnalytics();

/** Track a page view — call on route changes */
export const trackPageView = (path: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_ID, { page_path: path });
  }
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
};

/** Track a custom GA4 event */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};

/** Track a Meta Pixel standard event */
export const trackMetaEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
};

/** Convenience wrappers for common Riyadvi conversion events */
export const Analytics = {
  /** User opened the Calendly booking modal */
  consultationOpened: () => {
    trackEvent('Lead', 'consultation_modal_open', 'Calendly CTA');
    trackMetaEvent('InitiateCheckout', { content_name: 'Free Consultation' });
  },

  /** User submitted the lead magnet form */
  leadMagnetDownload: (email: string) => {
    trackEvent('Lead', 'lead_magnet_download', email);
    trackMetaEvent('Lead', { content_name: 'Software Planning Guide' });
  },

  /** User submitted the contact form */
  contactFormSubmit: (service: string) => {
    trackEvent('Lead', 'contact_form_submit', service);
    trackMetaEvent('Contact', { service });
  },

  /** User submitted a quote request */
  quoteRequested: (service: string) => {
    trackEvent('Lead', 'quote_requested', service);
    trackMetaEvent('Lead', { content_name: `Quote - ${service}` });
  },

  /** User submitted a job application */
  jobApplicationSubmit: (jobTitle: string) => {
    trackEvent('Career', 'job_application_submit', jobTitle);
    trackMetaEvent('CompleteRegistration', { content_name: jobTitle });
  },

  /** User clicked WhatsApp CTA */
  whatsappClick: () => {
    trackEvent('Lead', 'whatsapp_click', 'WhatsApp Widget');
    trackMetaEvent('Contact', { method: 'WhatsApp' });
  },

  /** Newsletter subscription */
  newsletterSubscribe: (email: string) => {
    trackEvent('Engagement', 'newsletter_subscribe', email);
    trackMetaEvent('Subscribe', { email });
  },
};
