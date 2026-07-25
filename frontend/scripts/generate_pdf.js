import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, '../public/Software_Project_Planning_Guide.pdf');

const doc = new PDFDocument({
  size: 'A4',
  margin: 50,
  info: {
    Title: '2026 Enterprise Software Architecture & System Planning Manual',
    Author: 'Riyadvi Software Technologies',
    Subject: 'Software Architecture, Microservices, Cloud Benchmarks, Security Compliance',
    Keywords: 'Software Architecture, Microservices, AWS, React, Node.js, ISO 27001, SOC 2'
  }
});

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Primary Palette
const GOLD = '#D4AF37';
const DARK_BG = '#0B0B10';
const CARD_BG = '#14141F';
const TEXT_WHITE = '#FFFFFF';
const TEXT_MUTED = '#9CA3AF';
const ACCENT_CYAN = '#38BDF8';

// --- PAGE 1: COVER PAGE ---
doc.rect(0, 0, 595.28, 841.89).fill('#050508');

// Top Accent Line
doc.rect(0, 0, 595.28, 8).fill(GOLD);

// Title & Header Box
doc.fillColor(GOLD).fontSize(10).text('ENTERPRISE TECHNICAL MANUAL • 2026 EDITION', 50, 80, { characterSpacing: 1.5 });

doc.fillColor(TEXT_WHITE).fontSize(28).text('Software Architecture & System Planning Manual', 50, 110, { width: 495, lineGap: 6 });

doc.fillColor(TEXT_MUTED).fontSize(12).text(
  'A structured engineering blueprint for CTOs, VPs of Engineering, and IT Leaders planning high-scale web platforms, mobile apps, and spatial IT infrastructure.',
  50,
  190,
  { width: 495, lineGap: 4 }
);

// Decorative Architecture Box
doc.rect(50, 260, 495, 240).fill(CARD_BG).stroke('#222233');

doc.fillColor(GOLD).fontSize(14).text('TABLE OF CONTENTS', 75, 285);

const tocItems = [
  { num: '01', title: 'Microservices vs. Monolith Architecture Decision Engine' },
  { num: '02', title: 'Full-Stack Performance & Cloud Cost Benchmarks' },
  { num: '03', title: 'Enterprise Security & Audit Compliance Checklist (ISO / SOC 2)' },
  { num: '04', title: 'RFP Evaluation Matrix & Vendor Selection Scorecard' },
  { num: '05', title: 'Riyadvi Software Engineering Framework & Consultation' }
];

tocItems.forEach((item, idx) => {
  const yPos = 320 + (idx * 34);
  doc.fillColor(GOLD).fontSize(11).text(item.num, 75, yPos);
  doc.fillColor(TEXT_WHITE).fontSize(11).text(item.title, 110, yPos);
});

// Footer Metadata
doc.rect(50, 720, 495, 50).fill('#0F0F17');
doc.fillColor(TEXT_WHITE).fontSize(10).text('PUBLISHED BY RIYADVI SOFTWARE TECHNOLOGIES', 70, 732);
doc.fillColor(TEXT_MUTED).fontSize(9).text('Confidential & Proprietary • Approved for Enterprise Distribution', 70, 748);

// --- PAGE 2: SECTION 01 & 02 ---
doc.addPage();
doc.rect(0, 0, 595.28, 841.89).fill('#0B0B10');

doc.fillColor(GOLD).fontSize(10).text('SECTION 01', 50, 50, { characterSpacing: 1 });
doc.fillColor(TEXT_WHITE).fontSize(18).text('Microservices vs. Monolith Architecture Engine', 50, 68);

doc.fillColor(TEXT_MUTED).fontSize(10).text(
  'Choosing between a monolithic architecture and a microservice-oriented layout depends on operational complexity, team velocity, and concurrency demands.',
  50, 95, { width: 495, lineGap: 3 }
);

// Table: Monolith vs Microservices
doc.rect(50, 140, 495, 140).fill(CARD_BG);
doc.fillColor(GOLD).fontSize(11).text('CRITERIA', 65, 152);
doc.fillColor(GOLD).fontSize(11).text('MODULAR MONOLITH', 210, 152);
doc.fillColor(GOLD).fontSize(11).text('MICROSERVICES MESH', 380, 152);

const tableRows = [
  { c: 'Team Size', m: '< 15 Engineers', s: '20+ Multi-Discipline Teams' },
  { c: 'Concurrency', m: '< 10,000 req/sec', s: '100,000+ req/sec' },
  { c: 'Deployment', m: 'Single Pipeline', s: 'Independent CI/CD per service' },
  { c: 'Data Consistency', m: 'ACID / Relational DB', s: 'Eventual Consistency / Kafka' }
];

tableRows.forEach((r, i) => {
  const y = 175 + (i * 24);
  doc.fillColor(TEXT_WHITE).fontSize(9).text(r.c, 65, y);
  doc.fillColor(TEXT_MUTED).fontSize(9).text(r.m, 210, y);
  doc.fillColor(TEXT_MUTED).fontSize(9).text(r.s, 380, y);
});

// SECTION 02
doc.fillColor(GOLD).fontSize(10).text('SECTION 02', 50, 310, { characterSpacing: 1 });
doc.fillColor(TEXT_WHITE).fontSize(18).text('Cloud Infrastructure & Performance Benchmarks', 50, 328);

