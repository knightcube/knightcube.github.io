import ExperimentalCard from '../components/ExperimentalCard';
import { arVrData } from '../data/arvrWork';

export default function ArVrWork() {
  return (
    <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col z-10">
      <header className="mb-16 md:mb-24 max-w-3xl">
        <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-[0.3em] mb-4 block">Pillar II</span>
        <h1 className="font-display text-[48px] md:text-[64px] text-on-surface mb-6 leading-tight tracking-tight">Augmented Reality & Virtual Reality</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant border-l-2 border-primary-container pl-6 leading-relaxed">
          AR/VR prototypes, geometric mapping, and hardware SDK integrations. Pushing interfaces beyond the 2D plane.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {/* Featured Landscape Item */}
        {arVrData.featured && (
          <ExperimentalCard item={arVrData.featured} />
        )}
        
        {/* Portrait Gallery Items */}
        {arVrData.items.map((item) => (
          <ExperimentalCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}