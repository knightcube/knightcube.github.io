import { useParams, Link } from 'react-router-dom';
import { featuredMasterclass, courses } from '../data/shop';

export default function CourseDetails() {
  const { productId } = useParams();

  // Find the product
  let product = null;
  if (featuredMasterclass.id === productId) product = featuredMasterclass;
  if (!product) product = courses.find(c => c.id === productId);

  if (!product) {
    return (
      <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full z-10 relative">
        <h1 className="font-display text-display text-on-surface">Course Not Found</h1>
        <Link to="/shop" className="text-primary-container hover:underline mt-4 inline-block">Return to Shop</Link>
      </main>
    );
  }

  const priceToDisplay = product.currentPrice || product.price;

  return (
    <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full z-10 relative">
      <Link to="/shop" className="text-on-surface-variant hover:text-primary-container flex items-center gap-2 transition-colors mb-8">
        <span className="material-symbols-outlined text-[20px]">arrow_back</span> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Course Info */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          <section>
            <div className="flex gap-2 mb-4">
              {product.badges && product.badges.map((badge, idx) => (
                <span key={idx} className="bg-[#262626] text-on-surface font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider">
                  {badge}
                </span>
              ))}
              {product.tech && (
                <span className="bg-[#262626] text-on-surface font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.tech}
                </span>
              )}
            </div>
            
            <h1 className="font-display text-display text-on-surface mb-6">{product.title}</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">{product.description}</p>
          </section>

          <section>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 border-b border-[#262626] pb-2">What You'll Learn</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.benefits && product.benefits.map((benefit, idx) => (
                <li key={idx} className="flex gap-3 text-on-surface-variant font-body-md">
                  <span className="material-symbols-outlined text-primary-container text-[20px] flex-shrink-0 mt-1">check_circle</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 border-b border-[#262626] pb-2">Course Curriculum</h2>
            <div className="flex flex-col gap-4">
              {product.curriculum && product.curriculum.map((item, idx) => (
                <div key={idx} className="bg-surface border border-[#262626] p-4 rounded-lg flex items-center justify-between group hover:border-[#404040] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1a1a1a] rounded flex items-center justify-center text-on-surface-variant font-label-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-on-surface">{item.title}</h4>
                      <p className="font-label-sm text-on-surface-variant mt-1">{item.module}</p>
                    </div>
                  </div>
                  <div className="text-on-surface-variant font-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> {item.duration}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Sticky Checkout Panel */}
        <div className="lg:col-span-4 relative">
          <div className="bg-surface border border-[#262626] rounded-lg overflow-hidden sticky top-32 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <div className="h-48 bg-surface-container relative">
              {product.image ? (
                <img src={product.image} alt={product.title} className="w-full h-full object-cover opacity-80" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[64px] text-on-surface-variant">{product.icon || 'inventory_2'}</span>
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            </div>

            <div className="p-8 relative z-10 -mt-8">
              <div className="mb-6 flex flex-col gap-1">
                {product.originalPrice && <span className="font-label-md text-label-md text-on-surface-variant line-through">{product.originalPrice}</span>}
                <span className="font-display text-[40px] text-primary-container leading-none">{priceToDisplay}</span>
              </div>
              
              <ul className="flex flex-col gap-3 mb-8 border-t border-[#262626] pt-6">
                <li className="flex items-center gap-2 text-on-surface-variant font-body-sm">
                  <span className="material-symbols-outlined text-[18px]">all_inclusive</span> Lifetime access
                </li>
                <li className="flex items-center gap-2 text-on-surface-variant font-body-sm">
                  <span className="material-symbols-outlined text-[18px]">update</span> Free updates
                </li>
                <li className="flex items-center gap-2 text-on-surface-variant font-body-sm">
                  <span className="material-symbols-outlined text-[18px]">forum</span> Private community access
                </li>
              </ul>

              <Link 
                to={`/checkout/${product.id}`} 
                className="bg-primary-container text-[#050505] hover:bg-surface-tint font-headline-md px-8 py-4 rounded transition-colors duration-200 flex items-center justify-center gap-2 w-full text-center"
              >
                Enroll Now <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
