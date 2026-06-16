import { arVrData } from '../data/experimental';
import ExperimentalCard from '../components/ExperimentalCard';

export default function Experimental() {
  return (
    <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <header className="border-l-2 border-primary-container pl-6 mb-16">
        <p className="font-label-md text-primary-container uppercase tracking-widest mb-2">Experiments</p>
        <h1 className="font-display text-display text-on-surface">3D Animations, AR/VR</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {/* Featured Landscape Item */}
        <ExperimentalCard item={arVrData.featured} />
        
        {/* Portrait Gallery Items */}
        {arVrData.items.map(item => (
          <ExperimentalCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}