import React, { useState, useMemo, useEffect } from 'react';
import { 
  Smartphone, Tablet, Laptop, Watch, Gamepad2, 
  ChevronRight, ArrowLeft, Check, Search, Calendar, Clock 
} from 'lucide-react';
import { CATEGORIES, BRANDS, MODELS, getRepairsForType } from '../data';
import { DeviceCategory, Brand, DeviceModel, RepairOption, BookingDetails } from '../types';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Badge, cn } from './ui';
import { SmartDiagnosis } from './SmartDiagnosis';

// --- Icons mapping ---
const IconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="h-8 w-8" />,
  Tablet: <Tablet className="h-8 w-8" />,
  Laptop: <Laptop className="h-8 w-8" />,
  Watch: <Watch className="h-8 w-8" />,
  Gamepad2: <Gamepad2 className="h-8 w-8" />,
};

export const RepairFlow = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<DeviceModel | null>(null);
  const [selectedRepairs, setSelectedRepairs] = useState<RepairOption[]>([]);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: '', time: '', name: '', email: '', phone: '', notes: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // --- Step 1: Category Selection ---
  const renderCategorySelection = () => (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {CATEGORIES.map((cat) => (
        <Card 
          key={cat.id} 
          onClick={() => { setSelectedCategory(cat); setStep(2); }}
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
  );

  // --- Step 2: Brand Selection ---
  const filteredBrands = useMemo(() => {
    if (!selectedCategory) return [];
    return BRANDS.filter(b => b.deviceTypes.includes(selectedCategory.id));
  }, [selectedCategory]);

  const renderBrandSelection = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <h2 className="text-2xl font-bold">Select Brand</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredBrands.map((brand) => (
          <Card 
            key={brand.id}
            onClick={() => { setSelectedBrand(brand); setStep(3); }}
            className="cursor-pointer hover:border-primary-500 hover:shadow-md transition-all flex items-center justify-center py-8"
          >
            <span className="text-xl font-bold text-slate-700">{brand.name}</span>
          </Card>
        ))}
      </div>
    </div>
  );

  // --- Step 3: Model Selection ---
  const filteredModels = useMemo(() => {
    if (!selectedBrand || !selectedCategory) return [];
    const models = MODELS.filter(m => m.brandId === selectedBrand.id && m.type === selectedCategory.id);
    if (searchQuery) {
      return models.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return models;
  }, [selectedBrand, selectedCategory, searchQuery]);

  const renderModelSelection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
           <Button variant="ghost" onClick={() => setStep(2)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
           <h2 className="text-2xl font-bold">Select Model</h2>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search model..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {filteredModels.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No models found. Try a different search or category.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredModels.map((model) => (
            <Card 
              key={model.id}
              onClick={() => { setSelectedModel(model); setStep(4); }}
              className="cursor-pointer hover:border-primary-500 hover:shadow-md transition-all group overflow-hidden"
            >
              <div className="aspect-[3/4] bg-slate-100 relative overflow-hidden">
                <img 
                  src={model.image} 
                  alt={model.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-4 text-center">
                <span className="font-medium text-slate-800">{model.name}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  // --- Step 4: Repair Selection ---
  const availableRepairs = useMemo(() => {
    if (!selectedCategory) return [];
    return getRepairsForType(selectedCategory.id);
  }, [selectedCategory]);

  const toggleRepair = (repair: RepairOption) => {
    setSelectedRepairs(prev => {
      const exists = prev.find(r => r.id === repair.id);
      if (exists) return prev.filter(r => r.id !== repair.id);
      return [...prev, repair];
    });
  };

  const handleAISelection = (repairId: string) => {
      const repair = availableRepairs.find(r => r.id === repairId);
      if (repair) {
          // Add if not already present
          setSelectedRepairs(prev => {
              if (prev.find(r => r.id === repairId)) return prev;
              return [...prev, repair];
          });
      }
  }

  const totalPrice = selectedRepairs.reduce((sum, r) => sum + r.price, 0);

  const renderRepairSelection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center gap-4">
           <Button variant="ghost" onClick={() => setStep(3)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
           <div>
             <h2 className="text-2xl font-bold">Select Repairs</h2>
             <p className="text-slate-500">for {selectedModel?.name}</p>
           </div>
        </div>

        <SmartDiagnosis 
            deviceType={selectedCategory?.id} 
            onRepairSelect={handleAISelection} 
        />

        <div className="space-y-4">
          {availableRepairs.map((repair) => {
            const isSelected = !!selectedRepairs.find(r => r.id === repair.id);
            return (
              <div 
                key={repair.id}
                onClick={() => toggleRepair(repair)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all",
                  isSelected 
                    ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500" 
                    : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-slate-900">{repair.name}</h4>
                    {repair.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{repair.description || 'Professional installation included.'}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {repair.durationMinutes} min</span>
                    <span className="flex items-center font-medium text-slate-900">€{repair.price}</span>
                  </div>
                </div>
                <div className={cn(
                  "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
                  isSelected ? "border-primary-500 bg-primary-500 text-slate-900" : "border-slate-300"
                )}>
                  {isSelected && <Check className="h-4 w-4" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24 shadow-lg border-primary-100">
          <CardHeader className="bg-slate-50 border-b border-slate-100">
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <img src={selectedModel?.image} alt="" className="h-12 w-8 object-cover rounded" />
              <div>
                <p className="font-medium text-slate-900">{selectedModel?.name}</p>
                <p className="text-sm text-slate-500">{selectedBrand?.name}</p>
              </div>
            </div>

            {selectedRepairs.length > 0 ? (
              <div className="space-y-2">
                 {selectedRepairs.map(r => (
                   <div key={r.id} className="flex justify-between text-sm">
                     <span className="text-slate-600">{r.name}</span>
                     <span className="font-medium">€{r.price}</span>
                   </div>
                 ))}
                 <div className="pt-4 border-t border-slate-100 flex justify-between font-bold text-lg">
                   <span>Total</span>
                   <span>€{totalPrice}</span>
                 </div>
                 <Button className="w-full mt-4" onClick={() => setStep(5)}>
                   Book Appointment
                 </Button>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-500 text-sm">
                Select a repair to continue
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // --- Step 5: Booking Form ---
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(6);
  };

  const renderBooking = () => (
    <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
           <Button variant="ghost" onClick={() => setStep(4)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
           <h2 className="text-2xl font-bold">Book Your Appointment</h2>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input required placeholder="John Doe" value={bookingDetails.name} onChange={e => setBookingDetails({...bookingDetails, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input required placeholder="+31 6 12345678" value={bookingDetails.phone} onChange={e => setBookingDetails({...bookingDetails, phone: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input required type="email" placeholder="john@example.com" value={bookingDetails.email} onChange={e => setBookingDetails({...bookingDetails, email: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Preferred Date</label>
                   <div className="relative">
                     <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                     <Input required type="date" className="pl-9" value={bookingDetails.date} onChange={e => setBookingDetails({...bookingDetails, date: e.target.value})} />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Preferred Time</label>
                   <div className="relative">
                     <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                     <Input required type="time" className="pl-9" value={bookingDetails.time} onChange={e => setBookingDetails({...bookingDetails, time: e.target.value})} />
                   </div>
                 </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm text-slate-900">Repair Summary</h4>
                <div className="flex justify-between text-sm text-slate-600">
                   <span>Device:</span>
                   <span>{selectedBrand?.name} {selectedModel?.name}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                   <span>Service(s):</span>
                   <span>{selectedRepairs.map(r => r.name).join(', ')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                   <span>Estimated Total:</span>
                   <span>€{totalPrice}</span>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">Confirm Booking</Button>
            </form>
          </CardContent>
        </Card>
    </div>
  );

  // --- Step 6: Success ---
  const renderSuccess = () => (
    <div className="text-center max-w-lg mx-auto py-12">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="h-10 w-10" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
      <p className="text-slate-600 mb-8">
        Thanks {bookingDetails.name}, we've received your request for the <strong>{selectedModel?.name}</strong> repair.
        We'll see you on <strong>{bookingDetails.date} at {bookingDetails.time}</strong>.
      </p>
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={() => window.location.reload()}>Back to Home</Button>
        <Button onClick={() => window.print()}>Print Confirmation</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Step Indicator */}
      {step < 6 && (
        <div className="mb-8">
          <div className="flex items-center justify-between relative max-w-3xl mx-auto">
             <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10 -translate-y-1/2" />
             {[1, 2, 3, 4, 5].map((s) => (
               <div 
                 key={s} 
                 className={cn(
                   "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                   s <= step ? "bg-primary-500 text-slate-900" : "bg-slate-200 text-slate-500"
                 )}
               >
                 {s < step ? <Check className="h-4 w-4" /> : s}
               </div>
             ))}
          </div>
          <div className="flex justify-between text-xs text-slate-500 max-w-3xl mx-auto mt-2 px-1">
             <span>Device</span>
             <span>Brand</span>
             <span>Model</span>
             <span>Repair</span>
             <span>Details</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {step === 1 && renderCategorySelection()}
        {step === 2 && renderBrandSelection()}
        {step === 3 && renderModelSelection()}
        {step === 4 && renderRepairSelection()}
        {step === 5 && renderBooking()}
        {step === 6 && renderSuccess()}
      </div>
    </div>
  );
};