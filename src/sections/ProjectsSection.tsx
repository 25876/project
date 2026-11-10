import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';

interface Project {
  num: string;
  name: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const projects: Project[] = [
  { num: '01', name: '前端学习之路', col1Img1: '/images/1.png', col1Img2: '/images/3.png', col2Img: '/images/6.png' },
  { num: '02', name: '实践与成长', col1Img1: '/images/10.png', col1Img2: '/images/11.png', col2Img: '/images/18.png' },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, total }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="h-[85vh]">
      <motion.div
        style={{ scale, ['--i' as string]: index }}
        className="sticky top-[calc(6rem+var(--i)*28px)] flex h-[70vh] w-[92%] max-w-5xl flex-col rounded-3xl border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 md:top-[calc(8rem+var(--i)*28px)] sm:p-10"
      >
        {/* Top row: big number + project name */}
        <div className="mb-6 flex items-baseline justify-between">
          <span className="hero-heading text-6xl font-black sm:text-7xl">
            {project.num}
          </span>
          <h3 className="text-2xl font-medium text-[#D7E2EA] sm:text-3xl">
            {project.name}
          </h3>
        </div>

        {/* Bottom image grid: left 40% (2 stacked), right 60% (1 tall) */}
        <div className="flex flex-1 gap-4 overflow-hidden">
          <div className="flex w-[40%] flex-col gap-4">
            <img
              src={project.col1Img1}
              alt=""
              loading="lazy"
              className="h-1/2 w-full rounded-2xl object-cover"
            />
            <img
              src={project.col1Img2}
              alt=""
              loading="lazy"
              className="h-1/2 w-full rounded-2xl object-cover"
            />
          </div>
          <div className="w-[60%]">
            <img
              src={project.col2Img}
              alt=""
              loading="lazy"
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[2rem] pt-24 pb-10 md:rounded-t-[3rem]"
    >
      <div className="mb-16 px-6">
        <FadeIn>
          <h2
            className="hero-heading text-center font-bold"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Project
          </h2>
        </FadeIn>
      </div>

      <div className="flex flex-col items-center">
        {projects.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
