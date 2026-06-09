export const portfolioItems = [
  {
    id: 'kumpirma',
    title: 'Kumpirma',
    category: 'dev',
    tag: 'Blockchain / AI',
    client: 'Academic Project',
    tech: 'TensorFlow.js / Blockchain / Laravel',
    desc: 'Designed a signature verification framework combining a Pix2Pix Conditional GAN architecture for supervised noise isolation with an Ethereum-compatible hash ledger. Documents are fingerprinted on upload; tamper detection runs client-side without exposing the original file to the server.',
    color: 'from-[#243054] to-[#1A2340]',
    graphic: `<svg class="w-16 h-16 text-[#D4A574]" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>`
  },
  {
    id: 'toka',
    title: 'Toka',
    category: 'dev',
    tag: 'Gamification / State Machine',
    client: 'Technopreneurship',
    tech: 'React / Laravel / MySQL',
    desc: 'Modeled a virtual coin economy where household tasks yield tokens redeemable for privileges. Used a state machine for task lifecycle to prevent race conditions between concurrent family members.',
    color: 'from-[#4E4B46] to-[#1A2340]',
    graphic: `<svg class="w-16 h-16 text-[#E8C77A]" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>`
  },
  {
    id: 'cryption',
    title: 'Cryption',
    category: 'dev',
    tag: 'Cryptography',
    client: 'Personal Project',
    tech: 'Rust',
    desc: 'Developed a memory-safe encryption platform featuring the proprietary Chained Algorithm. Implemented industry-standard Argon2id key stretching and HMAC-SHA256 integrity protection.',
    color: 'from-[#D4A574] to-[#1A2340]',
    graphic: `<svg class="w-16 h-16 text-[#F4EAD5]" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>`
  },
  {
    id: 'prioritask',
    title: 'PrioriTask',
    category: 'design',
    tag: 'Algorithms / Chrome Ext',
    client: 'Personal Project',
    tech: 'React / TS / Vitest',
    desc: 'Engineered a React-based Chrome extension that dynamically ranks student workloads. Built a custom deterministic scoring engine utilizing multiple algorithms to optimize task execution.',
    color: 'from-[#243054] to-[#4E4B46]',
    graphic: `<svg class="w-16 h-16 text-[#D4A574]" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>`
  },
  {
    id: 'helios',
    title: 'Helios IoT Grid',
    category: 'dev',
    tag: 'Systems Monitor',
    client: 'Helios Power Corp',
    tech: 'C++ / WebSockets / InfluxDB',
    desc: 'High-frequency logging pipeline designed for solar inverter nodes. Processes up to 5,000 grid metrics per second, plotting telemetry structures on a low-latency web workspace canvas.',
    color: 'from-[#D4A574] to-[#1A2340]',
    graphic: `<svg class="w-16 h-16 text-[#E8C77A]" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`
  },
  {
    id: 'novasynth',
    title: 'Nova DSP Synth',
    category: 'design',
    tag: 'Creative Coding',
    client: 'Personal Experiment',
    tech: 'WebAudio API / WASM',
    desc: 'Web-based modular DSP synthesizer leveraging WebAssembly. Built with a custom physics-guided keyboard UI designed to simulate string tension and tactile feedback.',
    color: 'from-[#243054] to-[#4E4B46]',
    graphic: `<svg class="w-16 h-16 text-[#F4EAD5]" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2" /></svg>`
  },
  {
    id: 'atlas',
    title: 'Atlas Spatial GIS',
    category: 'design',
    tag: 'Interactive Cartography',
    client: 'Mapworks Lab',
    tech: 'D3.js / Leaflet / GeoJSON',
    desc: 'Interactive vector map visualization. Translates raw coordinate sheets into smooth physical animations, preserving aspect ratios and geographical properties.',
    color: 'from-[#4E4B46] to-[#1A2340]',
    graphic: `<svg class="w-16 h-16 text-[#D4A574]" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7l5-3 5.447 2.724A1 1 0 0120 7.618v10.764a1 1 0 01-1.447.894L15 17l-6 3z" /></svg>`
  },
  {
    id: 'chronos',
    title: 'Chronos Engine',
    category: 'dev',
    tag: 'Time-Series Matrix',
    client: 'Productivity Labs',
    tech: 'Rust / gRPC / Svelte',
    desc: 'Ultra-low overhead time-tracking database. Employs atomic bitwise maps to serialize nested timeline arrays without hitting file storage boundaries.',
    color: 'from-[#243054] to-[#1A2340]',
    graphic: `<svg class="w-16 h-16 text-[#E8C77A]" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
  }
];

export const certificatesData = [
  {
    id: 'tensorflow',
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google Brain Integration',
    tag: 'Supervised Deep Learning, NLP & Convolutional Filters'
  },
  {
    id: 'aws',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Cloud Engineering Academy',
    tag: 'Redundant VPC Systems, IAM & High-Performance Microservices'
  },
  {
    id: 'rust',
    title: 'Memory-Safe Systems Integrator',
    issuer: 'Rust Systems Integrations Spec',
    tag: 'Lifetime Scopes, Concurrent Programming & WASM Integrations'
  },
  {
    id: 'kubernetes',
    title: 'Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    tag: 'Declarative Orchestration, Pod Lifecycles & Container Safety'
  },
  {
    id: 'stanford_algo',
    title: 'Stanford Advanced Algorithms',
    issuer: 'Stanford Online Academy',
    tag: 'Dynamic Programming, Graph Analytics & Deterministic Solvers'
  },
  {
    id: 'blockchain_dev',
    title: 'Certified Ethereum Developer',
    issuer: 'ConsenSys Academy',
    tag: 'Smart Contract Lifecycles, Gas Optimization & EVM Architectures'
  }
];

export const guestbookEntries = [
  { name: "Sonia Reed", message: "The WebAudio flip synthesizer sound is incredible!", emoji: "🚀", date: "Just now" },
  { name: "Julian Vance", message: "Absolutely gorgeous. The 3D layout feels remarkably physical.", emoji: "✨", date: "3 hours ago" },
  { name: "Linus Miller", message: "Using standard CSS rotates for page turns makes it load instantly.", emoji: "🔥", date: "1 day ago" },
  { name: "Dr. Clara Wu", message: "An exemplary integration of typography and motion physics.", emoji: "✍️", date: "2 days ago" },
  { name: "Marcus Thorne", message: "The clean stiff page flips make it highly professional to read.", emoji: "🚀", date: "3 days ago" },
  { name: "Elena Rostova", message: "The credentials verification page is clean, clear, and perfectly readable.", emoji: "✨", date: "4 days ago" },
  { name: "Arthur Pendelton", message: "Brilliant spatial mapping for a web developer portfolio!", emoji: "🔥", date: "1 week ago" },
  { name: "Aria K.", message: "Outstanding. Bookfolio really raises the bar for digital resumes.", emoji: "✍️", date: "1 week ago" }
];
