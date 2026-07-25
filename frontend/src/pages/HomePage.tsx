import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { ServicesOverview } from '../components/ServicesOverview';
import { CompanyTimeline } from '../components/CompanyTimeline';
import { PortfolioPreview } from '../components/PortfolioPreview';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ServicesGrowthChart } from '../components/ServicesGrowthChart';
import { LeadMagnetSection } from '../components/LeadMagnetSection';
import { Testimonials } from '../components/Testimonials';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { StickyCtaBar } from '../components/StickyCtaBar';
import { SEOHead, ORGANIZATION_SCHEMA } from '../components/SEOHead';
import { PortfolioItem } from '../data/mockData';

interface HomePageProps {
  onOpenCalendly: () => void;
  onOpenQuote: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenCalendly, onOpenQuote }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<PortfolioItem | null>(null);

  const scrollToLeadMagnet = () => {
    const el = document.getElementById('lead-magnet');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0 relative">
      <SEOHead
        title="Custom Software & Digital Solutions to Grow Your Business"
        description="Web & App Development, UI/UX Design, AR/VR, 3D Modeling & Business Strategy – all tailored to your needs. Partnering with global businesses since 2021."
        canonical="https://riyadvisoftwaretechnologies.com/"
        structuredData={ORGANIZATION_SCHEMA}
      />
      
      {/* 1. Hero Section */}
      <Hero
        onOpenCalendly={onOpenCalendly}
        onScrollToLeadMagnet={scrollToLeadMagnet}
      />

      {/* 2. Core Capabilities (What We Do) */}
      <ServicesOverview />

      {/* 3. Company Timeline & Milestones (OUR JOURNEY) */}
      <CompanyTimeline />

      {/* 4. Featured Portfolio & Case Studies (OUR PORTFOLIO) — Positioned directly after Our Journey */}
      <PortfolioPreview onSelectCaseStudy={(item) => setSelectedCaseStudy(item)} />

      {/* 5. Engineering Standards & Advantage (Why Choose Us) */}
      <WhyChooseUs />

      {/* 6. Performance Metrics (Growth & Performance) */}
      <ServicesGrowthChart />

      {/* 7. Free Technical Audit Blueprint Lead Magnet */}
      <LeadMagnetSection />

      {/* 8. Client Testimonials & Proof */}
      <Testimonials />

      {/* Case Study Modal */}
      <CaseStudyModal
        item={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenQuote={onOpenQuote}
      />

      {/* Persistent Sticky CTA Bar when scrolling */}
      <StickyCtaBar
        onOpenCalendly={onOpenCalendly}
        onOpenQuote={onOpenQuote}
      />
    </div>
  );
};
