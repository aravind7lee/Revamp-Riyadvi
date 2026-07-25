export interface ServiceSubItem {
  name: string;
  desc: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  subServices: ServiceSubItem[];
  problem: string;
  solution: string;
  keyFeatures: string[];
  useCases: { industry: string; description: string }[];
  techStack: { name: string; icon: string }[];
  impactMetric: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Web Development' | 'App Development' | 'UI/UX Design' | 'AR/VR' | '3D Modeling' | 'Digital Marketing';
  client: string;
  clientLocation: string;
  image: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  metrics: { label: string; value: string }[];
  toolsUsed: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  excerpt: string;
  content: string;
}

export interface CareerItem {
  id: string;
  title: string;
  department: 'Engineering' | 'Design' | 'Marketing' | 'Management';
  designation: 'Senior' | 'Lead' | 'Mid-Level' | 'Junior';
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    tagline: 'High-performance, scalable web platforms built for high conversion',
    iconName: 'Globe',
    shortDesc: 'Custom web applications, SaaS platforms, and e-commerce solutions built with modern React, Next.js, and Node.js.',
    fullDesc: 'We architect and build bespoke web platforms that scale effortlessly. From high-converting corporate portals to complex multi-tenant SaaS products, our web development team delivers ultra-fast loading speed, robust API integration, and bank-grade security.',
    subServices: [
      { name: 'Custom Website', desc: 'Bespoke corporate websites tailored for fast loading & brand identity' },
      { name: 'Web Application', desc: 'Scalable SaaS platforms, dashboards & multi-tenant cloud tools' },
      { name: 'E-Commerce', desc: 'High-converting online stores with multi-currency checkout & inventory' }
    ],
    problem: 'Businesses struggle with slow legacy websites, poor mobile responsiveness, high bounce rates, and monolithic architectures that cannot scale with growing user traffic.',
    solution: 'We engineer microservices-ready, modern web applications leveraging serverless computing, headless CMS integrations, and optimized React/Next.js frontends designed for instant load times and high lead conversion.',
    keyFeatures: [
      'Custom React.js / Next.js Single Page & Server-Rendered Applications',
      'Scalable Node.js & Express RESTful / GraphQL API Architecture',
      'Ultra-fast Web Vitals Optimization (100/100 Lighthouse Performance)',
      'Bank-Grade Security (OAuth2, JWT, Rate Limiting, CORS, Encryption)',
      'Headless CMS & E-Commerce Integration (Shopify, Strapi, Sanity)',
      'Progressive Web App (PWA) Offline Functionality & Push Notifications'
    ],
    useCases: [
      { industry: 'FinTech', description: 'Real-time financial dashboard with sub-second data streaming & trading visualization.' },
      { industry: 'Healthcare', description: 'HIPAA-compliant telemedicine booking system & patient records portal.' },
      { industry: 'E-Commerce', description: 'High-volume international store handling 100,000+ daily orders with multi-currency checkout.' }
    ],
    techStack: [
      { name: 'React.js', icon: 'Code2' },
      { name: 'Next.js', icon: 'Globe' },
      { name: 'TypeScript', icon: 'FileCode' },
      { name: 'Tailwind CSS', icon: 'Palette' },
      { name: 'Node.js / Express', icon: 'Server' },
      { name: 'MongoDB / PostgreSQL', icon: 'Database' }
    ],
    impactMetric: '3.4x Faster Load Speed & 42% Increased Lead Conversion'
  },
  {
    id: 'app-development',
    title: 'App Development',
    tagline: 'Native & cross-platform mobile apps crafted for engaging user experiences',
    iconName: 'Smartphone',
    shortDesc: 'Seamless iOS, Android & Cross-Platform mobile applications engineered with React Native and Flutter for maximum engagement.',
    fullDesc: 'Transform your business idea into a top-rated mobile app on App Store and Google Play. We build intuitive, fluid mobile interfaces paired with robust cloud backends.',
    subServices: [
      { name: 'Android App', desc: 'Native Kotlin & Java applications tailored for Google Play Store performance' },
      { name: 'Cross-Platform', desc: 'Single-codebase React Native & Flutter apps for iOS & Android efficiency' },
      { name: 'iOS App', desc: 'Native Swift applications optimized for Apple ecosystem & iPhone user experience' }
    ],
    problem: 'High app churn rates due to clunky UI performance, frequent crashes, poor battery efficiency, and unoptimized offline synchronization.',
    solution: 'We design native-performing cross-platform apps using React Native and Flutter, implementing local cache management, push notification workflows, and biometrics security.',
    keyFeatures: [
      'Cross-Platform iOS & Android App Development (React Native & Flutter)',
      'Biometric Authentication (FaceID / Fingerprint) & Encrypted Storage',
      'Real-Time WebSockets & Geolocation Service Integration',
      'Push Notification Automation & In-App Payment Gateways (Stripe/Razorpay)',
      'Offline-First Data Syncing using SQLite / Realm Database',
      'Automated CI/CD App Store & Play Store Deployment Pipelines'
    ],
    useCases: [
      { industry: 'Logistics', description: 'Driver fleet tracking app with real-time GPS routing & offline pod capture.' },
      { industry: 'EdTech', description: 'Interactive learning app with downloadable offline video courses and gamified quizzes.' },
      { industry: 'Fitness & Health', description: 'Wearable device sync app tracking biometric metrics and workout routines.' }
    ],
    techStack: [
      { name: 'React Native', icon: 'Smartphone' },
      { name: 'Flutter', icon: 'Layers' },
      { name: 'Swift / iOS', icon: 'Cpu' },
      { name: 'Kotlin / Android', icon: 'Smartphone' },
      { name: 'Firebase', icon: 'Zap' },
      { name: 'GraphQL', icon: 'Share2' }
    ],
    impactMetric: '4.8 App Store Rating & 85% 30-Day User Retention'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'The perfect solution for your marketing growth',
    iconName: 'TrendingUp',
    shortDesc: 'Discover how we help businesses grow with innovative, tailored digital marketing strategies — ads, social media, SEO, and performance campaigns.',
    fullDesc: 'We help businesses grow with innovative and tailored digital marketing strategies. From precision ad campaigns that maximize ROI to consistent social media management and brand-building, our team becomes your dedicated growth engine.',
    subServices: [
      { name: 'Running the Ads', desc: 'We create impactful ad campaigns across Google, Meta & LinkedIn designed to maximize your reach and ROI.' },
      { name: 'Managing Social Media & Posters', desc: 'Our team ensures your brand is visible and engaging across all platforms with consistent content and design.' },
      { name: 'Search Engine Optimization', desc: 'Technical & programmatic SEO strategies driving top 3 organic rankings and sustained traffic growth.' },
      { name: 'Email Marketing & Funnels', desc: 'Automated lead nurturing sequences and email funnels that convert prospects into paying clients.' }
    ],
    problem: 'High advertising spend with low lead quality, inconsistent social media presence, poor organic search rankings, and lack of clear ROI attribution.',
    solution: 'A multi-channel digital strategy combining precision paid ads, consistent social media management, programmatic SEO, and automated email funnels — turning your digital footprint into a continuous lead generation engine.',
    keyFeatures: [
      'Paid Ad Campaign Management (Google Search, Meta Ads, LinkedIn B2B)',
      'Social Media Content Creation, Scheduling & Community Management',
      'Brand Poster & Creative Design for All Platforms',
      'Technical & Content SEO for Organic Top 3 Search Rankings',
      'Conversion Rate Optimization (CRO) & A/B Split Testing',
      'Full-Funnel Attribution Analytics & Executive ROI Dashboards'
    ],
    useCases: [
      { industry: 'B2B SaaS', description: 'LinkedIn lead gen campaign resulting in 150+ qualified enterprise consultation calls in 60 days.' },
      { industry: 'E-Commerce', description: 'Meta Ads + SEO strategy growing monthly revenue by 3.4x within the first quarter.' },
      { industry: 'Local Business', description: 'Google Ads + social media management increasing footfall and inquiries by 280%.' }
    ],
    techStack: [
      { name: 'Google Analytics 4', icon: 'BarChart3' },
      { name: 'Meta Pixel & API', icon: 'Target' },
      { name: 'SEMrush / Ahrefs', icon: 'Search' },
      { name: 'HubSpot / Mailchimp', icon: 'Mail' }
    ],
    impactMetric: '1200+ Satisfied Clients · 5.2x Average Paid Ads ROI'
  },
  {
    id: 'ar-vr',
    title: 'AR & VR Solutions',
    tagline: 'Immersive augmented & virtual reality applications for future-ready brands',
    iconName: 'Eye',
    shortDesc: 'Virtual Reality simulations, Augmented Reality product try-ons, and Mixed Reality spatial experiences.',
    fullDesc: 'Step into the next era of digital interaction with custom AR/VR solutions. We build web-based and application-driven spatial experiences that captivate users and revolutionize training and e-commerce.',
    subServices: [
      { name: 'Virtual Reality', desc: 'Immersive 360° training simulations & virtual space environments' },
      { name: 'Augmented Reality', desc: 'WebAR & app product visualization overlaid in real-world spaces' },
      { name: 'Mixed Reality', desc: 'Interactive spatial computing blending physical & digital objects' }
    ],
    problem: 'Traditional 2D media struggles to demonstrate complex physical products or provide realistic hands-on training environments remotely.',
    solution: 'Immersive WebAR and VR software that allows customers to preview products in 3D in their room or train staff in risk-free virtual simulations.',
    keyFeatures: [
      'WebAR Experiences (No app download required via WebXR)',
      'Virtual Reality (VR) Training Simulations for Oculus & Meta Quest',
      'Interactive 3D Product Configurators for E-Commerce',
      'Spatial Audio & Haptic Feedback Integration'
    ],
    useCases: [
      { industry: 'Furniture & Interior', description: 'AR room viewer allowing users to place 3D furniture models in their homes.' }
    ],
    techStack: [
      { name: 'Unity 3D', icon: 'Box' },
      { name: 'Unreal Engine', icon: 'Layers' },
      { name: 'Three.js / WebGL', icon: 'Code' },
      { name: 'ARKit / ARCore', icon: 'Smartphone' }
    ],
    impactMetric: '300% Higher User Dwell Time & 35% Lower Return Rate'
  },
  {
    id: '3d-modeling',
    title: '3D Modelling & Rendering',
    tagline: 'Photorealistic 3D assets, product visualizations, and architectural renders',
    iconName: 'Box',
    shortDesc: 'High-detail 3D visualization, game-ready 3D assets, and CAD product prototyping for marketing.',
    fullDesc: 'Bring your physical products and architectural vision to life before manufacturing. We craft photorealistic 3D renders, interactive CAD models, and high-impact promotional videos.',
    subServices: [
      { name: 'Visualization', desc: 'Photorealistic 3D renders & architectural walkthroughs' },
      { name: 'Game Assets', desc: 'Optimized 3D models, UV mapping & low-poly assets for game engines' },
      { name: 'Product Prototyping', desc: 'CAD design & CGI commercial animations before manufacturing' }
    ],
    problem: 'Physical photography shoots are expensive, inflexible, and cannot showcase prototype products before launch.',
    solution: 'Hyper-realistic 3D rendering and CGI assets that can be customized in infinite lighting conditions, angles, and materials.',
    keyFeatures: [
      'Photorealistic 3D Product Modeling & Texturing',
      '3D Architectural Visualization & Virtual Tours',
      'Industrial CAD Asset Optimization for Web-GL',
      '3D CGI Animation & Commercial Promotional Videos'
    ],
    useCases: [
      { industry: 'Automotive & Consumer Tech', description: 'Interactive 360° product inspector for flagship consumer hardware release.' }
    ],
    techStack: [
      { name: 'Blender', icon: 'Box' },
      { name: 'Autodesk Maya', icon: 'Layers' },
      { name: 'Substance Painter', icon: 'Palette' },
      { name: 'KeyShot', icon: 'Sparkles' }
    ],
    impactMetric: '70% Cost Reduction vs Physical Photography'
  },
  {
    id: 'game-development',
    title: 'Game Development',
    tagline: 'Engaging 2D/3D games, mobile gaming experiences, and live-ops support',
    iconName: 'Gamepad2',
    shortDesc: 'Mobile game development, 3D cross-platform games, game asset integration, and post-launch support.',
    fullDesc: 'We create high-fps, captivating mobile and desktop games powered by Unity 3D and Unreal Engine. From casual mobile games to rich 3D virtual worlds, we deliver end-to-end game production.',
    subServices: [
      { name: 'Mobile Games', desc: 'Addictive iOS & Android games with optimized performance & monetization' },
      { name: '3D Games', desc: 'Immersive PC & console-grade 3D gaming experiences powered by Unity' },
      { name: 'Game Support', desc: 'Live-ops management, server infrastructure, multiplayer & bug maintenance' }
    ],
    problem: 'Game studios and indie developers struggle with optimization across mid-range mobile devices, multiplayer latency, and post-launch live-ops scaling.',
    solution: 'End-to-end game development engineering featuring 60 FPS mobile optimization, cloud multiplayer servers (Photon/Nakama), and continuous content updates.',
    keyFeatures: [
      'Cross-Platform Mobile Game Development (iOS & Android)',
      '3D Environment Design, Physics & Character Rigging',
      'Multiplayer Cloud Server Architecture & Matchmaking',
      'In-App Purchase (IAP) & Ad Monetization Integration (Unity Ads, AdMob)',
      'Game Analytics, Anti-Cheat & Live-Ops Management'
    ],
    useCases: [
      { industry: 'Gaming & Entertainment', description: 'Casual 3D multiplayer racing game with 500,000+ downloads & in-app shop.' }
    ],
    techStack: [
      { name: 'Unity 3D', icon: 'Box' },
      { name: 'Unreal Engine 5', icon: 'Layers' },
      { name: 'C# / C++', icon: 'Code2' },
      { name: 'Photon Engine', icon: 'Zap' }
    ],
    impactMetric: '60 FPS Smooth Mobile Performance & 500K+ Downloads'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    tagline: 'Human-centered design systems built for intuitive digital journeys',
    iconName: 'Layout',
    shortDesc: 'Research-backed wireframing, high-fidelity UI design, clickable prototypes, and design systems.',
    fullDesc: 'Great design is more than aesthetics—it drives user action. Our UI/UX design process combines deep user research, persona mapping, iterative prototyping, and cohesive design system creation.',
    subServices: [
      { name: 'Wireframing & Prototyping', desc: 'Interactive click-through prototypes and wireframes' },
      { name: 'Design Systems', desc: 'Scalable UI component libraries, tokens & style guidelines' },
      { name: 'User Research & Audit', desc: 'UX heuristic evaluation, heatmap analysis & conversion testing' }
    ],
    problem: 'Users abandon complex interfaces that feel cluttered, unintuitive, or inconsistent across mobile and desktop devices.',
    solution: 'We craft frictionless user journeys, high-converting checkout flows, and scalable design systems that lower user acquisition costs and increase customer lifetime value.',
    keyFeatures: [
      'User Research, Heatmap Analysis & User Journey Mapping',
      'Interactive Figma Prototypes & Micro-Interaction Animations',
      'Comprehensive Design Systems (Tokens, Color Palettes, Typography)',
      'WCAG 2.1 AA Accessibility Compliance & Usability Testing',
      'Mobile-First Responsive Layout Specs & Developer Handoff'
    ],
    useCases: [
      { industry: 'SaaS', description: 'Complete redesign of enterprise analytics portal reducing user onboarding friction by 60%.' }
    ],
    techStack: [
      { name: 'Figma', icon: 'Figma' },
      { name: 'Adobe XD', icon: 'Layers' },
      { name: 'Protopie', icon: 'Sparkles' },
      { name: 'Storybook', icon: 'BookOpen' }
    ],
    impactMetric: '60% Friction Reduction & 2.1x Higher User Engagement'
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'fintech-nexus-portal',
    title: 'Nexus Pay - Global Banking & Wealth Platform',
    category: 'Web Development',
    client: 'Nexus Financial Inc.',
    clientLocation: 'Singapore & London',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    summary: 'A ultra-secure multi-currency banking & investment platform processing over $12M daily transactions.',
    problem: 'The client had legacy ASP.NET software with 6-second page response times and frequent timeouts during market peak hours.',
    solution: 'Riyadvi re-engineered the platform using Next.js micro-frontends and Node.js microservices with Redis caching and MongoDB cluster storage.',
    result: 'Sub-300ms global latency, 99.99% uptime, and 120,000+ newly onboarded accounts within the first quarter.',
    metrics: [
      { label: 'Page Load Speed', value: '0.28s' },
      { label: 'Daily Volume', value: '$12M+' },
      { label: 'Uptime SLA', value: '99.99%' }
    ],
    toolsUsed: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Redis']
  },
  {
    id: 'healthsync-mobile-app',
    title: 'HealthSync - Telemedicine & Vital Tracker App',
    category: 'App Development',
    client: 'CarePlus Health Network',
    clientLocation: 'Austin, Texas',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    summary: 'HIPAA-compliant mobile application offering instant 4K video consultations and automated prescription delivery.',
    problem: 'Patients faced 45-minute average appointment delays and clunky video streaming over 4G connections.',
    solution: 'Built cross-platform iOS & Android mobile app with WebRTC video engine, biometric auth, and push notification reminders.',
    result: 'Over 250,000 patient downloads with 4.9-star store rating and 82% appointment completion rate.',
    metrics: [
      { label: 'Downloads', value: '250K+' },
      { label: 'App Rating', value: '4.9 Rating' },
      { label: 'Wait Time Cut', value: '-65%' }
    ],
    toolsUsed: ['React Native', 'Node.js', 'MongoDB', 'WebRTC', 'Firebase', 'Tailwind CSS']
  },
  {
    id: 'luxeliving-ar-configurator',
    title: 'LuxeLiving 3D AR Furniture Try-On',
    category: 'AR/VR',
    client: 'LuxeLiving Interiors',
    clientLocation: 'Milan, Italy',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    summary: 'WebAR spatial application allowing shoppers to place true-to-scale 3D furniture models inside their living rooms.',
    problem: 'High return rates (28%) due to customers misjudging furniture dimensions and color harmony in home environments.',
    solution: 'Engineered WebXR / Three.js 3D viewer requiring zero app downloads, featuring real-time lighting estimation and direct checkout.',
    result: 'Reduced order returns to under 4.2% while increasing average order value (AOV) by $420.',
    metrics: [
      { label: 'Return Rate Reduction', value: '-85%' },
      { label: 'AOV Increase', value: '+$420' },
      { label: 'WebAR Sessions', value: '500K+' }
    ],
    toolsUsed: ['Three.js', 'WebGL', 'WebXR', 'React', 'Blender', 'Node.js']
  },
  {
    id: 'creativestudio-uiux',
    title: 'AeroCloud - Enterprise SaaS Design System',
    category: 'UI/UX Design',
    client: 'AeroCloud Technologies',
    clientLocation: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
    summary: 'A unified UI design system and component library powering 14 sub-products across cloud operations.',
    problem: 'Inconsistent UI styling across products led to high engineering overhead and fragmented brand experience.',
    solution: 'Designed 350+ modular UI components in Figma, complete with dark luxury dark theme tokens and Storybook documentation.',
    result: 'Cut developer UI implementation time by 50% and accelerated quarterly release cycles.',
    metrics: [
      { label: 'Design Tokens', value: '350+' },
      { label: 'Dev Time Saved', value: '50%' },
      { label: 'Product Consistency', value: '100%' }
    ],
    toolsUsed: ['Figma', 'Storybook', 'Tailwind CSS', 'React', 'Design Tokens']
  },
  {
    id: 'hyperdrive-3d-model',
    title: 'HyperDrive EV - 3D Hypercar Configurator',
    category: '3D Modeling',
    client: 'HyperDrive Dynamics',
    clientLocation: 'Munich, Germany',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200',
    summary: 'Photorealistic 3D car builder with real-time carbon fiber shader customization and ray-traced renders.',
    problem: 'Physical vehicle prototypes were locked in R&D, requiring a realistic digital alternative for pre-order sales.',
    solution: 'Crafted 4K 3D assets in Blender and Substance Painter integrated into interactive WebGL 3D stage.',
    result: '1,200 VIP pre-orders booked within 48 hours of product release reveal.',
    metrics: [
      { label: 'VIP Pre-orders', value: '1,200' },
      { label: 'Render Resolution', value: '4K Photoreal' },
      { label: 'Pre-order Revenue', value: '$18M+' }
    ],
    toolsUsed: ['Blender', 'Substance Painter', 'Three.js', 'WebGL', 'React']
  },
  {
    id: 'scaleup-digital-campaign',
    title: 'ScaleUp - B2B Growth & SEO Campaign',
    category: 'Digital Marketing',
    client: 'ScaleUp SaaS Solutions',
    clientLocation: 'Toronto, Canada',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    summary: 'Full-funnel organic SEO and paid ad acquisition strategy for enterprise B2B SaaS software.',
    problem: 'Stagnant website traffic and low organic lead capture (less than 10 leads per month).',
    solution: 'Implemented technical SEO, high-authority backlink strategy, programmatic landing pages, and LinkedIn funnel ads.',
    result: 'Increased qualified monthly leads from 8 to 240+ with a 4.5x reduction in customer acquisition cost (CAC).',
    metrics: [
      { label: 'Organic Traffic', value: '+340%' },
      { label: 'Monthly Leads', value: '240+' },
      { label: 'CAC Reduction', value: '-78%' }
    ],
    toolsUsed: ['Google Analytics 4', 'SEMrush', 'Meta Ads', 'LinkedIn Ads', 'Mailchimp']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'react-19-enterprise-guide',
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
    excerpt: 'Explore how React Server Components, micro-frontends, and Node.js backend pipelines enable modern software partners to deliver ultra-fast digital solutions.',
    content: `Building modern software requires more than just clean code—it requires scalable architecture. In this guide, we dive into how our development team leverages React and Node.js to create enterprise applications that handle millions of requests seamlessly.\n\n### Key Takeaways:\n1. **Server Components & Zero Bundle Overhead**: How rendering on the edge reduces user load times down to sub-100ms.\n2. **Microservices with Node.js & Express**: Decoupling monolithic backends into resilient, independently deployable services.\n3. **Database Scaling with MongoDB**: Schema optimization patterns that keep database queries blazing fast as records grow into millions.`
  },
  {
    id: 'lead-magnet-guide-2026',
    title: 'How to Plan Your Software Project: Avoid 5 Costly Pitfalls Before Hiring Developers',
    category: 'Business Strategy',
    tags: ['Project Planning', 'Software Strategy', 'Guide'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000',
    date: 'July 10, 2026',
    readTime: '8 min read',
    author: {
      name: 'Strategic Advisory Group',
      role: 'Riyadvi Solution Partners',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    excerpt: 'Before spending a single dollar on software development, read our step-by-step roadmap for defining scope, choosing tech stacks, and ensuring ROI.',
    content: `Over 65% of custom software projects suffer scope creep or budget overruns due to poor initial requirement mapping. Here is the exact blueprint Riyadvi uses to guarantee on-time, within-budget execution.`
  },
  {
    id: 'ar-vr-future-ecommerce',
    title: 'The AR/VR Revolution: How 3D Spatial Computing is Double E-Commerce Conversions',
    category: 'AR/VR',
    tags: ['AR/VR', '3D Modeling', 'E-Commerce', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=1000',
    date: 'June 28, 2026',
    readTime: '5 min read',
    author: {
      name: 'Riyadvi XR Lab',
      role: 'Spatial Computing Specialists',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    excerpt: 'WebAR and WebGL are transforming how users shop online. Discover how photorealistic 3D configurators reduce returns and boost customer dwell time.',
    content: `Static 2D image galleries are no longer enough to satisfy online consumers. Learn how WebXR and 3D modeling are bringing the showroom directly into the consumer's living room.`
  }
];

export const CAREER_POSITIONS: CareerItem[] = [
  {
    id: 'senior-fullstack-dev',
    title: 'Senior Full Stack Engineer (React + Node.js)',
    department: 'Engineering',
    designation: 'Senior',
    location: 'Remote / Coimbatore HQ',
    type: 'Full-time',
    experience: '4+ Years',
    description: 'We are seeking an ambitious Senior Full Stack Engineer to lead architectural decisions, design high-throughput Node.js microservices, and build responsive React applications.',
    responsibilities: [
      'Architect and build scalable web applications using React.js, Node.js, Express, and MongoDB.',
      'Optimize database queries, API latency, and front-end bundle sizes for peak web vitals performance.',
      'Collaborate with UI/UX designers and solution architects to deliver client features on tight sprint schedules.',
      'Mentor junior engineers and champion clean code, TDD, and automated CI/CD practices.'
    ],
    requirements: [
      'Strong expertise in JavaScript / TypeScript, React.js, Node.js, and Express.',
      'Hands-on experience with MongoDB indexing, aggregation pipelines, and schema modeling.',
      'Proficiency in RESTful APIs, WebSockets, Redis caching, and JWT authentication.',
      'Familiarity with cloud deployments (Render, Vercel, AWS, Docker).'
    ]
  },
  {
    id: 'lead-uiux-designer',
    title: 'Lead UI/UX Product Designer',
    department: 'Design',
    designation: 'Lead',
    location: 'Remote',
    type: 'Full-time',
    experience: '5+ Years',
    description: 'Lead design strategy across enterprise web apps, mobile products, and luxury brand interfaces for international clients.',
    responsibilities: [
      'Create high-fidelity wireframes, interactive Figma prototypes, and comprehensive design systems.',
      'Conduct user research interviews, usability testing, and UX heuristic audits.',
      'Define typography, color tokens (like gold & luxury dark modes), and micro-animations.'
    ],
    requirements: [
      'Mastery of Figma, Protopie, and modern UI design workflows.',
      'Proven portfolio showcasing enterprise SaaS, mobile apps, or luxury web applications.',
      'Strong understanding of HTML/CSS capabilities and developer handoff processes.'
    ]
  },
  {
    id: 'mobile-app-developer',
    title: 'React Native / Flutter Mobile Developer',
    department: 'Engineering',
    designation: 'Mid-Level',
    location: 'Hybrid / Coimbatore HQ',
    type: 'Full-time',
    experience: '2+ Years',
    description: 'Build native-performing cross-platform mobile apps for iOS and Android with smooth animations and robust offline syncing.',
    responsibilities: [
      'Develop cross-platform apps using React Native or Flutter.',
      'Integrate push notifications, payment gateways, biometric auth, and native device APIs.',
      'Publish and maintain apps on Apple App Store and Google Play Store.'
    ],
    requirements: [
      '2+ years mobile application development experience.',
      'Solid understanding of Redux / Zustand state management and REST/GraphQL APIs.',
      'Experience with Firebase services and App Store submission workflows.'
    ]
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: '1',
    name: 'Sophia Bennett',
    role: 'Operations Manager',
    company: 'Horizon Co',
    title: '"Reliable, thorough, and highly organized"',
    quote: 'Great follow-through and thoughtful execution. It reduced stress for the team and improved how we ship work.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    initials: 'SB',
    avatarColor: 'bg-emerald-600'
  },
  {
    id: '2',
    name: 'Michael Torres',
    role: 'Product Lead',
    company: 'Northwind',
    title: '"Strong instincts and fast iteration"',
    quote: 'Quick to understand the goal, smart decisions along the way, and a smooth cycle that respected deadlines.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    initials: 'MT',
    avatarColor: 'bg-blue-600'
  },
  {
    id: '3',
    name: 'David Reynolds',
    role: 'Chief Technology Officer',
    company: 'Nexus Financial Inc.',
    title: '"Sub-second latency & enterprise execution"',
    quote: 'Riyadvi re-architected our banking platform with zero downtime during peak market hours. Outstanding engineering depth!',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    initials: 'DR',
    avatarColor: 'bg-[#D4AF37]'
  },
  {
    id: '4',
    name: 'Dr. Elena Rostova',
    role: 'Head of Digital Innovation',
    company: 'CarePlus Health Network',
    title: '"Exceptional mobile UX & HIPAA compliance"',
    quote: 'Their attention to detail in mobile app UX and HIPAA compliance was remarkable. Our patients love the video consultation feature.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    initials: 'ER',
    avatarColor: 'bg-purple-600'
  },
  {
    id: '5',
    name: 'Marco Bellini',
    role: 'Founder & CEO',
    company: 'LuxeLiving Milan',
    title: '"Cut order returns by 85% with WebAR"',
    quote: 'The WebAR 3D furniture configurator created by Riyadvi exceeded our highest expectations. The 3D photorealism is unmatched.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    initials: 'MB',
    avatarColor: 'bg-amber-600'
  },
  {
    id: '6',
    name: 'Daniel Richter',
    role: 'Brand Strategist',
    company: 'Ember Group',
    title: '"Tasteful direction & confident process"',
    quote: 'Strategic, well-structured execution without overcomplicating. Everything felt intentional and easy to collaborate on.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    initials: 'DR',
    avatarColor: 'bg-indigo-600'
  }
];
