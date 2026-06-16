import { featuredMasterclass, digitalToolkits } from '../data/shop';
import ToolkitCard from '../components/ToolkitCard';
import { Link } from 'react-router-dom';

export default function Shop() {
  return (
    <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full z-10 relative">
      
      {/* Header Section */}
      <section className="mb-16 flex flex-col gap-4">
        <h1 className="font-display text-display text-on-surface">Equip the Future.</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Premium digital assets, systems, and masterclasses designed for the modern developer and designer. Build faster, design sharper.
        </p>
      </section>

      {/* Featured Product: Bento Style */}
      <section className="mb-gutter w-full">
        <h2 className="font-label-md text-label-md text-primary-container uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">star</span> Featured Masterclass
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#262626] bg-surface rounded-lg overflow-hidden relative group shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          
          {/* Image Area */}
          <div className="lg:col-span-7 relative h-64 lg:h-auto bg-surface-container overflow-hidden">
            <img 
              alt={featuredMasterclass.title} 
              src={featuredMasterclass.image} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 mix-blend-screen grayscale group-hover:grayscale-0" 
            />
            {/* Overlay gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface via-surface/80 to-transparent lg:w-1/2"></div>
          </div>
          
          {/* Content Area */}
          <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center z-10 bg-surface/50 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent">
            <div className="flex gap-2 mb-4">
              {featuredMasterclass.badges.map((badge, idx) => (
                <span key={idx} className="bg-[#262626] text-on-surface font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider">
                  {badge}
                </span>
              ))}
            </div>
            
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-4">
              {featuredMasterclass.title}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 line-clamp-3">
              {featuredMasterclass.description}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#262626]">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant line-through">{featuredMasterclass.originalPrice}</span>
                <span className="font-headline-md text-headline-md text-primary-container">{featuredMasterclass.currentPrice}</span>
              </div>
              <Link to={featuredMasterclass.link} className="bg-primary-container text-[#050505] hover:bg-surface-tint font-label-md text-label-md px-8 py-3 rounded transition-colors duration-200 flex items-center gap-2">
                Get Asset <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Assets Grid */}
      <section>
        <div className="flex items-center justify-between mb-8 mt-16 border-b border-[#262626] pb-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Digital Toolkits</h2>
          <Link to="#" className="text-on-surface-variant hover:text-primary-container font-label-md text-label-md flex items-center gap-1 transition-colors">
            View All <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {digitalToolkits.map((item) => (
            <ToolkitCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      
    </main>
  );
}