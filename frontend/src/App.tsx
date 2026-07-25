import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { CareersPage } from './pages/CareersPage';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { CalendlyModal } from './components/CalendlyModal';
import { QuoteModal } from './components/QuoteModal';
import { trackPageView } from './services/analytics';

// Scroll to top + track page view on route change
const RouteObserver: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
};

export const App: React.FC = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState<string | undefined>(undefined);

  const handleOpenQuote = (serviceName?: string) => {
    setQuoteService(serviceName);
    setIsQuoteOpen(true);
  };

  return (
    <Router>
      <RouteObserver />
      <div className="min-h-screen bg-dark-bg text-gray-100 flex flex-col font-sans selection:bg-gold selection:text-black">
        {/* Sticky Header Nav */}
        <Navbar
          onOpenCalendly={() => setIsCalendlyOpen(true)}
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* Main Content Viewport */}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onOpenCalendly={() => setIsCalendlyOpen(true)}
                  onOpenQuote={() => handleOpenQuote()}
                />
              }
            />
            <Route
              path="/services"
              element={<ServicesPage onOpenQuote={(s?: string) => handleOpenQuote(s)} />}
            />
            <Route
              path="/services/:serviceId"
              element={
                <ServiceDetailPage
                  onOpenQuote={(s?: string) => handleOpenQuote(s)}
                  onOpenCalendly={() => setIsCalendlyOpen(true)}
                />
              }
            />
            <Route
              path="/portfolio"
              element={<PortfolioPage onOpenQuote={() => handleOpenQuote()} />}
            />
            <Route
              path="/about"
              element={<AboutPage onOpenCalendly={() => setIsCalendlyOpen(true)} />}
            />
            <Route
              path="/contact"
              element={<ContactPage onOpenCalendly={() => setIsCalendlyOpen(true)} />}
            />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/careers" element={<CareersPage />} />
          </Routes>
        </main>

        {/* Floating Utilities */}
        <WhatsAppWidget />

        {/* Interactive Modals */}
        <CalendlyModal
          isOpen={isCalendlyOpen}
          onClose={() => setIsCalendlyOpen(false)}
        />
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          preselectedService={quoteService}
        />

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
