import React, { useState } from 'react';
import { Wrench, Phone, Mail, Menu, X, Recycle } from 'lucide-react';
import { Button } from './ui';
import { cn } from './ui';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
           <div className="hidden md:block">
             Open Mon-Fri: 09:00 - 18:00 | Sat: 09:00 - 17:00
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
          <button onClick={() => onNavigate('refurbished')} className={linkClass('refurbished')}>Refurbished Phones</button>
          <button onClick={() => onNavigate('accessories')} className={linkClass('accessories')}>Accessories</button>
          <button onClick={() => onNavigate('recycle')} className={cn(linkClass('recycle'), "flex items-center gap-1")}>
            <Recycle className="h-4 w-4" /> Recycle
          </button>
          <button onClick={() => onNavigate('contact')} className={linkClass('contact')}>Contact</button>
          <button onClick={() => onNavigate('about')} className={linkClass('about')}>About Us</button>
          <Button size="sm" onClick={() => onNavigate('home')}>Book Appointment</Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 absolute top-full left-0 right-0 shadow-lg animate-in slide-in-from-top-5 duration-200 h-[calc(100vh-64px)] overflow-y-auto">
           <nav className="flex flex-col text-sm font-medium">
              <button onClick={() => handleMobileNavigate('home')} className={mobileLinkClass('home')}>Home</button>
              <button onClick={() => handleMobileNavigate('refurbished')} className={mobileLinkClass('refurbished')}>Refurbished Phones</button>
              <button onClick={() => handleMobileNavigate('accessories')} className={mobileLinkClass('accessories')}>Accessories</button>
              <button onClick={() => handleMobileNavigate('recycle')} className={mobileLinkClass('recycle')}>Recycle Program</button>
              <button onClick={() => handleMobileNavigate('contact')} className={mobileLinkClass('contact')}>Contact</button>
              <button onClick={() => handleMobileNavigate('about')} className={mobileLinkClass('about')}>About Us</button>
              <div className="p-4">
                <Button className="w-full h-12 text-base" onClick={() => handleMobileNavigate('home')}>Book Appointment</Button>
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
              </div>
           </nav>
        </div>
      )}
    </header>
  );
};