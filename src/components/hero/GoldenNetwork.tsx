'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const GOLD = '201,162,39';
const MAX_DIST = 155;

export function GoldenNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nodes: Node[] = [];
    const t0 = performance.now();

    const scatter = () => {
      const { offsetWidth: w, offsetHeight: h } = canvas;
      canvas.width = w;
      canvas.height = h;
      const count = w < 768 ? 38 : 90;
      nodes.length = 0;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
        });
      }
    };

    scatter();
    window.addEventListener('resize', scatter);

    let raf: number;

    const frame = () => {
      const w = canvas.width;
      const h = canvas.height;
      const t = (performance.now() - t0) / 1000;

      ctx.clearRect(0, 0, w, h);

      // Primary glow — off-centre, pulses slowly
      const pulse = 0.5 + Math.sin(t * 0.7) * 0.09;
      const cx = w * 0.58;
      const cy = h * 0.44;
      const r = Math.min(w, h) * 0.72;
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g1.addColorStop(0,   `rgba(${GOLD},${(0.30 * pulse).toFixed(3)})`);
      g1.addColorStop(0.28,`rgba(${GOLD},${(0.14 * pulse).toFixed(3)})`);
      g1.addColorStop(0.6, `rgba(${GOLD},${(0.04 * pulse).toFixed(3)})`);
      g1.addColorStop(1,   `rgba(${GOLD},0)`);
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Secondary soft halo — drifts slightly
      const hx = w * 0.5 + Math.sin(t * 0.23) * w * 0.06;
      const hy = h * 0.5 + Math.cos(t * 0.17) * h * 0.06;
      const g2 = ctx.createRadialGradient(hx, hy, 0, hx, hy, Math.min(w, h) * 0.45);
      g2.addColorStop(0,   `rgba(${GOLD},0.08)`);
      g2.addColorStop(0.5, `rgba(${GOLD},0.02)`);
      g2.addColorStop(1,   `rgba(${GOLD},0)`);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Advance nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) { n.vx *= -1; n.x = Math.max(0, Math.min(w, n.x)); }
        if (n.y < 0 || n.y > h) { n.vy *= -1; n.y = Math.max(0, Math.min(h, n.y)); }
      }

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = dx * dx + dy * dy;
          if (d < MAX_DIST * MAX_DIST) {
            const a = (1 - Math.sqrt(d) / MAX_DIST) * 0.42;
            ctx.strokeStyle = `rgba(${GOLD},${a.toFixed(3)})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      ctx.fillStyle = `rgba(${GOLD},0.72)`;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', scatter);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />;
}
