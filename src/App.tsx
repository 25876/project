import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import TimelineSection from './sections/TimelineSection';
import ProjectsSection from './sections/ProjectsSection';
import Starfield from './components/Starfield';
import InkBurst from './components/InkBurst';

function App() {
  return (
    <div className="outer-container relative z-0 bg-[#0C0C0C] font-kanit">
      {/* 全屏固定 3D 星云星空背景 */}
      <Starfield />

      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <TimelineSection />
      <ProjectsSection />

      {/* 鼠标点击霓虹墨水效果（浮在最上层，不挡交互） */}
      <InkBurst />
    </div>
  );
}

export default App;
