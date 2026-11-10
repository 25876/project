import { useEffect, useRef } from 'react';

/**
 * Firework — 随机形状烟花
 * 颜色：红、绿、黄、紫（蓝红双层）、蓝
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  sat: number;
  light: number;
  size: number;
  trail: { x: number; y: number }[];
}

// 限定颜色：红、绿、黄、紫（红蓝复合）、蓝
const COLORS = [
  { hue: 0, sat: 100, light: 60 },      // 红
  { hue: 130, sat: 100, light: 55 },    // 绿
  { hue: 50, sat: 100, light: 60 },     // 黄
  { hue: 280, sat: 100, light: 60 },    // 紫（蓝红复合）
  { hue: 210, sat: 100, light: 60 },    // 蓝
];

const Firework = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const flashesRef = useRef<{ x: number; y: number; life: number; hue: number; sat: number; light: number }[]>([]);
  const draggingRef = useRef(false);
  const lastTrailRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    let lastTime = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const pickColor = () => COLORS[Math.floor(rand(0, COLORS.length))];

    // 随机形状烟花
    const explode = (x: number, y: number) => {
      const color = pickColor();
      const shape = Math.floor(rand(0, 5)); // 0=球 1=环 2=星 3=垂柳 4=双层紫
      flashesRef.current.push({ x, y, life: 0, hue: color.hue, sat: color.sat, light: color.light });

      const spawnParticle = (vx: number, vy: number, c = color) => {
        particlesRef.current.push({
          x, y,
          vx, vy,
          life: 0,
          maxLife: rand(1.2, 2.5),
          hue: c.hue + rand(-10, 10),
          sat: c.sat,
          light: c.light,
          size: rand(1.5, 3.5),
          trail: [],
        });
      };

      if (shape === 0) {
        // 球形：均匀放射
        const count = 120;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          const speed = rand(150, 400);
          spawnParticle(Math.cos(angle) * speed, Math.sin(angle) * speed);
        }
      } else if (shape === 1) {
        // 环形：等距圆环
        const count = 80;
        const speed = 350;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          spawnParticle(Math.cos(angle) * speed, Math.sin(angle) * speed);
        }
      } else if (shape === 2) {
        // 星形：五角星
        const points = 5;
        for (let p = 0; p < points * 2; p++) {
          const angle = (Math.PI * p) / points;
          const isOuter = p % 2 === 0;
          const speed = isOuter ? 400 : 150;
          for (let j = 0; j < 15; j++) {
            spawnParticle(
              Math.cos(angle) * speed + rand(-30, 30),
              Math.sin(angle) * speed + rand(-30, 30)
            );
          }
        }
      } else if (shape === 3) {
        // 垂柳：向上发射后下垂
        const count = 80;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          const speed = rand(200, 350);
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed - 150; // 向上偏
          particlesRef.current.push({
            x, y, vx, vy,
            life: 0,
            maxLife: rand(2.0, 3.0),
            hue: color.hue + rand(-10, 10),
            sat: color.sat,
            light: color.light,
            size: rand(1, 2.5),
            trail: [],
          });
        }
      } else {
        // 双层紫：外层蓝 + 内层红
        const blue = COLORS[4]; // 蓝
        const red = COLORS[0];  // 红
        // 外层蓝
        for (let i = 0; i < 60; i++) {
          const angle = (Math.PI * 2 * i) / 60;
          spawnParticle(Math.cos(angle) * 400, Math.sin(angle) * 400, blue);
        }
        // 内层红
        for (let i = 0; i < 40; i++) {
          const angle = (Math.PI * 2 * i) / 40;
          spawnParticle(Math.cos(angle) * 200, Math.sin(angle) * 200, red);
        }
      }
    };

    const onDown = (e: MouseEvent) => {
      draggingRef.current = true;
      explode(e.clientX, e.clientY);
      lastTrailRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const last = lastTrailRef.current;
      if (!last) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      if (Math.sqrt(dx * dx + dy * dy) > 30) {
        explode(e.clientX, e.clientY);
        lastTrailRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    const onUp = () => {
      draggingRef.current = false;
      lastTrailRef.current = null;
    };

    window.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onUp);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      // 中心闪光
      const flashes = flashesRef.current;
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.life += dt;
        const alpha = Math.max(0, 1 - f.life / 0.2);
        if (alpha <= 0) { flashes.splice(i, 1); continue; }
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 100);
        grad.addColorStop(0, `hsla(${f.hue}, 100%, 95%, ${alpha})`);
        grad.addColorStop(0.3, `hsla(${f.hue}, 100%, 70%, ${alpha * 0.5})`);
        grad.addColorStop(1, `hsla(${f.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, 100, 0, Math.PI * 2);
        ctx.fill();
      }

      // 火花
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }

        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 10) p.trail.shift();

        p.vy += 250 * dt;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const lr = p.life / p.maxLife;
        const alpha = Math.pow(1 - lr, 1.2);

        // 拖尾
        if (p.trail.length > 1) {
          ctx.strokeStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${alpha * 0.6})`;
          ctx.lineWidth = p.size;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) ctx.lineTo(p.trail[j].x, p.trail[j].y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // 火花亮点
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, 85%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${p.hue}, ${p.sat}%, 60%, ${alpha * 0.3})`);
        grad.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default Firework;
