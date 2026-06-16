import { Link } from 'react-router-dom';
import { projectsData } from '../data/softwareWork';
import { transmissionLogs } from '../data/logs';

export default function Home() {
  // Get the two most recent logs (assuming we can just sort and slice them like in Archives)
  const recentLogs = [...transmissionLogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  return (
    <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full z-10 relative">

      {/* Background Grid Overlay */}
      <div className="grid-bg pointer-events-none"></div>

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-32 md:mb-48 reveal-on-scroll mt-10">
        <div className="flex flex-col items-start">
          <p className="font-label-sm text-primary-container mb-6 uppercase tracking-[0.4em] flex items-center gap-4">
            <span className="w-8 h-[1px] bg-primary-container"></span>
            Developer & Designer
          </p>
          <h1 className="font-display text-[40px] md:text-[56px] lg:text-[72px] xl:text-[84px] text-on-surface mb-8 leading-[1.05] tracking-tight max-w-4xl">
            Building Software &<br />
            <span className="text-primary-container text-glow">Designing Experiences.</span>
          </h1>
          {/* <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl leading-relaxed opacity-80 border-l-2 border-surface-container-high pl-6">
            I am a software developer passionate about creating impactful digital experiences. I specialize in building scalable web applications, immersive AR/VR prototypes, and clean UI designs.
          </p> */}
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link to="/software" className="group inline-flex items-center justify-center px-8 py-4 bg-primary-container text-black font-label-md uppercase tracking-wider hover:bg-surface-tint transition-all duration-300 rounded-sm w-full sm:w-auto">
              View My Work
              <span className="material-symbols-outlined ml-3 transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 border border-outline-variant text-on-surface font-label-md uppercase tracking-wider hover:border-primary-container hover:text-primary-container transition-all duration-300 rounded-sm w-full sm:w-auto">
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Hero Image / GIF */}
        <div className="hidden lg:flex justify-end items-center relative pl-8">
          <div className="absolute inset-0 bg-primary-container/10 blur-[80px] rounded-full transform translate-x-12 translate-y-12"></div>
          <img
            src="/images/personal/Photo Burst.gif"
            alt="Rajat Kumar Gupta"
            className="w-[85%] h-auto rounded-3xl border border-outline-variant/10 relative z-10 opacity-90 shadow-[0_0_40px_rgba(0,0,0,0.5)] transform hover:rotate-1 hover:scale-[1.02] transition-all duration-500 object-cover"
          />
        </div>
      </section>

      {/* Live Transmissions Section */}
      <section className="mb-16 reveal-on-scroll">
        <div className="flex justify-between items-end mb-8 border-b border-surface-container-high pb-4">
          <h2 className="font-label-md text-on-surface-variant uppercase tracking-[0.3em]">Latest Updates</h2>
          <Link to="/archives" className="text-primary-container font-label-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
            View Archives
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentLogs.map(log => (
            <a href={log.link} key={`${log.id}-${log.date}`} className="bento-card p-8 rounded-xl group flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start mb-4">
                <span className="font-label-sm text-primary-container uppercase tracking-widest border border-primary-container/30 px-3 py-1 rounded-full bg-primary-container/5">{log.type}</span>
                <span className="font-label-sm text-on-surface-variant opacity-60">{log.date}</span>
              </div>
              <h3 className="font-headline-md text-on-surface group-hover:text-primary-container transition-colors line-clamp-2 pr-8 relative">
                {log.title}
                <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">
                  arrow_forward
                </span>
              </h3>
            </a>
          ))}
        </div>
      </section>

      {/* Bento-Box Showcase */}
      <section className="mb-24 reveal-on-scroll">
        <div className="flex justify-between items-end mb-8 border-b border-surface-container-high pb-4">
          <h2 className="font-label-md text-on-surface-variant uppercase tracking-[0.3em]">Featured Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 auto-rows-[280px]">

          {/* Main Software Block */}
          <Link to="/software" className="bento-card col-span-1 md:col-span-4 lg:col-span-6 row-span-2 relative overflow-hidden group rounded-xl p-8 flex flex-col justify-end">
            <img src={projectsData[0].media} alt={projectsData[0].title} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
            <div className="relative z-10">
              <span className="font-label-sm uppercase tracking-widest text-primary-container mb-3 block border-l-2 border-primary-container pl-3">Featured Project</span>
              <h3 className="font-display text-[32px] md:text-[40px] text-on-surface mb-3 leading-tight">{projectsData[0].title}</h3>
              <p className="font-body-md text-on-surface-variant line-clamp-2 max-w-md opacity-80">{projectsData[0].description}</p>
            </div>
          </Link>

          {/* Bio / Motivation Block */}
          <div className="bento-card col-span-1 md:col-span-4 lg:col-span-6 row-span-1 rounded-xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full blur-3xl group-hover:bg-primary-container/10 transition-colors"></div>
            <span className="font-label-sm uppercase tracking-widest text-on-surface-variant mb-4 block">About Me</span>
            <p className="font-body-lg text-on-surface leading-relaxed max-w-lg">
              I love combining logic and creativity to solve problems. Whether I'm writing complex backend code or designing 3D prototypes, my goal is always to deliver value and a great user experience.
            </p>
          </div>

          {/* AR/VR Block */}
          <Link to="/ar-vr" className="bento-card col-span-1 md:col-span-2 lg:col-span-3 row-span-1 relative overflow-hidden group rounded-xl p-8 flex flex-col justify-between">
            <div className="flex justify-end">
              <span className="material-symbols-outlined text-[32px] text-on-surface-variant opacity-40 group-hover:opacity-100 group-hover:text-primary-container transition-all">view_in_ar</span>
            </div>
            <div className="relative z-10 mt-auto">
              <h3 className="font-headline-md text-on-surface mb-1">AR/VR</h3>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Spatial Computing</p>
            </div>
          </Link>

          {/* Life / Photos Block */}
          <Link to="/gallery" className="bento-card col-span-1 md:col-span-2 lg:col-span-3 row-span-1 relative overflow-hidden group rounded-xl p-0 flex flex-col justify-center items-center">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
              <img src="/images/personal/DSC_3993.jpg" className="w-full h-full object-cover rounded-tl-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" alt="Life 1" />
              <img src="/images/personal/IMG_20190507_085900.jpg" className="w-full h-full object-cover rounded-tr-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" alt="Life 2" />
              <img src="/images/personal/IMG_20181103_183229.jpg" className="w-full h-full object-cover rounded-bl-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" alt="Life 3" />
              <img src="/images/personal/DSC_7442.JPG" className="w-full h-full object-cover rounded-br-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" alt="Life 4" />
            </div>
            <div className="absolute inset-0 bg-surface/60 group-hover:bg-surface/20 transition-colors duration-500 z-10 flex items-center justify-center backdrop-blur-[1px] group-hover:backdrop-blur-none pointer-events-none">
              <div className="bg-surface/90 px-6 py-3 rounded-full border border-outline-variant/20 flex items-center gap-2 transform group-hover:scale-105 transition-transform duration-300">
                <span className="font-label-md text-on-surface uppercase tracking-widest">Life</span>
                <span className="material-symbols-outlined text-[18px] text-primary-container">arrow_forward</span>
              </div>
            </div>
          </Link>

        </div>
      </section>

    </main>
  );
}