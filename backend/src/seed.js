import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';
import { Blog } from './models/Blog.js';
import { Portfolio } from './models/Portfolio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // fallback
}

const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/riyadvi_db';

const sampleBlogs = [
  {
    title: 'Building Enterprise Software in 2026: Why React 19 & Node.js Dominate',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'Architecture', 'Web Dev'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000',
    date: 'July 18, 2026',
    readTime: '6 min read',
    author: {
      name: 'Riyadvi Engineering Team',
      role: 'Core Architects',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    excerpt: 'Explore how React Server Components and Node.js microservices enable modern software partners to deliver sub-100ms digital solutions.',
    content: 'Building modern software requires scalable architecture...'
  }
];

const samplePortfolio = [
  {
    title: 'Nexus Pay - Global Banking & Wealth Platform',
    category: 'Web Development',
    client: 'Nexus Financial Inc.',
    clientLocation: 'Singapore & London',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    summary: 'A ultra-secure multi-currency banking platform processing over $12M daily transactions.',
    problem: 'Page response times over 6s during peak market hours.',
    solution: 'Re-engineered using Next.js micro-frontends and Node.js microservices.',
    result: 'Sub-300ms global latency and 99.99% uptime.',
    metrics: [{ label: 'Page Load Speed', value: '0.28s' }],
    toolsUsed: ['React', 'Next.js', 'Node.js', 'MongoDB']
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(connStr);
    console.log('[Seed]: Connected to MongoDB');

    await Blog.deleteMany({});
    await Portfolio.deleteMany({});

    await Blog.insertMany(sampleBlogs);
    await Portfolio.insertMany(samplePortfolio);

    console.log('[Seed]: Database successfully populated with initial data!');
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err);
    process.exit(1);
  }
};

seedDB();
