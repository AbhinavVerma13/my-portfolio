import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Real-time control values stored in refs for zero garbage collection / high performance
  const controls = useRef({
    speed: 0.8,
    scale: 180,
    chaos: 35,
    morph: 1.0,
  });

  // UI state for reactive inputs
  const [speed, setSpeed] = useState(0.8);
  const [scale, setScale] = useState(180);
  const [chaos, setChaos] = useState(35);
  const [morph, setMorph] = useState(1.0);
  const [showHUD, setShowHUD] = useState(true);

  // Sync state to refs
  useEffect(() => {
    controls.current.speed = speed;
    controls.current.scale = scale;
    controls.current.chaos = chaos;
    controls.current.morph = morph;
  }, [speed, scale, chaos, morph]);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    
    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 500;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 4. PARTICLE GEOMETRY (20,000 particles)
    const particleCount = 20000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Initial positions (random spherical layout)
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 150 + Math.random() * 50;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create a round glowing texture for particles instead of squares
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // 5. MATERIAL
    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 6. MOUSE TRACKING
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX - window.innerWidth / 2);
      mouse.targetY = -(e.clientY - window.innerHeight / 2);
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 7. ANIMATION LOOP
    const clock = new THREE.Clock();
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      const currentControls = controls.current;

      // Detect current theme (light or dark)
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const positionsArray = posAttr.array as Float32Array;

      const colAttr = geometry.getAttribute('color') as THREE.BufferAttribute;
      const colorsArray = colAttr.array as Float32Array;

      const tempColor = new THREE.Color();

      // Math swarm calculations (0 garbage collection in loop)
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Base angles and ratios
        const ratio = i / particleCount;
        const phi = ratio * Math.PI * 2.0;
        const theta = ratio * 100.0 + time * currentControls.speed;

        // Formula 1: Double Torus Ring
        const r1 = currentControls.scale * (0.8 + 0.3 * Math.cos(theta * 3));
        const tx1 = Math.cos(phi) * r1;
        const ty1 = Math.sin(phi) * r1;
        const tz1 = Math.sin(theta * 5) * currentControls.chaos;

        // Formula 2: Quantum Spiral Attractor
        const r2 = currentControls.scale * 0.9 * Math.sqrt(ratio) + Math.sin(time + ratio * 20.0) * currentControls.chaos;
        const tx2 = Math.cos(theta * 2.5) * r2;
        const ty2 = Math.sin(theta * 2.5) * r2;
        const tz2 = Math.cos(phi * 3) * (currentControls.scale * 0.4);

        // Interpolate between Formula 1 & Formula 2 based on morph value
        let x = THREE.MathUtils.lerp(tx1, tx2, currentControls.morph);
        let y = THREE.MathUtils.lerp(ty1, ty2, currentControls.morph);
        let z = THREE.MathUtils.lerp(tz1, tz2, currentControls.morph);

        // Add subtle wave noise
        x += Math.sin(phi * 12 + time * 2) * (currentControls.chaos * 0.2);
        y += Math.cos(phi * 8 + time * 1.5) * (currentControls.chaos * 0.2);
        z += Math.sin(theta * 4) * (currentControls.chaos * 0.3);

        // Magnetic Mouse Gravity Pull / Repulsion
        if (mouse.active) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distSq = dx * dx + dy * dy;
          const limit = 220;

          if (distSq < limit * limit) {
            const dist = Math.sqrt(distSq);
            // Dynamic attraction/repulsion based on distance
            const pullForce = (limit - dist) * 0.18;
            x += (dx / dist) * pullForce;
            y += (dy / dist) * pullForce;
          }
        }

        // Apply updated positions
        positionsArray[i3] = x;
        positionsArray[i3 + 1] = y;
        positionsArray[i3 + 2] = z;

        // Apply Colors depending on active Theme
        if (isDark) {
          // Glow gold / amber / cosmic purple HSL gradients
          const hue = (ratio * 0.15 + time * 0.02 + 0.08) % 1.0; // Warm amber to purple
          const sat = 0.85;
          const light = 0.45 + Math.sin(time * 2 + ratio * 10) * 0.15; // Twinkle effect
          tempColor.setHSL(hue, sat, light);
        } else {
          // Sophisticated bronze / terracotta / terracotta slate
          const hue = (0.05 + ratio * 0.06) % 1.0; // Warm terracotta tones
          const sat = 0.65;
          const light = 0.35 + Math.cos(time + ratio * 5) * 0.1;
          tempColor.setHSL(hue, sat, light);
        }

        colorsArray[i3] = tempColor.r;
        colorsArray[i3 + 1] = tempColor.g;
        colorsArray[i3 + 2] = tempColor.b;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Slow rotation of entire universe
      particleSystem.rotation.y = time * 0.03;
      particleSystem.rotation.x = time * 0.015;

      // Dynamic camera parallax matching mouse movement
      camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // 8. WINDOW RESIZE HANDLER
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 9. CLEANUP
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* 3D Canvas container */}
      <div 
        ref={containerRef} 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{ opacity: 0.7 }}
      />

      {/* Glassmorphic Interactive Swarm Controls HUD */}
      {showHUD && (
        <div 
          className="fixed bottom-28 left-6 z-50 max-w-xs w-72 rounded-2xl p-5 border border-black/5 dark:border-white/5 bg-white/70 dark:bg-[#141210]/70 backdrop-blur-xl shadow-xl transition-all duration-300"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="flex items-center justify-between mb-3 border-b border-black/5 dark:border-white/5 pb-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] font-mono">
              Swarm Engine V1.2
            </h4>
            <button 
              onClick={() => setShowHUD(false)}
              className="text-xs hover:text-[var(--accent)] text-stone-400 font-mono transition-colors"
            >
              [Hide]
            </button>
          </div>
          
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-4 font-sans">
            Simulating 20,000+ interactive particles inside a double toroidal quantum attractor.
          </p>

          <div className="space-y-3">
            {/* Speed slider */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1">
                <span>ROTATION SPEED</span>
                <span>{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
              />
            </div>

            {/* Scale slider */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1">
                <span>SWARM RADIUS</span>
                <span>{scale}px</span>
              </div>
              <input
                type="range"
                min="80"
                max="300"
                value={scale}
                onChange={(e) => setScale(parseInt(e.target.value))}
                className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
              />
            </div>

            {/* Chaos slider */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1">
                <span>CHAOS / NOISE</span>
                <span>{chaos}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={chaos}
                onChange={(e) => setChaos(parseInt(e.target.value))}
                className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
              />
            </div>

            {/* Morph slider */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1">
                <span>ATTRACTOR MORPH</span>
                <span>{morph === 0 ? 'Torus' : morph === 1 ? 'Spiral' : 'Transition'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={morph}
                onChange={(e) => setMorph(parseFloat(e.target.value))}
                className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tiny launcher button if HUD is hidden */}
      {!showHUD && (
        <button
          onClick={() => setShowHUD(true)}
          className="fixed bottom-28 left-6 z-50 py-2 px-3 rounded-full border border-black/5 dark:border-white/5 bg-white/70 dark:bg-[#141210]/70 backdrop-blur-xl text-[10px] uppercase font-mono tracking-widest text-[var(--accent)] shadow-lg hover:border-[var(--accent)] transition-all"
          style={{ pointerEvents: 'auto' }}
        >
          ⚙️ Swarm Engine
        </button>
      )}
    </>
  );
};
