
import React, { useState, useEffect } from 'react';
import { Wrench, Phone, Mail, Menu, X, Recycle, ShoppingCart } from 'lucide-react';
import { Button } from './ui';
import { cn } from './ui';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const LiveStatus = () => {
  const [status, setStatus] = useState({ isOpen: false, message: 'Checking...' });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0-6 Sun-Sat
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const time = hours + minutes / 60;

      let isOpen = false;
      let message = "Closed";

      if (day === 0) { // Sunday
         message = "Closed (Sunday)";
         isOpen = false;
      } else if (day === 6) { // Saturday 10-17
         if (time >= 10 && time < 17) {
           isOpen = true;
           message = "Open until 17:00";
         } else {
           isOpen = false;
           message = time < 10 ? "Opens at 10:00" : "Closed";
         }
      } else if (day === 1) { // Monday 13-18
         if (time >= 13 && time < 18) {
           isOpen = true;
           message = "Open until 18:00";
         } else {
           isOpen = false;
           message = time < 13 ? "Opens at 13:00" : "Closed";
         }
      } else if (day === 5) { // Friday 10-13, 14-18
         if ((time >= 10 && time < 13) || (time >= 14 && time < 18)) {
           isOpen = true;
           message = time < 13 ? "Open until 13:00 (Lunch)" : "Open until 18:00";
         } else if (time >= 13 && time < 14) {
           isOpen = false;
           message = "Lunch Break (Reopens 14:00)";
         } else {
           isOpen = false;
           message = time < 10 ? "Opens at 10:00" : "Closed";
         }
      } else { // Tue, Wed, Thu 10-18
         if (time >= 10 && time < 18) {
           isOpen = true;
           message = "Open until 18:00";
         } else {
           isOpen = false;
           message = time < 10 ? "Opens at 10:00" : "Closed";
         }
      }
      setStatus({ isOpen, message });
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className={cn("h-2.5 w-2.5 rounded-full animate-pulse", status.isOpen ? "bg-green-500" : "bg-red-500")} />
      <span>{status.message}</span>
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const linkClass = (page: string) => cn(
    "cursor-pointer transition-colors",
    activePage === page ? "text-primary-600 font-semibold" : "hover:text-primary-600"
  );

  const mobileLinkClass = (page: string) => cn(
    "block w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors",
    activePage === page ? "text-primary-600 font-semibold bg-primary-50/50" : "text-slate-600"
  );

  const handleMobileNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Top Bar - Contact Info */}
      <div className="bg-slate-900 text-slate-300 py-2 text-xs md:text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
           <div className="flex items-center gap-4">
             <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
               <Phone className="h-3 w-3" /> +31 6 19469292
             </span>
             <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
               <Mail className="h-3 w-3" /> info@aranrepairs.nl
             </span>
           </div>
           <div className="hidden md:block font-medium">
             <LiveStatus />
           </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 font-bold text-2xl text-slate-900 tracking-tight cursor-pointer"
          onClick={() => handleMobileNavigate('home')}
        >
          <div className="bg-primary-500 text-slate-900 p-1.5 rounded-lg">
             <Wrench className="h-5 w-5" />
          </div>
          <span>Aran<span className="text-primary-600">Repairs</span></span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button onClick={() => onNavigate('home')} className={linkClass('home')}>Home</button>
          <button onClick={() => onNavigate('repairs')} className={linkClass('repairs')}>Repairs</button>
          <button onClick={() => onNavigate('refurbished')} className={linkClass('refurbished')}>Refurbished Phones</button>
          <button onClick={() => onNavigate('accessories')} className={linkClass('accessories')}>Accessories</button>
          <button onClick={() => onNavigate('recycle')} className={cn(linkClass('recycle'), "flex items-center gap-1")}>
            <Recycle className="h-4 w-4" /> Recycle
          </button>
          <button onClick={() => onNavigate('contact')} className={linkClass('contact')}>Contact</button>
          
          <div className="flex items-center gap-4 ml-2">
            <button 
              onClick={() => onNavigate('checkout')} 
              className={cn("relative p-2 rounded-full hover:bg-slate-100 transition-colors", activePage === 'checkout' ? 'text-primary-600' : 'text-slate-600')}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                  {itemCount}
                </span>
              )}
            </button>
            <Button size="sm" onClick={() => onNavigate('repairs')}>Book Appointment</Button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => handleMobileNavigate('checkout')} 
            className="relative p-2 text-slate-600"
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                {itemCount}
              </span>
            )}
          </button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 absolute top-full left-0 right-0 shadow-lg animate-in slide-in-from-top-5 duration-200 h-[calc(100vh-64px)] overflow-y-auto">
           <nav className="flex flex-col text-sm font-medium">
              <button onClick={() => handleMobileNavigate('home')} className={mobileLinkClass('home')}>Home</button>
              <button onClick={() => handleMobileNavigate('repairs')} className={mobileLinkClass('repairs')}>Repairs</button>
              <button onClick={() => handleMobileNavigate('refurbished')} className={mobileLinkClass('refurbished')}>Refurbished Phones</button>
              <button onClick={() => handleMobileNavigate('accessories')} className={mobileLinkClass('accessories')}>Accessories</button>
              
              <button onClick={() => handleMobileNavigate('contact')} className={mobileLinkClass('contact')}>Contact</button>
              <button onClick={() => handleMobileNavigate('about')} className={mobileLinkClass('about')}>About Us</button>
              <button onClick={() => handleMobileNavigate('recycle')} className={mobileLinkClass('recycle')}>Recycle Program</button>
              
              <button 
                 onClick={() => handleMobileNavigate('checkout')} 
                 className={cn(mobileLinkClass('checkout'), "flex items-center justify-between")}
              >
                <span>Shopping Cart</span>
                {itemCount > 0 && <span className="bg-primary-500 text-slate-900 px-2 py-0.5 rounded-full text-xs font-bold">{itemCount} items</span>}
              </button>

              <div className="p-4">
                <Button className="w-full h-12 text-base" onClick={() => handleMobileNavigate('repairs')}>Book Appointment</Button>
              </div>
              
              {/* Mobile Contact Info */}
              <div className="mt-auto p-4 bg-slate-50 border-t border-slate-100 space-y-3 text-slate-500">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4" /> 
                  <span>+31 6 12345678</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" /> 
                  <span>info@aranrepairs.nl</span>
                </div>
                <div className="flex items-center gap-3 font-medium text-slate-900 pt-2">
                   <LiveStatus />
                </div>
              </div>
           </nav>
        </div>
      )}
    </header>
  );
};
