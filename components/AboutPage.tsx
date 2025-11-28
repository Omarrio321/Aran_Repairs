import React from 'react';
import { Wrench, Recycle, Smartphone, ShoppingBag, ShieldCheck, Heart, Users, Clock, ArrowRight } from 'lucide-react';
import { Button, Card, CardContent } from './ui';

export const AboutPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-900/10 z-0"></div>
        {/* Abstract shapes */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            More Than Just <span className="text-primary-500">Repairs.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
            Aran Repairs is your trusted technology partner in Soest. We combine technical expertise with a passion for sustainability to keep your devices running longer and better.
          </p>
        </div>
      </div>

      {/* Our Mission / Story */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
           <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary-100 rounded-2xl transform rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=800&auto=format&fit=crop" 
                  alt="Technician working" 
                  className="relative rounded-2xl shadow-xl w-full h-auto object-cover" 
                />
              </div>
           </div>
           <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Our Story & Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                Founded with a clear vision, Aran Repairs was established to provide a reliable alternative to the "throw-away" culture of modern electronics. We realized that many devices are discarded simply because quality repair options weren't accessible or trusted.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Located in the heart of <strong>Soest</strong>, we have built a reputation for transparency, speed, and technical excellence. Our mission is simple: <strong>To extend the lifecycle of every device that crosses our counter.</strong> Whether it's replacing a shattered screen or giving an old phone a new home, we are dedicated to quality service that respects both the customer and the environment.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="flex flex-col">
                   <span className="text-3xl font-bold text-primary-600">10k+</span>
                   <span className="text-sm text-slate-500">Devices Fixed</span>
                </div>
                <div className="w-px bg-slate-200"></div>
                <div className="flex flex-col">
                   <span className="text-3xl font-bold text-primary-600">98%</span>
                   <span className="text-sm text-slate-500">Customer Satisfaction</span>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Comprehensive Services */}
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Comprehensive Services</h2>
            <p className="text-slate-600">
              We offer a complete ecosystem for your mobile technology needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {/* Service 1 */}
             <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
               <CardContent className="pt-8 text-center px-6">
                 <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <Wrench className="h-7 w-7" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-3">Expert Repairs</h3>
                 <p className="text-sm text-slate-500 mb-4">
                   Specialized microsoldering and component replacement for iPhones, Samsungs, iPads, and Laptops. We use original quality parts with a 12-month warranty.
                 </p>
               </CardContent>
             </Card>

             {/* Service 2 */}
             <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
               <CardContent className="pt-8 text-center px-6">
                 <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <Smartphone className="h-7 w-7" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-3">Certified Refurbished</h3>
                 <p className="text-sm text-slate-500 mb-4">
                   Buy with confidence. Our refurbished devices undergo a strict 30-point inspection and come with a new battery and 2-year warranty.
                 </p>
               </CardContent>
             </Card>

             {/* Service 3 */}
             <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
               <CardContent className="pt-8 text-center px-6">
                 <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <Recycle className="h-7 w-7" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-3">Eco-Friendly Recycling</h3>
                 <p className="text-sm text-slate-500 mb-4">
                   We are committed to the environment. Bring in your old, broken, or unused devices for responsible recycling or trade-in value.
                 </p>
               </CardContent>
             </Card>

             {/* Service 4 */}
             <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
               <CardContent className="pt-8 text-center px-6">
                 <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <ShoppingBag className="h-7 w-7" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-3">Premium Accessories</h3>
                 <p className="text-sm text-slate-500 mb-4">
                   Protect and power your gear. We stock high-grade screen protectors, military-grade cases, and fast-charging solutions.
                 </p>
               </CardContent>
             </Card>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="container mx-auto px-4 py-20">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
               <div className="mb-4 p-3 bg-primary-50 rounded-full text-primary-600">
                  <ShieldCheck className="h-8 w-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Unmatched Quality</h3>
               <p className="text-slate-600 text-sm">
                 We never compromise on parts. If we wouldn't put it in our own phone, we won't put it in yours.
               </p>
            </div>
            <div className="flex flex-col items-center text-center">
               <div className="mb-4 p-3 bg-primary-50 rounded-full text-primary-600">
                  <Clock className="h-8 w-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Speed & Convenience</h3>
               <p className="text-slate-600 text-sm">
                 Most repairs are completed within 30 minutes. Book online, skip the line, and get back to your day.
               </p>
            </div>
            <div className="flex flex-col items-center text-center">
               <div className="mb-4 p-3 bg-primary-50 rounded-full text-primary-600">
                  <Heart className="h-8 w-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Community Focused</h3>
               <p className="text-slate-600 text-sm">
                 As a local Soest business, we treat every customer like a neighbor, providing honest advice and fair prices.
               </p>
            </div>
         </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold text-white mb-6">Ready to fix your device?</h2>
           <p className="text-slate-300 mb-8 max-w-xl mx-auto">
             Stop by our store in Soest or book an appointment online to experience the Aran Repairs difference.
           </p>
           <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-primary-500 text-slate-900 hover:bg-primary-400">
                Book Appointment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-slate-600 hover:bg-slate-800">
                Contact Us
              </Button>
           </div>
        </div>
      </div>

    </div>
  );
};