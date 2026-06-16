import ProjectCard from '../components/ProjectCard';
import { graphicsData } from '../data/graphicsDesignWork';

export default function GraphicsWork() {
  return (
    <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col z-10">
      <header className="mb-16 md:mb-24 max-w-3xl">
        <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-[0.3em] mb-4 block">Pillar IV</span>
        <h1 className="font-display text-[48px] md:text-[64px] text-on-surface mb-6 leading-tight tracking-tight">Graphic Design</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant border-l-2 border-primary-container pl-6 leading-relaxed">
          High-contrast visual assets, LinkedIn carousels, and digital branding engineered for maximum clarity and audience retention.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {graphicsData.map((item) => (
          <ProjectCard 
            key={item.id}
            title={item.title}
            tags={item.tags}
            description={item.description}
            media={item.media}
            link={item.link}
            ctaText={item.ctaText}
          />
        ))}
      </div>
    </main>
  );
}