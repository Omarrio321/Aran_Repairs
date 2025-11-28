import React from 'react';
import { Leaf, BatteryWarning, Banknote, Recycle, ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { Button, Card, CardContent } from './ui';

export const EnvironmentPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <div className="bg-slate-900 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-green-900/20 z-0"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/50 border border-green-500/30 text-green-300 text-sm font-medium mb-6">
            <Leaf className="h-4 w-4" />
            <span>Sustainable Tech Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Give Your Old Device <br />
            <span className="text-primary-500">A Second Life.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            At Aran Repairs, we believe in a greener future. Don't let your old electronics gather dust—recycle them with us to reduce e-waste, ensure safety, and earn cash.
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white border-none">
            Visit Store for Assessment
          </Button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-16">
        
        {/* Why Recycle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="border-t-4 border-t-amber-500 hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BatteryWarning className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Battery Safety Risks</h3>
              <p className="text-slate-600 leading-relaxed">
                Old lithium-ion batteries can swell and leak toxic chemicals over time. In extreme cases, they pose a serious fire hazard. Proper recycling neutralizes these risks immediately.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Keep It Green</h3>
              <p className="text-slate-600 leading-relaxed">
                E-waste is one of the fastest-growing waste streams. By recycling or refurbishing your phone, you prevent harmful metals from entering landfills and conserve resources used in manufacturing.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-primary-500 hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Banknote className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Get Paid Instantly</h3>
              <p className="text-slate-600 leading-relaxed">
                Your old device might still have value! We offer competitive trade-in prices for phones and tablets. If it's broken, we can often still offer value for parts.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How Our Recycle Program Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We've made the process simple, transparent, and rewarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-slate-200 -z-10"></div>

            {[
              { title: "Bring It In", desc: "Visit our store with your old device." },
              { title: "Assessment", desc: "We quickly inspect the condition and specs." },
              { title: "Offer", desc: "Get an instant quote for cash or credit." },
              { title: "Recycle/Refurb", desc: "We data-wipe and recycle responsibly." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center bg-slate-50">
                <div className="w-16 h-16 bg-white border-2 border-primary-500 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-sm z-10">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image / Mission Section */}
        <div className="mt-20 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop" 
              alt="Electronics Recycling" 
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Our Commitment to the Circular Economy</h2>
            <p className="text-slate-600 leading-relaxed">
              At Aran Repairs, we don't just fix screens; we fix the lifecycle of technology. Every device we refurbish is one less device manufactured from scratch. Every battery we recycle is kept out of our soil and water.
            </p>
            <ul className="space-y-3">
              {[
                "Certified data destruction for your privacy",
                "Eco-friendly disposal of non-salvageable parts",
                "Refurbished devices sold with warranty",
                "Supporting local environmental initiatives"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
               <p className="text-sm text-slate-500 italic mb-4">
                 "Join us in making technology sustainable, one device at a time."
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};