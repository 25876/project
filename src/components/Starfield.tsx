import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 3D 星云星空背景（Three.js r128）
 * - 1200×1200×1200 立方体内 6000 个白色点粒子
 * - PointsMaterial，size≈1.4，半透明，加色混合
 * - 相机 z=220，整团粒子绕 Y 轴(+0.0012) / X 轴(+0.0004) 极慢旋转
 * - 透明背景，透出外层 #0C0C0C；随窗口 resize 自适应
 */
const Starfield = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      3000
    );
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const COUNT = 6000;
    const SPACE = 1200;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++) {
      positions[i] = (Math.random() - 0.5) * SPACE;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.4,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      stars.rotation.y += 0.0012;
      stars.rotation.x += 0.0004;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 overflow-hidden" />;
};

export default Starfield;
