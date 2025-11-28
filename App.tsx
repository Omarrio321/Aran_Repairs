import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RepairFlow } from './components/RepairFlow';
import { RefurbishedPage } from './components/RefurbishedPage';
import { AccessoriesPage } from './components/AccessoriesPage';
import { ContactPage } from './components/ContactPage';
import { EnvironmentPage } from './components/EnvironmentPage';
import { AboutPage } from './components/AboutPage';
import { ShieldCheck, Clock, Award, Star } from 'lucide-react';

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

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');

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

            {/* Main Wizard Area */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">
              <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 md:p-10 mb-16">
                <RepairFlow />
              </div>
            </div>
            <Features />
          </>
        );
      case 'refurbished':
        return <RefurbishedPage />;
      case 'accessories':
        return <AccessoriesPage />;
      case 'contact':
        return <ContactPage />;
      case 'recycle':
      case 'business': // Keeping business case as fallback redirect for old links if any
        return <EnvironmentPage />;
      case 'about':
        return <AboutPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Header activePage={activePage} onNavigate={setActivePage} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default App;