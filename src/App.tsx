import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Linkedin, Github, Menu, X } from 'lucide-react';
import './index.css';
import {
  ContactButton,
  LiveProjectButton,
  FadeIn,
  Magnet,
  AnimatedText
} from './components/PortfolioComponents';
import { ThreeBackground } from './components/ThreeBackground';

// ───────── 21 MARQUEE IMAGES FROM MOTIONSITES.AI ─────────
const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

// Split images for the two marquee rows
const marqueeRow1 = marqueeImages.slice(0, 11);
const marqueeRow2 = marqueeImages.slice(11);

// Tripled lists for seamless loop
const row1Tripled = [...marqueeRow1, ...marqueeRow1, ...marqueeRow1];
const row2Tripled = [...marqueeRow2, ...marqueeRow2, ...marqueeRow2];

// ───────── SERVICES DATA ─────────
const services = [
  {
    num: '01',
    name: 'AI Agent Building',
    desc: 'Creation of autonomous AI agents tailored to specific business needs, handling user queries, scraping data, and executing complex workflows.',
  },
  {
    num: '02',
    name: 'Workflow Automation',
    desc: 'Designing custom n8n and Python pipelines to connect APIs, automate repetitive tasks, and speed up business operations.',
  },
  {
    num: '03',
    name: 'Chatbot Development',
    desc: 'Building advanced conversational AI chatbots for platforms like WhatsApp, Telegram, or web interfaces with custom database integration.',
  },
  {
    num: '04',
    name: 'Web Scraping & Data',
    desc: 'Building efficient scripts and agents to extract, structure, and clean data from complex websites and directories.',
  },
  {
    num: '05',
    name: 'Backend & Integrations',
    desc: 'Connecting external systems, handling OAuth authentication, and setting up reliable cloud databases for production-ready apps.',
  },
];

