import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './index.css';

/* ═══════════════════════════════════════════════════
   LOADING SCREEN
   ═══════════════════════════════════════════════════ */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 25;
    const step = 100 / (2000 / interval);
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p + step + Math.random() * 0.4;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 350);
          return 100;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loader-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="loader-counter">{Math.floor(progress)}</div>
      <div className="loader-bar">
        <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="loader-label">Loading Portfolio</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════════════ */
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el && typeof el.closest === 'function') {
        setExpanded(!!el.closest('a, button, .project-card, .skill-pill, .contact-link, .stat-box'));
      }
    };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
    };
  }, []);

  return <div ref={cursorRef} className={`custom-cursor ${expanded ? 'expanded' : ''}`} />;
}

/* ═══════════════════════════════════════════════════
   ANIMATED SECTION WRAPPER
   ═══════════════════════════════════════════════════ */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
/* ═══════════════════════════════════════════════════
   THEME SWITCHER (Light / Dark / Auto)
   ═══════════════════════════════════════════════════ */
type ThemeMode = 'light' | 'dark' | 'auto';

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(mode: ThemeMode) {
  const resolved = mode === 'auto' ? getSystemTheme() : mode;
  document.documentElement.setAttribute('data-theme', resolved);
  // Update body bg for FOUC prevention on next load
  document.body.style.backgroundColor = resolved === 'dark' ? '#0a0a0a' : '#faf8f5';
}

function ThemeSwitcher() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme') as ThemeMode | null;
    return saved || 'auto';
  });

  useEffect(() => {
    applyTheme(mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => { if (mode === 'auto') applyTheme('auto'); };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [mode]);

  return (
    <div className="theme-switcher">
      {(['light', 'dark', 'auto'] as ThemeMode[]).map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`theme-btn ${mode === m ? 'active' : ''}`}
        >
          {m.charAt(0).toUpperCase() + m.slice(1)}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   GRADIENT ORB BACKGROUNDS
   ═══════════════════════════════════════════════════ */
function GradientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top-left warm peach orb */}
      <div
        className="gradient-orb"
        style={{
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, #f5c6a0, transparent 70%)',
          top: '-10%', left: '-5%',
          animationDelay: '0s',
        }}
      />
      {/* Bottom-right soft lavender orb */}
      <div
        className="gradient-orb"
        style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, #c4b5f0, transparent 70%)',
          bottom: '10%', right: '-5%',
          animationDelay: '-7s',
        }}
      />
      {/* Center mint orb */}
      <div
        className="gradient-orb"
        style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, #a8dcd1, transparent 70%)',
          top: '50%', left: '40%',
          animationDelay: '-14s',
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECT DATA
   ═══════════════════════════════════════════════════ */
const projects = [
  {
    title: 'AI Startup Agent',
    label: 'Autonomous Builder',
    desc: 'A multi-agent platform that transforms raw business ideas into complete startup blueprints — from market analysis to go-to-market strategy, fully automated.',
    image: '/ai_startup_agent_mockup.png',
    url: 'https://ai-startup-agent-0jge.onrender.com/',
  },
  {
    title: 'WhatsApp Agent',
    label: 'Local Automation',
    desc: 'A locally-hosted AI chatbot that automates WhatsApp conversations — handles queries, schedules messages, and runs custom workflows on autopilot.',
    image: '/whatsapp_agent_mockup.png',
    url: '#',
  },
  {
    title: 'SRMCEM AI Helpdesk',
    label: 'College AI Assistant',
    desc: 'A full clone of my college website enhanced with an AI chatbot & voice agent — students get A-to-Z info about admissions, courses, fees, placements, and hostels instantly instead of searching endlessly.',
    image: '/srmcem_helpdesk_mockup.png',
    url: 'https://srmcem-frontend-production.up.railway.app/',
  },
];

/* ═══════════════════════════════════════════════════
   SKILLS DATA
   ═══════════════════════════════════════════════════ */
const skills = [
  'Python', 'n8n', 'Prompt Engineering', 'AI Agent Building',
  'Automation Workflows', 'Chatbot Development',
];

/* ═══════════════════════════════════════════════════
   FLOATING BOTTOM NAV
   ═══════════════════════════════════════════════════ */
const navSections = ['home', 'work', 'about', 'contact'] as const;

