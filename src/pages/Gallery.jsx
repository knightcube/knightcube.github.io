import { useEffect } from "react";

const personalPhotos = [
  "/images/personal/DSC_3993.jpg",
  "/images/personal/DSC_7442.JPG",
  "/images/personal/IMG_20181103_183229.jpg",
  "/images/personal/IMG_20190119_184143.jpg",
  "/images/personal/IMG_20190507_085900.jpg",
  "/images/personal/IMG_20190509_213611.jpg",
  "/images/personal/IMG_9289.jpg",
  "/images/personal/IMG_9312.jpg",
  "/images/personal/Mask groupRajat.png",
  "/images/personal/Photo Burst.gif",
  "/images/personal/Profil_Pic_Round4_flipped.png",
  "/images/personal/image.png"
];

export default function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full z-10 relative">
      
      {/* Background Grid Overlay */}
      <div className="grid-bg pointer-events-none"></div>

      <div className="max-w-4xl mx-auto mb-24 text-center">
        <h1 className="font-display text-[40px] md:text-[56px] lg:text-[72px] text-on-surface mb-6 leading-tight tracking-tight">
          Beyond the <span className="text-primary-container text-glow">Code.</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed opacity-80">
          When I'm not designing systems or building immersive digital experiences, I'm out exploring the world, capturing moments, and finding inspiration in the everyday.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {personalPhotos.map((photo, index) => (
          <div key={index} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-surface-container border border-outline-variant/10">
            <div className="absolute inset-0 bg-primary-container/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
            <img 
              src={photo} 
              alt={`Personal capture ${index + 1}`} 
              loading="lazy"
              className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
