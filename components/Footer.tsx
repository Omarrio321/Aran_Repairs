import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, MapPin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold"><span className="text-primary-500">Aran</span> Repairs</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted partner for professional device repairs. Fast service, original parts, and warranty on all repairs.
            </p>
            <div className="flex gap-4">
               <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:text-slate-900 transition-colors cursor-pointer">
                 <Facebook className="h-4 w-4" />
               </div>
               <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:text-slate-900 transition-colors cursor-pointer">
                 <Twitter className="h-4 w-4" />
               </div>
               <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:text-slate-900 transition-colors cursor-pointer">
                 <Instagram className="h-4 w-4" />
               </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400">Smartphone Repair</a></li>
              <li><a href="#" className="hover:text-primary-400">Tablet Repair</a></li>
              <li><a href="#" className="hover:text-primary-400">Laptop Repair</a></li>
              <li><a href="#" className="hover:text-primary-400">Console Repair</a></li>
              <li><a href="#" className="hover:text-primary-400">Data Recovery</a></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-semibold mb-4">Company</h4>
             <ul className="space-y-2 text-sm">
               <li><a href="#" className="hover:text-primary-400">About Us</a></li>
               <li><a href="#" className="hover:text-primary-400">Recycle Program</a></li>
               <li><a href="#" className="hover:text-primary-400">Careers</a></li>
               <li><a href="#" className="hover:text-primary-400">Contact</a></li>
               <li><a href="#" className="hover:text-primary-400">Privacy Policy</a></li>
             </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-500 shrink-0" />
                <span>Van Weedestraat 55<br />3761 CD Soest<br />The Netherlands</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-500 shrink-0" />
                <span>+31 6 12345678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-500 shrink-0" />
                <span>info@aranrepairs.nl</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
           <p>&copy; 2024 Aran Repairs. All rights reserved.</p>
           <p>Designed with React & Tailwind</p>
        </div>
      </div>
    </footer>
  );
};