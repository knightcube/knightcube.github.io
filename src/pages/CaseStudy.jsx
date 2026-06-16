import { useParams, Link } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';

export default function CaseStudy() {
  const { id } = useParams();
  const project = caseStudies[id];

  if (!project) {
    return (
      <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop text-center">
        <h1 className="font-display text-display text-on-surface">System Not Found</h1>
        <Link to="/projects" className="text-primary-container mt-4 inline-block hover:underline">Return to Database</Link>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col gap-16 z-10 relative">
      
      {/* Hero Header */}
      <header className="flex flex-col gap-6 md:gap-8 max-w-4xl">
        <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
          <Link to="/projects" className="hover:text-primary-container transition-colors">Projects</Link>
          {project.breadcrumb && (
            <>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-on-surface">{project.breadcrumb}</span>
            </>
          )}
        </div>
        
        <h1 className="font-display text-display text-on-surface tracking-tight">
          {project.title}
        </h1>
        
        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-6 font-label-md text-label-md border-t border-b border-surface-container-high py-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant">Role:</span>
            <span className="text-on-surface font-semibold">{project.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant">Timeline:</span>
            <span className="text-on-surface font-semibold">{project.timeline}</span>
          </div>
          {project.status && (
            <div className="flex items-center gap-2">
              <span className="text-on-surface-variant">Status:</span>
              <div className="flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full border border-surface-container-high">
                <span className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,209,255,0.5)] animate-pulse"></span>
                <span className="text-primary-container">{project.status}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Image Canvas - Only render if an image exists */}
      {project.heroImage && (
        <section className="w-full aspect-[21/9] md:aspect-[16/6] rounded-xl overflow-hidden border border-surface-container-high relative  z-0 group">
          <img 
            alt={project.title} 
            src={project.heroImage} 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-80 group-hover:mix-blend-normal transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent z-10"></div>
        </section>
      )}

      {/* The Story */}
      <section className="max-w-3xl mx-auto flex flex-col gap-6 py-8">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">The Story</h2>
        {project.story.map((paragraph, index) => (
          <p key={index} className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {paragraph}
          </p>
        ))}
      </section>

      {/* Problem & Solution Split Card (unchanged) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-surface-container-high rounded-xl overflow-hidden border border-surface-container-high">
        {/* ... Keep your existing Problem and Solution markup exactly as it was ... */}
        <div className="bg-surface-container-low p-8 md:p-12 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ffb4ab]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Problem</h3>
          </div>
          <div className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-4">
            <p>{project.problem.text}</p>
            <ul className="flex flex-col gap-3 mt-2">
              {project.problem.points.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-outline text-[18px] mt-1">close</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-surface p-8 md:p-12 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-center gap-3 relative z-10">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Solution</h3>
          </div>
          <div className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-4 relative z-10">
            <p>{project.solution.text}</p>
            <ul className="flex flex-col gap-3 mt-2">
              {project.solution.points.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[18px] mt-1">done</span>
                  <span className="text-on-surface">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Architecture - Only render if architecture data exists */}
      {project.architecture && project.architecture.length > 0 && (
        <section className="flex flex-col gap-8 py-8">
          <h2 className="font-headline-lg text-headline-lg text-on-surface border-b border-surface-container-high pb-4">Technical Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.architecture.map((item, index) => (
              <div key={index} className="bg-surface border border-outline-variant/30 rounded-xl p-8 hover:border-primary-container/50 transition-colors duration-300 flex flex-col gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant/20 group-hover:bg-primary-container/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface group-hover:text-primary-container">{item.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-2">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}