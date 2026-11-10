import { useEffect, useRef } from 'react';

// Use generated timeline images, cycling through 18 images
const allImages: string[] = Array.from({ length: 18 }, (_, i) => `/images/${i + 1}.png`);
const row1Seeds: string[] = allImages.slice(0, 11);
const row2Seeds: string[] = allImages.slice(11).concat(allImages.slice(0, 3));

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const offset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${offset - 200}px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${-(offset - 200)}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // triple the array for seamless loop
  const row1Items = [...row1Seeds, ...row1Seeds, ...row1Seeds];
  const row2Items = [...row2Seeds, ...row2Seeds, ...row2Seeds];

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden py-16"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: translateX(offset - 200) -> moves right */}
        <div ref={row1Ref} className="flex w-max gap-3 will-change-transform">
          {row1Items.map((img, i) => (
            <img
              key={`r1-${i}`}
              src={img}
              alt=""
              loading="lazy"
              className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
            />
          ))}
        </div>

        {/* Row 2: translateX(-(offset - 200)) -> moves left */}
        <div ref={row2Ref} className="flex w-max gap-3 will-change-transform">
          {row2Items.map((img, i) => (
            <img
              key={`r2-${i}`}
              src={img}
              alt=""
              loading="lazy"
              className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
