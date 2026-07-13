import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// ───────── 1. CONTACT BUTTON ─────────
interface ContactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ label = 'Contact Me', className = '', ...props }) => {
  return (
    <button
      className={`rounded-full uppercase font-medium tracking-widest text-white transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
      {...props}
    >
      <span className="block px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base">
        {label}
      </span>
    </button>
  );
};

// ───────── 2. LIVE PROJECT BUTTON ─────────
interface LiveProjectButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ label = 'Live Project', className = '', ...props }) => {
  return (
    <a
      className={`inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-all duration-300 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base text-center ${className}`}
      {...props}
    >
      {label}
    </a>
  );
};

// ───────── 3. FADE IN ─────────
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: string;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className = '',
}) => {
  const Component = motion(as as any) as any;
  
  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
};

// ───────── 4. MAGNET EFFECT ─────────
interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px)');
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;

      // Distance from cursor to element center
      const dx = e.clientX - elCenterX;
      const dy = e.clientY - elCenterY;

      // Check if mouse is within padding range of the element bounds
      const distance = Math.sqrt(dx * dx + dy * dy);
      const triggerRadius = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < triggerRadius) {
        setTransition(activeTransition);
        // Magnetic pull offset (divided by strength factor)
        setTransform(`translate3d(${dx / strength}px, ${dy / strength}px, 0px)`);
      } else {
        setTransition(inactiveTransition);
        setTransform('translate3d(0px, 0px, 0px)');
      }
    };

    const handleMouseLeave = () => {
      setTransition(inactiveTransition);
      setTransform('translate3d(0px, 0px, 0px)');
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={containerRef}
      className={`will-change-transform ${className}`}
      style={{
        transform,
        transition,
      }}
    >
      {children}
    </div>
  );
};

// ───────── 5. SCROLL-REVEAL ANIMATED TEXT ─────────
interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  // Count total characters to distribute animation progress evenly
  const totalLength = text.length;
  let charIdxCounter = 0;

  return (
    <p ref={containerRef} style={style} className={`relative flex flex-wrap justify-center font-sans ${className}`}>
      {words.map((word, wIdx) => {
        const chars = word.split('');
        return (
          <span key={wIdx} className="mr-2 mb-1 inline-flex">
            {chars.map((char, cIdx) => {
              const currentIdx = charIdxCounter++;
              
              // Define start and end scroll percentage for this character
              const start = currentIdx / totalLength;
              const end = Math.min(1, (currentIdx + 4) / totalLength);
              
              return (
                <Character
                  key={cIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

// Internal Character sub-component for rendering individual scroll-revealed characters
interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder for layout spacing */}
      <span className="opacity-0">{char}</span>
      {/* Absolute positioned animated character */}
      <motion.span
        className="absolute top-0 left-0 text-inherit font-inherit select-none"
        style={{ opacity }}
      >
        {char}
      </motion.span>
    </span>
  );
};
