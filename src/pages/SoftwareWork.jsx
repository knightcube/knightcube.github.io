import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/softwareWork';

export default function SoftwareWork() {
  return (
    <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col z-10">
      <header className="mb-16 md:mb-24 max-w-3xl">
        <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-[0.3em] mb-4 block">Pillar I</span>
        <h1 className="font-display text-[48px] md:text-[64px] text-on-surface mb-6 leading-tight tracking-tight">Coding</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant border-l-2 border-primary-container pl-6 leading-relaxed">
          Web applications, AI tools, and robust architectural boilerplates engineered for scale and speed.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {projectsData.map((project) => (
          <ProjectCard 
            key={project.id}
            title={project.title}
            tags={project.tags}
            description={project.description}
            media={project.media}
            link={project.link}
            liveLink={project.liveLink}
            ctaText={project.ctaText}
          />
        ))}
      </div>
    </main>
  );
}