import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'hover'>('default');
  const [cursorText, setCursorText] = useState('');
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Show cursor only after mouse moves
    const handleFirstMove = () => {
      setVisible(true);
      window.removeEventListener('mousemove', handleFirstMove);
    };
    window.addEventListener('mousemove', handleFirstMove);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Mouse hover listeners on buttons, links, and triggers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== 'function') {
        setCursorType('default');
        setCursorText('');
        return;
      }
      
      // Look for parent buttons or anchors or custom tags
      const interactiveEl = target.closest('a, button, [data-cursor-tag]');
      if (interactiveEl) {
        setCursorType('hover');
        const tag = interactiveEl.getAttribute('data-cursor-tag') || 'SELECT';
        setCursorText(tag);
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleFirstMove);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: cursorX,
        top: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      animate={{
        width: cursorType === 'hover' ? 70 : 20,
        height: cursorType === 'hover' ? 30 : 20,
        borderRadius: cursorType === 'hover' ? '15px' : '50%',
        backgroundColor: cursorType === 'hover' ? 'rgba(0, 242, 254, 0.15)' : 'rgba(0, 242, 254, 0)',
        border: cursorType === 'hover' ? '1px solid rgba(0, 242, 254, 0.6)' : '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: cursorType === 'hover' ? '0 0 15px rgba(0, 242, 254, 0.3)' : '0 0 0px rgba(0, 242, 254, 0)',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      className="hidden md:flex items-center justify-center font-code text-[9px] font-bold text-accent-cyan tracking-wider overflow-hidden"
    >
      {cursorType === 'hover' && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="uppercase"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
};
