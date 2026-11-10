import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import ClothWarp from '../components/ClothWarp';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-x-clip">
      {/* Nav — 不参与布料形变 */}
      <FadeIn delay={0} duration={0.8}>
        <nav className="flex items-center justify-between px-6 py-6 sm:px-10 md:px-16">
          <span className="text-sm uppercase tracking-wider text-[#D7E2EA] font-light">
            Portfolio
          </span>
          <div className="flex items-center gap-6 sm:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-base"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      {/* Portrait — 不参与布料形变 */}
      <FadeIn delay={0.6} y={30} className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
        <img
          src="/images/5.png"
          alt="portrait"
          loading="lazy"
          className="h-[42vh] w-auto rounded-2xl object-cover object-top opacity-90 sm:h-[52vh]"
        />
      </FadeIn>

      {/* 大标题 — 直接渲染，不用 FadeIn 包裹（motion transform 与 SVG filter 叠加导致重影） */}
      <div className="relative z-10 px-2 pointer-events-none" style={{ marginTop: 'clamp(-120px, -15vh, -40px)' }}>
        <ClothWarp>
          <h1 className="text-center text-[14vw] font-black uppercase leading-[1.50] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]" style={{ color: '#BBCCD7' }}>
            葡萄成熟时
          </h1>
        </ClothWarp>
      </div>

      {/* Bottom row — 不参与布料形变 */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 pb-8 sm:px-10 md:px-16">
        <FadeIn delay={0.35} y={20}>
          <p className="text-xs font-light uppercase tracking-wider text-[#D7E2EA] sm:text-sm">
            Creative Developer · Designer·Qing
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
