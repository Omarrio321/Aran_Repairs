
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RepairFlow } from './components/RepairFlow';
import { RefurbishedPage } from './components/RefurbishedPage';
import { AccessoriesPage } from './components/AccessoriesPage';
import { ContactPage } from './components/ContactPage';
import { EnvironmentPage } from './components/EnvironmentPage';
import { AboutPage } from './components/AboutPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ShieldCheck, Clock, Award, Star, Smartphone, Tablet, Laptop, Watch, Gamepad2 } from 'lucide-react';
import { Card } from './components/ui';
import { CATEGORIES } from './data';
import { DeviceCategory } from './types';
import { CartProvider } from './contexts/CartContext';

const Features = () => (
  <section className="py-12 bg-white border-y border-slate-100">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: ShieldCheck, title: "12 Months Warranty", text: "On all our repairs and parts" },
          { icon: Clock, title: "30-min Service", text: "Most repairs done while you wait" },
          { icon: Award, title: "Original Parts", text: "We use high quality original parts" },
          { icon: Star, title: "Expert Technicians", text: "Certified and experienced staff" },
        ].map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center p-4">
             <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-4">
               <f.icon className="h-6 w-6" />
             </div>
             <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
             <p className="text-sm text-slate-500">{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const IconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="h-8 w-8" />,
  Tablet: <Tablet className="h-8 w-8" />,
  Laptop: <Laptop className="h-8 w-8" />,
  Watch: <Watch className="h-8 w-8" />,
  Gamepad2: <Gamepad2 className="h-8 w-8" />,
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedCategoryForRepair, setSelectedCategoryForRepair] = useState<DeviceCategory | null>(null);

  const handleCategorySelect = (category: DeviceCategory) => {
    setSelectedCategoryForRepair(category);
    setActivePage('repairs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
               <div className="absolute inset-0 bg-primary-900/10 z-0"></div>
               <div className="container mx-auto px-4 relative z-10 text-center">
                 <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                   Your Device, <span className="text-primary-500">Fixed Fast.</span>
                 </h1>
                 <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                   Professional repair service for smartphones, tablets, laptops, and more. 
                   Select your device below to get started.
                 </p>
               </div>
            </div>

            {/* Quick Category Selection */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">
              <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 md:p-10 mb-16">
                 <div className="text-center mb-8">
                   <h2 className="text-2xl font-bold mb-2">What device needs repair?</h2>
                   <p className="text-slate-500">Select your device type for an instant quote</p>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {CATEGORIES.map((cat) => (
                      <Card 
                        key={cat.id} 
                        onClick={() => handleCategorySelect(cat)}
                        className="cursor-pointer hover:border-primary-500 hover:shadow-md transition-all group text-center py-8"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="p-4 rounded-full bg-slate-50 text-slate-600 group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">
                            {IconMap[cat.iconName]}
                          </div>
                          <span className="font-semibold text-slate-800">{cat.name}</span>
                        </div>
                      </Card>
                    ))}
                 </div>
              </div>
            </div>
            <Features />
          </>
        );
      case 'repairs':
        return (
          <div className="container mx-auto px-4 py-8">
             <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 md:p-10">
               <RepairFlow initialCategory={selectedCategoryForRepair} />
             </div>
          </div>
        );
      case 'refurbished':
        return <RefurbishedPage />;
      case 'accessories':
        return <AccessoriesPage />;
      case 'contact':
        return <ContactPage />;
      case 'recycle':
      case 'business': // Keeping business case as fallback redirect
        return <EnvironmentPage />;
      case 'about':
        return <AboutPage />;
      case 'checkout':
        return <CheckoutPage />;
      default:
        return null;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        <Header activePage={activePage} onNavigate={(page) => {
          if (page === 'repairs') setSelectedCategoryForRepair(null); // Reset when clicking header link
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
        
        <main className="flex-grow">
          {renderContent()}
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
