import ProjectCard from '../components/ProjectCard';
import ExperimentalCard from '../components/ExperimentalCard';
import { projectsData } from '../data/softwareWork';
import { arVrData } from '../data/arvrWork';
import { mediaVault } from '../data/animationWork';

export default function Projects() {
  // Filter out any AR/VR items that might have accidentally stayed in the projects array
  const productionSystems = projectsData.filter(project => project.category !== 'AR/VR');

  return (
    <main className="flex-grow pt-32 pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col z-10">
      
      {/* Grand Header */}
      <header className="mb-24 md:mb-32 max-w-3xl">
        <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-[0.3em] mb-4 block">The Complete Archive</span>
        <h1 className="font-display text-[48px] md:text-[64px] text-on-surface mb-6 leading-tight tracking-tight">Work.</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant border-l-2 border-primary-container pl-6 leading-relaxed">
          A curated exhibition of my multi-disciplinary ecosystem. Spanning robust codebases, AR/VR experiences and 3D animations.
        </p>
      </header>

      {/* PILLAR I: Production Systems */}
      <section className="mb-32 scroll-mt-24" id="production-systems">
        <div className="flex items-center gap-4 mb-12 border-b border-surface-container-high pb-6">
          <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>terminal</span>
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Coding</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Web applications, AI tools, and architectural boilerplates.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {productionSystems.map((project) => (
            <ProjectCard 
              key={project.id}
              title={project.title}
              tags={project.tags}
              description={project.description}
              media={project.media}
              link={project.link}
              ctaText={project.ctaText}
            />
          ))}
        </div>
      </section>

      {/* PILLAR II: Spatial Computing */}
      <section className="mb-32 scroll-mt-24" id="spatial-computing">
        <div className="flex items-center gap-4 mb-12 border-b border-surface-container-high pb-6">
          <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>view_in_ar</span>
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Spatial Computing</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">AR/VR prototypes, geometric mapping, and hardware SDK integrations.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Featured Landscape Card */}
          {arVrData.featured && (
            <ExperimentalCard item={arVrData.featured} />
          )}
          
          {/* Gallery Portrait Cards */}
          {arVrData.items.map(item => (
            <ExperimentalCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* PILLAR III: Media & Motion */}
      <section className="scroll-mt-24" id="media-motion">
        <div className="flex items-center gap-4 mb-12 border-b border-surface-container-high pb-6">
          <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>play_circle</span>
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Media & Motion</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">3D animation, visual storytelling, and high-end brand assets.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
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
      </section>

    </main>
  );
}