doc.fillColor(TEXT_MUTED).fontSize(10).text(
  'Estimated monthly AWS infrastructure costs based on modern production workloads (React 19 Frontend + Node.js Microservices).',
  50, 355, { width: 495, lineGap: 3 }
);

// Tier Cards
const tiers = [
  { title: 'STARTER SCALE', users: '10K MAU', cost: '$350 - $800 / mo', desc: 'AWS ECS Fargate, Single Aurora PostgreSQL, CloudFront CDN, Redis.' },
  { title: 'ENTERPRISE MID-SCALE', users: '250K MAU', cost: '$2,500 - $6,000 / mo', desc: 'EKS Kubernetes Mesh, Multi-AZ Aurora, Elasticache Cluster, WAF.' },
  { title: 'GLOBAL HYPER-SCALE', users: '5M+ MAU', cost: '$18,000+ / mo', desc: 'Multi-Region Kubernetes, DynamoDB Global Tables, Cloudflare Enterprise.' }
];

tiers.forEach((t, idx) => {
  const y = 400 + (idx * 110);
  doc.rect(50, y, 495, 95).fill(CARD_BG);
  doc.fillColor(GOLD).fontSize(11).text(t.title, 65, y + 15);
  doc.fillColor(ACCENT_CYAN).fontSize(10).text(t.cost, 400, y + 15);
  doc.fillColor(TEXT_WHITE).fontSize(9).text(`Target Workload: ${t.users}`, 65, y + 35);
  doc.fillColor(TEXT_MUTED).fontSize(9).text(t.desc, 65, y + 52, { width: 450 });
});

// --- PAGE 3: SECTION 03 & 04 ---
doc.addPage();
doc.rect(0, 0, 595.28, 841.89).fill('#0B0B10');

doc.fillColor(GOLD).fontSize(10).text('SECTION 03', 50, 50, { characterSpacing: 1 });
doc.fillColor(TEXT_WHITE).fontSize(18).text('Enterprise Security & Audit Compliance Checklist', 50, 68);

const securityItems = [
  { title: 'ISO 27001 & SOC 2 Type II', detail: 'Enforce AES-256 encryption at rest, TLS 1.3 in transit, automated vulnerability scanning in CI/CD pipelines.' },
  { title: 'Identity & Access Management', detail: 'OAuth 2.0 + OIDC authentication, RBAC with least privilege model, mandatory Multi-Factor Authentication (MFA).' },
  { title: 'HIPAA & GDPR Data Governance', detail: 'Anonymized data logging, customer consent management, right-to-be-forgotten automated purges.' }
];

securityItems.forEach((sec, idx) => {
  const y = 100 + (idx * 75);
  doc.rect(50, y, 495, 65).fill(CARD_BG);
  doc.fillColor(TEXT_WHITE).fontSize(11).text(`[✓]  ${sec.title}`, 65, y + 15);
  doc.fillColor(TEXT_MUTED).fontSize(9).text(sec.detail, 65, y + 34, { width: 460 });
});

// SECTION 04
doc.fillColor(GOLD).fontSize(10).text('SECTION 04', 50, 360, { characterSpacing: 1 });
doc.fillColor(TEXT_WHITE).fontSize(18).text('Vendor RFP & Selection Scorecard Matrix', 50, 378);

doc.fillColor(TEXT_MUTED).fontSize(10).text(
  'Use this weighted scoring system when evaluating software engineering partners:',
  50, 405
);

const scorecard = [
  { factor: 'Technical Architecture Depth (Senior Engineering Ratio)', weight: '30%', minScore: '8/10' },
  { factor: 'Security & Compliance Maturity (SOC 2, ISO Compliance)', weight: '25%', minScore: '9/10' },
  { factor: 'Delivery Speed & Agile Sprint Discipline', weight: '25%', minScore: '8/10' },
  { factor: 'Post-Launch SLA & 24/7 Infrastructure Support', weight: '20%', minScore: '8.5/10' }
];

scorecard.forEach((sc, i) => {
  const y = 430 + (i * 45);
  doc.rect(50, y, 495, 38).fill(CARD_BG);
  doc.fillColor(TEXT_WHITE).fontSize(9).text(sc.factor, 65, y + 12);
  doc.fillColor(GOLD).fontSize(9).text(`Weight: ${sc.weight}`, 350, y + 12);
  doc.fillColor(ACCENT_CYAN).fontSize(9).text(`Target: ${sc.minScore}`, 440, y + 12);
});

// SECTION 05: CALL TO ACTION
doc.rect(50, 640, 495, 130).fill('#0F0F1A').stroke(GOLD);
doc.fillColor(GOLD).fontSize(14).text('Need Expert Architecture Guidance?', 75, 660);
doc.fillColor(TEXT_WHITE).fontSize(10).text(
  'Riyadvi Software Technologies partners with enterprises globally to architect, build, and scale world-class web applications, mobile platforms, and AI systems.',
  75, 685, { width: 445 }
);

doc.fillColor(GOLD).fontSize(11).text('Book a 30-Min System Planning Audit: https://riyadvisoftwaretechnologies.com/contact', 75, 730);

doc.end();

stream.on('finish', () => {
  console.log('PDF successfully generated at:', outputPath);
});
