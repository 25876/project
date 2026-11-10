import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';

const GRID_W = 200;
const GRID_H = 120;
const STRENGTH = 30;
const SPRING = 0.08;
const DAMPING = 0.85;
const DISPLACE_SCALE = 120;

const ClothWarp = ({ children }: { children: ReactNode }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    // 初始：全中性灰 = 零位移
    const img = ctx.createImageData(GRID_W, GRID_H);
    for (let i = 0; i < img.data.length; i += 4) {
      img.data[i] = 128;
      img.data[i + 1] = 128;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    const neutralUrl = canvas.toDataURL('image/png');
    feImageRef.current?.setAttribute('href', neutralUrl);
    feImageRef.current?.setAttribute('xlink:href', neutralUrl);

    const offsets = new Float32Array(GRID_W * GRID_H * 2);
    const vels = new Float32Array(GRID_W * GRID_H * 2);

    const smooth = { x: -9999, y: -9999 };
    const qx = gsap.quickTo(smooth, 'x', { duration: 0.2, ease: 'power3.out' });
    const qy = gsap.quickTo(smooth, 'y', { duration: 0.2, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      qx(e.clientX - rect.left);
      qy(e.clientY - rect.top);
    };
    const onLeave = () => {
      gsap.to(smooth, { x: -9999, y: -9999, duration: 0.3, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    wrap.addEventListener('mouseleave', onLeave);

    let raf = 0;
    let lastUrl = neutralUrl;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const mx = smooth.x;
      const my = smooth.y;
      const hovering = mx > -9000;
      // 按压半径随元素尺寸自适应
      const pressRadius = Math.min(w, h * 3) * 0.18;

      for (let gy = 0; gy < GRID_H; gy++) {
        for (let gx = 0; gx < GRID_W; gx++) {
          const i = (gy * GRID_W + gx) * 2;
          const px = (gx / GRID_W) * w;
          const py = (gy / GRID_H) * h;

          let tx = 0;
          let ty = 0;
          if (hovering) {
            const dx = px - mx;
            const dy = py - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < pressRadius && dist > 0.001) {
              const falloff = 1 - dist / pressRadius;
              const f = falloff * falloff * STRENGTH;
              tx = (dx / dist) * f;
              ty = (dy / dist) * f;
            }
          }

          vels[i] += (tx - offsets[i]) * SPRING;
          vels[i + 1] += (ty - offsets[i + 1]) * SPRING;
          vels[i] *= DAMPING;
          vels[i + 1] *= DAMPING;
          offsets[i] += vels[i];
          offsets[i + 1] += vels[i + 1];

          if (!hovering && Math.abs(offsets[i]) < 0.05 && Math.abs(vels[i]) < 0.05) offsets[i] = 0;
          if (!hovering && Math.abs(offsets[i + 1]) < 0.05 && Math.abs(vels[i + 1]) < 0.05) offsets[i + 1] = 0;

          const p = (gy * GRID_W + gx) * 4;
          img.data[p] = 128 + offsets[i];
          img.data[p + 1] = 128 + offsets[i + 1];
          img.data[p + 2] = 128;
          img.data[p + 3] = 255;
        }
      }

      ctx.putImageData(img, 0, 0);
      const url = canvas.toDataURL('image/png');
      if (url !== lastUrl) {
        lastUrl = url;
        feImageRef.current?.setAttribute('href', url);
        feImageRef.current?.setAttribute('xlink:href', url);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(smooth);
    };
  }, []);

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden>
        <filter id="cloth-filter" x="-30%" y="-30%" width="160%" height="160%">
          <feImage
            ref={feImageRef}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="disp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="disp"
            scale={DISPLACE_SCALE}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <canvas ref={canvasRef} width={GRID_W} height={GRID_H} style={{ display: 'none' }} />

      {/* filter 常驻，不开关——静止时置换图全中性灰=零位移=文字正常 */}
      <div
        ref={wrapRef}
        style={{ filter: 'url(#cloth-filter)', padding: '0.25em 0.1em' }}
      >
        {children}
      </div>
    </>
  );
};

export default ClothWarp;
