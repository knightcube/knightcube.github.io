export default function ExperimentalCard({ item }) {
  const isLandscape = item.type === 'Landscape';
  
  // Helper to determine media type
  const isYouTube = item.media.includes('youtube.com/embed');
  const isVideo = item.media.endsWith('.mp4');

  return (
    <div className={`group relative bg-surface border border-outline-variant/30 rounded-xl overflow-hidden ${isLandscape ? 'md:col-span-full' : ''}`}>
      
      {/* Dynamic Media Handler */}
      <div className={`relative overflow-hidden bg-surface-container-lowest ${isLandscape ? 'aspect-[21/9]' : 'aspect-[3/4]'}`}>
        
        {isYouTube ? (
          // Renders YouTube Embeds
          <iframe 
            src={item.media}
            title={item.title}
            className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : isVideo ? (
          // Renders local or direct .mp4 files
          <video 
            src={item.media} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" 
          />
        ) : (
          // Fallback for standard images/GIFs
          <img 
            src={item.media} 
            alt={item.title}
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" 
          />
        )}
      </div>

      {/* Details */}
      <div className="p-6">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2 group-hover:text-primary-container transition-colors">{item.title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">{item.description}</p>
        <button className="flex items-center gap-2 text-primary-container font-label-md hover:translate-x-1 transition-transform">
          Inspect Code <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}