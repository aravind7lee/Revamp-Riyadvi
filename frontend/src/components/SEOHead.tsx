import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  canonical?: string;
  structuredData?: object;
}

const BASE_URL = 'https://riyadvisoftwaretechnologies.com';
const BRAND = 'Riyadvi Software Technologies';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = 'Riyadvi Software Technologies, Web Development, App Development, UI/UX Design, AR/VR, 3D Modeling, Digital Marketing, Custom IT Solutions',
  ogType = 'website',
  canonical = BASE_URL,
  structuredData,
}) => {
  useEffect(() => {
    // Ensure Brand Name appears FIRST in browser tab right after favicon icon
    const fullTitle = title.includes(BRAND)
      ? title
      : `${BRAND} | ${title}`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Ensure favicon is set on every page load
    setLink('icon', '/Riyadvi-logo.png');
    setLink('shortcut icon', '/Riyadvi-logo.png');
    setLink('apple-touch-icon', '/Riyadvi-logo.png');

    // Standard meta
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', 'index, follow');
    setMeta('author', BRAND);

    // Open Graph
    setMeta('og:type', ogType, true);
    setMeta('og:title', `${title} | ${BRAND}`, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonical, true);
    setMeta('og:site_name', BRAND, true);
    setMeta('og:image', `${BASE_URL}/Riyadvi-logo.png`, true);
    setMeta('twitter:image', `${BASE_URL}/Riyadvi-logo.png`);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', `${title} | ${BRAND}`);
    setMeta('twitter:description', description);
    setMeta('twitter:image', `${BASE_URL}/og-image.jpg`);

    // Canonical
    setLink('canonical', canonical);

    // Structured Data / JSON-LD
    if (structuredData) {
      const existingScript = document.querySelector('script[data-seo-schema]');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo-schema', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, ogType, canonical, structuredData]);

  return null;
};

// Preset structured data for common page types
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Riyadvi Software Technologies',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: 'Custom Software & Digital Solutions to Grow Your Business. Web & App Development, UI/UX Design, AR/VR, 3D Modeling, and Digital Marketing.',
  foundingDate: '2021',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressRegion: 'Tamil Nadu',
  },
  sameAs: [
    'https://www.linkedin.com/company/riyadvisoftwaretechnologies',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'contact@riyadvisoftwaretechnologies.com',
    availableLanguage: 'English',
  },
};