function FloatingNav({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] glass-dock flex items-center gap-1 px-3 py-2"
    >
      {navSections.map((s) => (
        <button key={s} onClick={() => onNav(s)} className={`dock-btn ${active === s ? 'active' : ''}`}>
          {s}
        </button>
      ))}
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════ */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const onLoadComplete = useCallback(() => setLoading(false), []);

  // Scroll spy
  useEffect(() => {
    if (loading) return;
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      for (const s of navSections) {
        const el = document.getElementById(s);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grain">
      {/* Cursor + Theme Toggle */}
      {!loading && <CustomCursor />}
      {!loading && <ThemeSwitcher />}

      {/* Loader */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={onLoadComplete} />}
      </AnimatePresence>

      {/* Main Site */}
      {!loading && (
        <>
          {/* Ambient gradient orbs */}
          <GradientOrbs />

          {/* Bottom nav dock */}
          <FloatingNav active={activeSection} onNav={scrollTo} />

          {/* ════════════ HERO ════════════ */}
          <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Giant bg text */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-text"
              >
                PORTFOLIO
              </motion.span>
            </div>

            {/* Centered intro */}
            <div className="relative z-10 text-center px-6 max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="section-label mb-8"
              >
                Building AI Agents &amp; Automating Everything
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="hero-name"
              >
                <em>Abhinav</em> Verma
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="section-body mx-auto mt-8 text-center"
              >
                I build AI agents, automate workflows, and turn ideas into
                real products. If it can be automated, I'll make it happen.
              </motion.p>
            </div>


          </section>

          {/* ════════════ WORK ════════════ */}
          <section id="work" className="relative py-32 min-h-screen">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
              {/* Section Header with bg text */}
              <div className="relative mb-20">
                <div
                  className="bg-text absolute -top-8 -left-4"
                  style={{ fontSize: 'clamp(80px, 15vw, 220px)', opacity: 0.5 }}
                >
                  WORK
                </div>
                <FadeIn>
                  <div className="relative z-10">
                    <p className="section-label mb-4">Selected Projects</p>
                    <h2 className="section-heading">Active Deployments</h2>
                  </div>
                </FadeIn>
              </div>

              {/* Project Cards Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, i) => (
                  <FadeIn key={project.title} delay={i * 0.15}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`project-card block ${i === 0 ? 'md:col-span-2' : ''}`}
                    >
                      <div className="overflow-hidden">
                        <img src={project.image} alt={project.title} style={i === 0 ? { height: '360px' } : undefined} />
                      </div>
                      <div className="card-body">
                        <div className="card-label">{project.label}</div>
                        <div className="card-title">{project.title}</div>
                        <div className="card-desc">{project.desc}</div>
                        <span className="card-link">
                          View Project <span>→</span>
                        </span>
                      </div>
                    </a>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════ ABOUT ════════════ */}
          <section id="about" className="relative py-32 min-h-screen">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
              {/* Section header */}
              <div className="relative mb-20">
                <div
                  className="bg-text absolute -top-8 -left-4"
                  style={{ fontSize: 'clamp(80px, 15vw, 220px)', opacity: 0.5 }}
                >
                  ABOUT
                </div>
                <FadeIn>
                  <div className="relative z-10">
                    <p className="section-label mb-4">Who I Am</p>
                    <h2 className="section-heading">
                      A developer obsessed<br />
                      with <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>automation</span>
                    </h2>
                  </div>
                </FadeIn>
              </div>

              {/* Stats Row */}
              <FadeIn delay={0.1}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                  {[
                    { num: '3+', label: 'Live Projects' },
                    { num: 'AI', label: 'Agents Built' },
                    { num: '24/7', label: 'Automation Uptime' },
                    { num: '∞', label: 'Eager to Learn' },
                  ].map((stat) => (
                    <div key={stat.label} className="stat-box">
                      <div className="stat-number">{stat.num}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Bio + Skills */}
              <div className="grid md:grid-cols-2 gap-16">
                <FadeIn delay={0.2}>
                  <div>
                    <p className="section-body">
                      I'm Abhinav Verma — based in India, deeply passionate about
                      AI and automation. I build AI agents that solve real problems:
                      from a startup builder platform to a college helpdesk chatbot
                      to a WhatsApp automation assistant.
                    </p>
                    <p className="section-body mt-6">
                      I'm not just building — I'm constantly learning. I use
                      Python, n8n, and prompt engineering to create agents and
                      automated workflows. My goal is to automate everything
                      that can be automated and help others do the same.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div>
                    <p className="section-label mb-6">Tech Stack</p>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill) => (
                        <span key={skill} className="skill-pill">{skill}</span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* ════════════ CONTACT ════════════ */}
          <section id="contact" className="relative min-h-[80vh] py-32 flex items-center">
            <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
              {/* Section header */}
              <div className="relative mb-16">
                <div
                  className="bg-text absolute -top-8 -left-4"
                  style={{ fontSize: 'clamp(80px, 15vw, 220px)', opacity: 0.5 }}
                >
                  CONNECT
                </div>
                <FadeIn>
                  <div className="relative z-10">
                    <p className="section-label mb-4">Get In Touch</p>
                    <h2 className="section-heading">Let's build something</h2>
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={0.15}>
                <form
                  className="contact-form mb-16"
                  action="https://formsubmit.co/1217abinav@gmail.com"
                  method="POST"
                >
                  {/* Honeypot & disable captcha */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value="https://abhinavverma.dev/thanks" />

                  <h3>Connect with me.</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input type="text" name="first_name" className="form-input" placeholder="Abhinav" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input type="text" name="last_name" className="form-input" placeholder="Verma" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" name="email" className="form-input" placeholder="you@example.com" required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input type="text" name="subject" className="form-input" placeholder="Greetings" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea name="message" className="form-input" placeholder="Hey there!" required />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <button type="submit" className="send-btn">
                      Send ✉
                    </button>

                    <div className="social-icons">
                      <a href="https://www.linkedin.com/in/abhinav-verma-65b641248/" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                      </a>
                      <a href="https://github.com/AbhinavVerma13" target="_blank" rel="noreferrer" className="social-icon" title="GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
                      </a>
                      <a href="mailto:1217abinav@gmail.com" className="social-icon" title="Email">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
                      </a>
                    </div>
                  </div>
                </form>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="separator mb-8" />
                <div
                  className="flex flex-wrap items-center justify-between gap-4"
                  style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text-muted)' }}
                >
                  <span>© 2026 Abhinav Verma</span>
                  <span>Made with ❤️ in India</span>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Spacer for bottom dock */}
          <div style={{ height: '80px' }} />
        </>
      )}
    </div>
  );
}
