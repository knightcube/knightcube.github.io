import { Link } from 'react-router-dom';

// Added ctaText and liveLink to the destructured props
export default function ProjectCard({ title, tags, description, media, link, ctaText, liveLink }) {
  // Check if the link is external (starts with http) to conditionally render an <a> or a <Link>
  const isExternal = link ? link.startsWith('http') : false;
  
  // The button content remains identical
  const ButtonContent = (
    <>
      {/* Use the customized text, or default to "View System" if left blank */}
      <span>{ctaText || "View System"}</span>
      <span className="material-symbols-outlined ml-2 text-[18px] transform group-hover/link:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 0" }}>
        arrow_forward
      </span>
    </>
  );

  return (
    <article className="group relative bg-surface border border-outline-variant/30 rounded-lg overflow-hidden flex flex-col transition-all duration-500 hover:border-primary-container hover:-translate-y-1">
      <div className="absolute inset-0 bg-primary-container/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
      
      <div className="aspect-[4/3] bg-surface-container relative overflow-hidden">
        <img 
          alt={`${title} Interface`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal" 
          src={media}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent/10 z-0"></div>
      </div>
      
      <div className="p-6 md:p-8 flex-grow flex flex-col relative z-20 bg-surface">
        <div className="flex gap-2 mb-6 flex-wrap">
          {tags.map((tag, index) => (
            <span key={index} className="bg-surface-container-high px-3 py-1 rounded-full font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/20 tracking-wide uppercase">
              {tag}
            </span>
          ))}
        </div>
        
        <h2 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary-container transition-colors duration-300">
          {title}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-8">
          {description}
        </p>
        
        {/* Dynamic Routing based on internal vs external links */}
        <div className="mt-auto flex items-center gap-6">
          {link && (
            isExternal ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary-container font-label-md text-label-md tracking-wider uppercase group/link">
                {ButtonContent}
              </a>
            ) : (
              <Link to={link} className="flex items-center text-primary-container font-label-md text-label-md tracking-wider uppercase group/link">
                {ButtonContent}
              </Link>
            )
          )}

          {/* Optional Live Link */}
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-on-surface-variant hover:text-primary-container transition-colors font-label-md text-label-md tracking-wider uppercase group/live">
              <span>View Live</span>
              <span className="material-symbols-outlined ml-2 text-[18px] transform group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5 transition-transform" style={{ fontVariationSettings: "'FILL' 0" }}>
                open_in_new
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}