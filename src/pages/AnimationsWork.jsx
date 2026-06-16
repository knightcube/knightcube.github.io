import ProjectCard from '../components/ProjectCard';
import { mediaVault } from '../data/animationWork';

export default function AnimationsWork(){
  return (
    <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col z-10">
      <header className="mb-16 md:mb-24 max-w-3xl">
        <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-[0.3em] mb-4 block">Pillar III</span>
        <h1 className="font-display text-[48px] md:text-[64px] text-on-surface mb-6 leading-tight tracking-tight">3D Animations</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant border-l-2 border-primary-container pl-6 leading-relaxed">
          3D animation, visual storytelling, and high-end brand assets designed for maximum audience retention.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {mediaVault.map((media) => (
          <ProjectCard 
            key={media.id}
            title={media.title}
            tags={media.tags}
            description={media.description}
            media={media.media}
            link={media.link}
            ctaText={media.ctaText}
          />
        ))}
      </div>
    </main>
  );
}