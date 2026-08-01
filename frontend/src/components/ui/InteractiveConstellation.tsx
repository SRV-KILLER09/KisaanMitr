'use client';

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  theta: number;
  phi: number;
  speed: number;
}

export default function InteractiveConstellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize 200 particles distributed on a 3D spherical shell
    const particlesCount = 200;
    const particles: Particle[] = [];
    const sphereRadius = 250; // Radius of the 3D globe

    for (let i = 0; i < particlesCount; i++) {
      // Golden spiral distribution coordinates on sphere surface for uniform spacing
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        theta,
        phi,
        speed: (Math.random() * 0.001) + 0.0015, // rotation speed
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseMoveEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Clear with slight alpha decay for smooth movement trails
      ctx.fillStyle = 'rgba(5, 8, 6, 0.16)';
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Mouse-driven 3D angles
      const angleY = mouse.x * 0.35; // Yaw rotation angle
      const angleX = -mouse.y * 0.35; // Pitch rotation angle

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const centerX = width / 2;
      const centerY = height / 2;
      const focalLength = 350;

      const projected: { sx: number; sy: number; brightness: number; z: number }[] = [];

      // Calculate globe spin and project particles
      for (let i = 0; i < particlesCount; i++) {
        const p = particles[i];

        // 1. Slow automatic Y-axis orbit spin
        const cosSpin = Math.cos(p.speed);
        const sinSpin = Math.sin(p.speed);
        const sx1 = p.x * cosSpin - p.z * sinSpin;
        const sz1 = p.x * sinSpin + p.z * cosSpin;
        
        p.x = sx1;
        p.z = sz1;

        // 2. Mouse-driven Pitch (X-axis) and Yaw (Y-axis) rotation
        let rx = p.x * cosY - p.z * sinY;
        let rz = p.x * sinY + p.z * cosY;
        let ry2 = p.y * cosX - rz * sinX;
        let rz2 = p.y * sinX + rz * cosX;

        // Perspective divide projection
        // Place the sphere at center-depth (z = 400)
        const zDepth = rz2 + 450;
        const scale = focalLength / zDepth;
        const sx = centerX + rx * scale;
        // Shift slightly upwards to align behind the landing page hero text
        const sy = (centerY - 40) + ry2 * scale;

        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          // Closer particles appear brighter and larger
          const brightness = (1 - zDepth / 1000);
          const alpha = Math.max(0.04, brightness * 0.7);
          const size = Math.max(0.6, (zDepth < 450 ? 2.0 : 1.1) * scale);

          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();

          projected.push({ sx, sy, brightness, z: zDepth });
        } else {
          projected.push({ sx: -999, sy: -999, brightness: 0, z: zDepth });
        }
      }

      // Draw faint connections inside the sphere to outline its 3D volume
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particlesCount; i++) {
        const p1 = projected[i];
        if (p1.sx === -999) continue;

        for (let j = i + 1; j < particlesCount; j++) {
          const p2 = projected[j];
          if (p2.sx === -999) continue;

          // Standard distance check
          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect particles within proximity threshold to form the grid lattice
          if (dist < 55) {
            const lineAlpha = (1 - dist / 55) * 0.09 * p1.brightness;
            ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none block z-0" />;
}

type MouseMoveEvent = {
  clientX: number;
  clientY: number;
};
