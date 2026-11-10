import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <FadeIn>
        <h2
          className="hero-heading text-center font-bold"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
        >
          关于我的介绍
        </h2>
      </FadeIn>

      <div className="mt-14 flex flex-col items-center gap-10">
        <AnimatedText
          text="本人工作认真负责，有很强的执行力，能吃苦耐劳，沟通协调能力强，曾因团队人手不够，仍能自行完成网站的搭建工作，前后端的全栈式工作，并圆满完成整个网站的前端的页面布局策划，后端的编程设计，及后期维护工作，能快速适应新环境，能为团队创造更多价值。"
          className="max-w-[560px] text-center text-base font-light leading-relaxed text-[#D7E2EA] sm:text-lg"
        />
        <ContactButton />
      </div>
    </section>
  );
};

export default AboutSection;