// ───────── PROJECTS DATA (WITH SPECIFIED IMAGES) ─────────
const projectsData = [
  {
    num: '01',
    category: 'Autonomous Builder',
    name: 'AI Startup Agent',
    url: 'https://ai-startup-agent-0jge.onrender.com/',
    col1Img1: '/startup_media_1.png',
    col1Img2: '/startup_media_2.png',
    col2Img: '/startup_media_3.png',
  },
  {
    num: '02',
    category: 'Autonomous Persona',
    name: 'AI Digital Twin',
    url: '#',
    col1Img1: '/ai_digital_twin_mockup.png',
    col1Img2: '/ai_digital_twin_mockup.png',
    col2Img: '/ai_digital_twin_mockup.png',
  },
  {
    num: '03',
    category: 'College AI Assistant',
    name: 'SRMCEM AI Helpdesk',
    url: 'https://srmcem-frontend-production.up.railway.app/',
    col1Img1: '/srmcem_helpdesk_mockup.png',
    col1Img2: '/srmcem_helpdesk_mockup.png',
    col2Img: '/srmcem_helpdesk_mockup.png',
  },
  {
    num: '04',
    category: 'Automated Travel Planner',
    name: 'WhatsApp Travel Agent',
    url: '#',
    col1Img1: '/whatsapp_travel_agent_mockup.png',
    col1Img2: '/whatsapp_travel_agent_mockup.png',
    col2Img: '/whatsapp_travel_agent_mockup.png',
  },
  {
    num: '05',
    category: 'AI/ML Verification',
    name: 'Fake News Detector',
    url: 'https://abhinavverma13.github.io/Fake-News-Detector/',
    col1Img1: '/veritas_media_1.png',
    col1Img2: '/veritas_media_2.png',
    col2Img: '/veritas_media_3.png',
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans overflow-x-clip">
      {/* 3D Particle Swarm Background (Adaptive and Premium) */}
      <ThreeBackground />

      {/* ════════════ 1. HERO SECTION ════════════ */}
      <section id="hero" className="relative h-screen flex flex-col justify-between overflow-hidden z-20">
        {/* Navbar */}
        <FadeIn delay={0} y={-20} className="w-full">
          <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 relative z-50">
            <span className="font-mono text-sm tracking-widest text-[var(--accent)] font-semibold select-none">
              AV.DEV
            </span>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-12 lg:gap-16">
              {['About', 'Price', 'Projects', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase() === 'price' ? 'services' : link.toLowerCase())}
                  className="text-sm lg:text-[1.4rem] uppercase tracking-wider text-[#D7E2EA] hover:opacity-70 transition-opacity duration-200 font-medium"
                >
                  {link}
                </button>
              ))}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#D7E2EA] p-2 focus:outline-none relative z-50"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 bg-[#0C0C0C]/95 backdrop-blur-md flex flex-col justify-center items-center gap-8 z-40">
                {['About', 'Price', 'Projects', 'Contact'].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollTo(link.toLowerCase() === 'price' ? 'services' : link.toLowerCase())}
                    className="text-2xl uppercase tracking-widest text-[#D7E2EA] hover:text-[var(--accent)] transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            )}
          </nav>
        </FadeIn>

        {/* Hero Heading */}
        <div className="relative w-full flex flex-col items-center justify-start flex-grow select-none">
          <FadeIn delay={0.15} y={40} className="w-full text-center relative z-20 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
            <h1 className="hero-heading text-[5vw] sm:text-[5.5vw] md:text-[6vw] lg:text-[6.5vw] font-black uppercase tracking-tight leading-none w-full whitespace-nowrap">
              Hi, i&apos;m abhinav verma
            </h1>
          </FadeIn>

          {/* Hero Portrait absolutely centered over text */}
          <FadeIn delay={0.6} y={30} className="absolute left-0 right-0 mx-auto w-fit z-30 bottom-[-20px] sm:bottom-[-40px] md:bottom-[-60px] lg:bottom-[-80px]">
            <Magnet padding={150} strength={3} className="cursor-pointer">
              <img
                src="/no_earring_portrait.png"
                alt="Abhinav Portrait"
                className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[65vh] h-auto object-contain pointer-events-none drop-shadow-2xl select-none"
              />
            </Magnet>
          </FadeIn>
        </div>

        {/* Bottom Bar */}
        <div className="px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end w-full z-20">
          <FadeIn delay={0.35} y={20} className="w-full max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
              an ai agent developer driven by crafting striking and unforgettable automations
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton onClick={() => scrollTo('contact')} label="Contact Me" />
          </FadeIn>
        </div>
      </section>

      {/* ════════════ 2. MARQUEE SECTION ════════════ */}
      <MarqueeSection />

      {/* ════════════ 3. ABOUT SECTION ════════════ */}
      <section id="about" className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden z-20">
        {/* Decorative 3D Corner assets */}
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon 3D icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto pointer-events-none select-none opacity-80"
          />
        </FadeIn>

        <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="Swirl 3D object"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto pointer-events-none select-none opacity-80"
          />
        </FadeIn>

        <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego 3D icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto pointer-events-none select-none opacity-80"
          />
        </FadeIn>

        <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="Group 3D object"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto pointer-events-none select-none opacity-80"
          />
        </FadeIn>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-20 gap-10 sm:gap-14 md:gap-16">
          {/* Section heading */}
          <FadeIn delay={0} y={40}>
            <h2 className="hero-heading text-[10vw] md:text-[8vw] lg:text-[7vw] font-black uppercase leading-none tracking-tight">
              About me
            </h2>
          </FadeIn>

          {/* Character-reveal scrolling bio paragraph */}
          <div className="max-w-[560px]">
            <AnimatedText
              text="I'm Abhinav Verma — based in India, deeply passionate about AI and automation. I build AI agents that solve real problems: from a startup builder platform to a college helpdesk chatbot to a WhatsApp automation assistant. I'm not just building — I'm constantly learning. Let's build something incredible together!"
              className="font-medium text-[#D7E2EA] leading-relaxed text-center"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
            />
          </div>

          {/* Education Timeline (Directly inside About, fully updated) */}
          <FadeIn delay={0.2} y={30} className="w-full max-w-xl text-left mt-8">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[var(--accent)] mb-6 font-semibold">
              Education Timeline
            </h3>
            <div className="space-y-8 pl-4 border-l border-[#D7E2EA]/10">
              <div className="relative pl-6">
                <div className="absolute -left-[21px] top-1 w-[9px] h-[9px] rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                <h4 className="text-sm font-semibold text-white">Bachelor of Technology (B.Tech)</h4>
                <p className="text-xs text-[#D7E2EA]/70 mt-1">Shri Ramswaroop Memorial College of Engineering and Management (SRMCEM)</p>
                <p className="text-[11px] text-[#D7E2EA]/50 mt-1.5 font-light">
                  Affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow.
                </p>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-[21px] top-1 w-[9px] h-[9px] rounded-full bg-[#D7E2EA]/30" />
                <h4 className="text-sm font-semibold text-white">Class XII (Senior Secondary)</h4>
                <p className="text-xs text-[#D7E2EA]/70 mt-1">Central Academy Senior Secondary School</p>
                <p className="text-[11px] text-[#D7E2EA]/50 mt-1.5 font-light">
                  Completed under the Central Board of Secondary Education (CBSE) Board.
                </p>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-[21px] top-1 w-[9px] h-[9px] rounded-full bg-[#D7E2EA]/30" />
                <h4 className="text-sm font-semibold text-white">Class X (Secondary)</h4>
                <p className="text-xs text-[#D7E2EA]/70 mt-1">Central Academy Senior Secondary School</p>
                <p className="text-[11px] text-[#D7E2EA]/50 mt-1.5 font-light">
                  Completed under the Central Board of Secondary Education (CBSE) Board.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} y={20} className="mt-8">
            <ContactButton onClick={() => scrollTo('contact')} label="Work with me" />
          </FadeIn>
        </div>
      </section>

      {/* ════════════ 4. SERVICES SECTION ════════════ */}
      <section
        id="services"
        className="relative bg-white text-[#0C0C0C] z-30 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
          {/* Header */}
          <FadeIn delay={0} y={40} className="w-full text-center">
            <h2 className="text-[#0C0C0C] font-black uppercase text-[10vw] md:text-[8vw] lg:text-[7vw] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28">
              Services
            </h2>
          </FadeIn>

          {/* List items */}
          <div className="max-w-5xl mx-auto divide-y divide-[#0C0C0C]/15">
            {services.map((item, idx) => (
              <FadeIn
                key={item.num}
                delay={idx * 0.1}
                y={30}
                className="py-8 sm:py-10 md:py-12 flex flex-col md:flex-row gap-6 md:gap-16 items-start"
              >
                {/* Number */}
                <div className="font-black text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] leading-none text-[#0C0C0C] md:w-36 select-none opacity-80">
                  {item.num}
                </div>
                {/* Text Block */}
                <div className="flex flex-col gap-2 md:gap-3 flex-grow mt-2">
                  <h3 className="font-semibold uppercase text-xl sm:text-2xl md:text-[2.1rem] leading-none tracking-tight">
                    {item.name}
                  </h3>
                  <p className="font-light text-stone-600 leading-relaxed max-w-2xl text-sm sm:text-base md:text-[1.25rem]">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ 5. PROJECTS SECTION ════════════ */}
      <section
        id="projects"
        className="relative bg-[#0C0C0C] z-30 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pb-32"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32">
          {/* Header */}
          <FadeIn delay={0} y={40} className="w-full text-center mb-20 md:mb-28">
            <h2 className="hero-heading text-[10vw] md:text-[8vw] lg:text-[7vw] font-black uppercase leading-none tracking-tight">
              Project
            </h2>
          </FadeIn>

          {/* Stacking Cards Container */}
          <div className="relative flex flex-col gap-24 md:gap-32 max-w-5xl mx-auto">
            {projectsData.map((project, idx) => (
              <StackingCard key={project.num} project={project} index={idx} total={projectsData.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ 6. CONTACT SECTION (VERIFIED FORMSPREE BACKEND) ════════════ */}
      <section id="contact" className="relative min-h-[85vh] py-32 flex items-center justify-center z-30 bg-[#0C0C0C] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 w-full relative z-10 text-center flex flex-col items-center">
          <FadeIn delay={0} y={30}>
            <p className="text-xs uppercase font-mono tracking-widest text-[var(--accent)] mb-4 font-semibold">
              Get In Touch
            </p>
            <h2 className="hero-heading text-[8vw] md:text-[6vw] font-black uppercase tracking-tight leading-none mb-12">
              Let&apos;s build together
            </h2>
          </FadeIn>

          {/* Simple and elegant input form */}
          <FadeIn delay={0.15} y={30} className="w-full max-w-xl">
            <form
              className="flex flex-col gap-6 text-left"
              action="https://formspree.io/f/xrewvbzl"
              method="POST"
            >
              <input type="hidden" name="_next" value="https://my-portfolio-tau-ten-2hdwdgosle.vercel.app/" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-[#D7E2EA]/60 pl-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    placeholder="Abhinav"
                    className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-[#D7E2EA]/60 pl-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Verma"
                    className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-mono tracking-wider text-[#D7E2EA]/60 pl-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="1217abinav@gmail.com"
                  className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-mono tracking-wider text-[#D7E2EA]/60 pl-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project, automation requirements, or just say hi..."
                  className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-full uppercase font-medium tracking-widest text-white transition-all duration-300 hover:scale-105 active:scale-95 text-center flex items-center justify-center"
                style={{
                  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                  outline: '2px solid white',
                  outlineOffset: '-3px',
                }}
              >
                <span className="block px-8 py-3.5 text-sm">Send Message ✉</span>
              </button>
            </form>
          </FadeIn>

          {/* Social icons row */}
          <FadeIn delay={0.3} y={20} className="flex gap-8 justify-center mt-20">
            <a
              href="mailto:1217abinav@gmail.com"
              className="text-[#D7E2EA]/60 hover:text-[var(--accent)] transition-colors duration-200"
            >
              <Mail size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinav-verma-65b641248/"
              target="_blank"
              rel="noreferrer"
              className="text-[#D7E2EA]/60 hover:text-[var(--accent)] transition-colors duration-200"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://github.com/AbhinavVerma13"
              target="_blank"
              rel="noreferrer"
              className="text-[#D7E2EA]/60 hover:text-[var(--accent)] transition-colors duration-200"
            >
              <Github size={22} />
            </a>
          </FadeIn>

          <FadeIn delay={0.4} y={20} className="mt-12 text-[10px] uppercase font-mono tracking-widest text-[#D7E2EA]/40">
            Made with ❤️ in India — Deployed on Vercel
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

// ───────── SCROLL MARQUEE ROW COMPONENT ─────────
function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      // Calculate scroll offset based on section position
      const offset = (window.scrollY - top + window.innerHeight) * 0.3;
      setScrollProgress(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3 overflow-hidden select-none z-20 relative"
    >
      {/* Row 1: Moves right */}
      <div
        className="flex gap-3 will-change-transform"
        style={{
          transform: `translateX(${scrollProgress - 200}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        {row1Tripled.map((gif, index) => (
          <img
            key={index}
            src={gif}
            alt={`Swarm preview ${index}`}
            loading="lazy"
            className="w-[420px] h-[270px] min-w-[420px] rounded-2xl object-cover"
          />
        ))}
      </div>

      {/* Row 2: Moves left */}
      <div
        className="flex gap-3 will-change-transform"
        style={{
          transform: `translateX(${-(scrollProgress - 200)}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        {row2Tripled.map((gif, index) => (
          <img
            key={index}
            src={gif}
            alt={`Swarm preview left ${index}`}
            loading="lazy"
            className="w-[420px] h-[270px] min-w-[420px] rounded-2xl object-cover"
          />
        ))}
      </div>
    </div>
  );
}

// ───────── STACKING CARD COMPONENT FOR PROJECTS ─────────
interface StackingCardProps {
  project: {
    num: string;
    category: string;
    name: string;
    url: string;
    col1Img1: string;
    col1Img2: string;
    col2Img: string;
  };
  index: number;
  total: number;
}

function StackingCard({ project, index, total }: StackingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Stacking scale calculations based on page scroll
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0.6, 1], [1, 1 - (total - 1 - index) * 0.03]);

  return (
    <div
      ref={cardRef}
      className="sticky h-[85vh] flex items-start justify-center"
      style={{
        top: `calc(${96 + index * 28}px)`, // Sticky offsets
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between h-[75vh] sm:h-[80vh] shadow-2xl relative z-10"
      >
        {/* Top Row details */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-4xl sm:text-5xl md:text-[4rem] text-[#D7E2EA] opacity-60 leading-none">
              {project.num}
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-[2.2rem] font-bold text-white leading-none mt-1">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton href={project.url} target="_blank" rel="noreferrer" label="Live Project" />
        </div>

        {/* Bottom Row grid layout */}
        <div className="grid grid-cols-10 gap-3 sm:gap-4 md:gap-5 flex-grow mt-6 sm:mt-8 overflow-hidden h-[60%]">
          {/* Left Column (40% width, 2 stacked images) */}
          <div className="col-span-4 flex flex-col justify-between h-full gap-3 sm:gap-4">
            <div className="w-full overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px]" style={{ height: 'calc(45% - 6px)' }}>
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="w-full overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px]" style={{ height: 'calc(55% - 6px)' }}>
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column (60% width, 1 tall image) */}
          <div className="col-span-6 h-full overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px]">
            <img
              src={project.col2Img}
              alt={`${project.name} hero preview`}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
