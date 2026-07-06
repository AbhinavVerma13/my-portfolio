import React from 'react';
import { motion } from 'framer-motion';

interface FloatingNavProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ activeSection, onNavClick }) => {
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'console', label: 'Console' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full glass glass-glow flex items-center gap-6">
      {/* Decorative indicator circle mimicking Kenichi Aikawa's circular category thumbnail */}
      <div className="relative w-8 h-8 rounded-full border border-neutral-800 bg-neutral-950 overflow-hidden flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: 360,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-4 h-4 rounded-full border border-dashed border-accent-cyan opacity-40"
        />
        <div className="absolute w-2 h-2 rounded-full bg-accent-green animate-pulse" />
      </div>

      <nav className="flex items-center gap-4 sm:gap-6">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => onNavClick(sec.id)}
            data-cursor-tag="GOTO"
            className="relative py-1 text-xs tracking-widest uppercase font-code transition-colors"
            style={{
              color: activeSection === sec.id ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.4)',
            }}
          >
            {sec.label}
            {activeSection === sec.id && (
              <motion.span
                layoutId="floating-nav-indicator"
                className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-cyan"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};
