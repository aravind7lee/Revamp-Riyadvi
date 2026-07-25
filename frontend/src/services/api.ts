import { SERVICES_DATA, PORTFOLIO_DATA, BLOG_POSTS, CAREER_POSITIONS } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface NewsletterPayload {
  email: string;
  name?: string;
}

export interface LeadMagnetPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  message: string;
}

export interface JobApplicationPayload {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  coverLetter?: string;
}

export const api = {
  // Submit Lead Magnet Download Form
  async submitLeadMagnet(data: LeadMagnetPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (err) {
      console.warn('API backend offline, simulating lead magnet save locally:', err);
      return { success: true, message: 'Lead recorded successfully!', data };
    }
  },

  // Submit Contact / Consultation Form
  async submitContact(data: ContactPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (err) {
      console.warn('API backend offline, simulating contact save locally:', err);
      return { success: true, message: 'Consultation request received! We will contact you within 2 hours.', data };
    }
  },

  // Submit Job Application Form
  async submitJobApplication(data: JobApplicationPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/careers/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (err) {
      console.warn('API backend offline, simulating application save locally:', err);
      return { success: true, message: 'Application submitted successfully! Our HR team will reach out to you.', data };
    }
  },

  // Fetch Services Data
  async getServices() {
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      const res = await response.json();
      return res.data || SERVICES_DATA;
    } catch (err) {
      return SERVICES_DATA;
    }
  },

  // Fetch Portfolio Data
  async getPortfolio() {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio`);
      if (!response.ok) throw new Error('Failed to fetch portfolio');
      const res = await response.json();
      return res.data || PORTFOLIO_DATA;
    } catch (err) {
      return PORTFOLIO_DATA;
    }
  },

  // Fetch Blog Posts
  async getBlogs() {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const res = await response.json();
      return res.data || BLOG_POSTS;
    } catch (err) {
      return BLOG_POSTS;
    }
  },

  // Fetch Career Openings
  async getCareers() {
    try {
      const response = await fetch(`${API_BASE_URL}/careers`);
      if (!response.ok) throw new Error('Failed to fetch careers');
      const res = await response.json();
      return res.data || CAREER_POSITIONS;
    } catch (err) {
      return CAREER_POSITIONS;
    }
  },

  // Subscribe to Resend email newsletter
  async subscribeNewsletter(data: NewsletterPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Newsletter subscribe failed');
      return await response.json();
    } catch (err) {
      console.warn('Newsletter API unavailable, simulating subscribe locally:', err);
      return { success: true, message: `${data.email} successfully subscribed! Thank you.` };
    }
  }
};

