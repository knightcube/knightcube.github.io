import { useParams, Link } from 'react-router-dom';
import { featuredMasterclass, courses, digitalProducts } from '../data/shop';

export default function Checkout() {
  const { productId } = useParams();

  // Find the product across all arrays
  let product = null;
  if (featuredMasterclass.id === productId) product = featuredMasterclass;
  if (!product) product = courses.find(c => c.id === productId);
  if (!product) product = digitalProducts.find(dp => dp.id === productId);

  if (!product) {
    return (
      <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full z-10 relative">
        <h1 className="font-display text-display text-on-surface">Product Not Found</h1>
        <Link to="/shop" className="text-primary-container hover:underline mt-4 inline-block">Return to Shop</Link>
      </main>
    );
  }

  // Use currentPrice if available, else price
  const priceToDisplay = product.currentPrice || product.price;

  return (
    <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full z-10 relative">
      <div className="mb-12">
        <Link to="/shop" className="text-on-surface-variant hover:text-primary-container flex items-center gap-2 transition-colors mb-6">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span> Back to Shop
        </Link>
        <h1 className="font-display text-display text-on-surface">Secure Checkout</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Complete your purchase for instant access.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Checkout Form - Razorpay Mockup */}
        <div className="lg:col-span-7 bg-surface border border-[#262626] rounded-lg p-8">
          <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2 mb-6">
             <span className="material-symbols-outlined text-[24px]">lock</span> Payment Details (Razorpay)
          </h2>
          
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Email Address</label>
              <input type="email" id="email" placeholder="you@example.com" className="bg-[#121212] border border-[#333] rounded px-4 py-3 text-on-surface font-body-md focus:border-primary-container focus:outline-none transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Full Name</label>
              <input type="text" id="name" placeholder="John Doe" className="bg-[#121212] border border-[#333] rounded px-4 py-3 text-on-surface font-body-md focus:border-primary-container focus:outline-none transition-colors" />
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded border border-[#333] mt-4 flex flex-col items-center justify-center gap-4">
               <span className="material-symbols-outlined text-[48px] text-[#4d4d4d]">credit_score</span>
               <p className="text-on-surface-variant text-center text-body-md">This is a mock checkout.<br/>Integration with Razorpay will appear here.</p>
               <button type="button" className="bg-primary-container text-[#050505] font-label-md text-label-md px-8 py-3 rounded hover:bg-surface-tint transition-colors duration-200 mt-2">
                 Pay {priceToDisplay} with Razorpay
               </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-surface border border-[#262626] rounded-lg p-8 sticky top-32">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-[#262626] pb-4">Order Summary</h2>
            
            <div className="flex gap-4 mb-6">
              {product.image ? (
                <div className="w-24 h-24 rounded overflow-hidden bg-surface-container flex-shrink-0">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover opacity-80" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded bg-surface-container flex items-center justify-center flex-shrink-0 border border-[#333]">
                  <span className="material-symbols-outlined text-[32px] text-on-surface-variant">{product.icon || 'inventory_2'}</span>
                </div>
              )}
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{product.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">{product.description}</p>
              </div>
            </div>

            <div className="space-y-4 border-t border-[#262626] pt-6 mb-6">
              <div className="flex justify-between items-center text-on-surface-variant font-body-md">
                <span>Subtotal</span>
                <span>{priceToDisplay}</span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-body-md">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-[#262626] pt-6">
              <span className="font-headline-md text-headline-md text-on-surface">Total</span>
              <span className="font-display text-[32px] text-primary-container">{priceToDisplay}</span>
            </div>
            
            <p className="text-center text-body-sm text-on-surface-variant mt-6 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px]">lock</span> Secure 256-bit SSL encryption.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
