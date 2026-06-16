import { Link } from 'react-router-dom';

export default function ToolkitCard({ item }) {
  return (
    <div className="flex flex-col bg-surface border border-[#262626] rounded-lg overflow-hidden group hover:bg-[#161616] transition-colors duration-300">
      
      {/* Media Canvas */}
      <div className="h-48 bg-surface-container relative overflow-hidden flex items-center justify-center">
        {item.image ? (
          <>
            <div 
              className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500" 
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3c494e 1px, transparent 0)', backgroundSize: '24px 24px' }}
            ></div>
            <img 
              alt={item.title} 
              src={item.image} 
              className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-50 group-hover:scale-105 transition-transform duration-700" 
            />
          </>
        ) : (
          <>
            {/* Abstract Code/Database representation */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e] to-[#1a1a1a]"></div>
            <div className="absolute w-full h-px bg-primary-container/20 top-1/4 shadow-[0_0_10px_rgba(0,209,255,0.5)]"></div>
            <div className="absolute w-full h-px bg-primary-container/20 top-2/4 shadow-[0_0_10px_rgba(0,209,255,0.5)]"></div>
            <div className="absolute w-full h-px bg-primary-container/20 top-3/4 shadow-[0_0_10px_rgba(0,209,255,0.5)]"></div>
            <span className="material-symbols-outlined text-[64px] text-primary-container/40 z-10 relative group-hover:text-primary-container/80 transition-colors duration-500 group-hover:scale-110">
              {item.icon}
            </span>
          </>
        )}
        <div className="absolute top-4 left-4 bg-[#262626] text-on-surface font-label-sm text-label-sm px-2 py-1 rounded uppercase tracking-wider">
          {item.tech}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{item.title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">{item.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]">
          <span className="font-headline-md text-headline-md text-on-surface">{item.price}</span>
          <Link to={item.link} className="bg-transparent border border-[#262626] text-on-surface hover:border-primary-container hover:text-primary-container font-label-md text-label-md px-6 py-2 rounded transition-all duration-200">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}