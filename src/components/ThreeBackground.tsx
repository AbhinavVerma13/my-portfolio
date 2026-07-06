import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle Constellation Geometry
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Random coordinates in space
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;

      // Velocities
      velocities.push({
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.3,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material (glowing points)
    const material = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 3.5,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Line connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });

    let lineSegments = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
    scene.add(lineSegments);

    // Mouse tracking for physics interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX - window.innerWidth / 2) * 0.8;
      mouse.targetY = -(e.clientY - window.innerHeight / 2) * 0.8;
      
      // Update global CSS variables for glow coordinates
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Slowly rotate the whole particle assembly
      particles.rotation.y += 0.0006;
      particles.rotation.x += 0.0003;
      lineSegments.rotation.y += 0.0006;
      lineSegments.rotation.x += 0.0003;

      // Update particle positions and apply physics
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const positionsArray = posAttr.array as Float32Array;

      const linePositions: number[] = [];

      for (let i = 0; i < particleCount; i++) {
        let x = positionsArray[i * 3];
        let y = positionsArray[i * 3 + 1];
        let z = positionsArray[i * 3 + 2];

        // Move particle
        x += velocities[i].x;
        y += velocities[i].y;
        z += velocities[i].z;

        // Bounce back if boundaries are reached
        if (x < -300 || x > 300) velocities[i].x *= -1;
        if (y < -300 || y > 300) velocities[i].y *= -1;
        if (z < -200 || z > 200) velocities[i].z *= -1;

        // Interactive mouse force (attraction/repulsion)
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) * 0.008;
          x += (dx / dist) * force;
          y += (dy / dist) * force;
        }

        positionsArray[i * 3] = x;
        positionsArray[i * 3 + 1] = y;
        positionsArray[i * 3 + 2] = z;

        // Check distance to other particles for drawing connection lines
        for (let j = i + 1; j < particleCount; j++) {
          const ox = positionsArray[j * 3];
          const oy = positionsArray[j * 3 + 1];
          const oz = positionsArray[j * 3 + 2];

          const d = Math.sqrt((x - ox) ** 2 + (y - oy) ** 2 + (z - oz) ** 2);
          if (d < 110) {
            linePositions.push(x, y, z, ox, oy, oz);
          }
        }
      }

      posAttr.needsUpdate = true;

      // Update connection lines geometry
      if (lineSegments.geometry) {
        lineSegments.geometry.dispose();
      }
      
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineSegments.geometry = lineGeometry;

      // Camera parallax
      camera.position.x += (mouse.x * 0.2 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} id="three-canvas" />;
};
