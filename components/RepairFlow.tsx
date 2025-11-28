import React, { useState, useMemo, useEffect } from 'react';
import { 
  Smartphone, Tablet, Laptop, Watch, Gamepad2, 
  ChevronRight, ArrowLeft, Check, Search, Calendar as CalendarIcon, Clock, AlertCircle, ChevronLeft 
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

// --- Helper for generating Time Slots ---
const generateTimeSlots = (dateString: string): string[] => {
  if (!dateString) return [];
  
  // Parse YYYY-MM-DD explicitly to avoid timezone shifts
  const [year, month, day] = dateString.split('-').map(Number);
  
  // CRITICAL FIX: Set time to 12:00:00 (Noon) to prevent midnight timezone rollover bugs.
  // This ensures 'Monday' stays 'Monday' regardless of browser timezone offsets.
  const date = new Date(year, month - 1, day, 12, 0, 0);
  const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
  
  let startHour = 10;
  let endHour = 18;
  const slots: string[] = [];

  // Configuration based on business hours
  if (dayOfWeek === 0) return []; // Sunday Closed
  
  if (dayOfWeek === 1) { // Monday 1-6 PM (13:00 - 18:00)
    startHour = 13;
    endHour = 18;
  } else if (dayOfWeek === 6) { // Saturday 10-5 PM (10:00 - 17:00)
    endHour = 17;
  } 
  // Tue, Wed, Thu, Fri start at 10, end at 18 (default)

  // Generate 30 min intervals
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += 30) {
      // Friday Break Logic: Closed 13:00 - 14:00 (1 hour break)
      // Strictly remove 13:00 and 13:30 slots on Friday
      if (dayOfWeek === 5) { // 5 is Friday
        if (h === 13) continue; 
      }
      
      const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      slots.push(timeStr);
    }
  }
  return slots;
};

interface RepairFlowProps {
  initialCategory?: DeviceCategory | null;
}

export const RepairFlow = ({ initialCategory = null }: RepairFlowProps) => {
  const [step, setStep] = useState(initialCategory ? 2 : 1);
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory | null>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<DeviceModel | null>(null);
  const [selectedRepairs, setSelectedRepairs] = useState<RepairOption[]>([]);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: '', time: '', name: '', email: '', phone: '', notes: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Handle external prop changes (e.g. navigation from home)
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setStep(2);
    }
  }, [initialCategory]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // --- Step 1: Category Selection ---
  const renderCategorySelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">What device needs repair?</h2>
        <p className="text-slate-500">Select your device type to get started</p>
      </div>
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
        <div>
          <h2 className="text-2xl font-bold">Select Brand</h2>
          <p className="text-slate-500 text-sm">for {selectedCategory?.name}</p>
        </div>
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

  // --- Step 5: Booking Form with Date Picker ---
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(6);
  };

  // Calendar Logic
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  const changeMonth = (offset: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
    setCurrentMonth(newDate);
  };
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const today = new Date();
    today.setHours(0,0,0,0);

    // Empty slots for prev month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
      
      // Construct date string manually to match local time and avoid UTC conversion issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const dayNum = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${dayNum}`;

      const isSelected = bookingDetails.date === dateStr;
      const isPast = date < today;
      const isSunday = date.getDay() === 0;
      const isDisabled = isPast || isSunday;

      days.push(
        <button
          key={d}
          type="button"
          disabled={isDisabled}
          onClick={() => {
            setBookingDetails({ ...bookingDetails, date: dateStr, time: '' });
          }}
          className={cn(
            "h-9 w-9 mx-auto rounded-full flex items-center justify-center text-sm transition-all",
            isSelected 
              ? "bg-primary-500 text-slate-900 font-bold" 
              : "hover:bg-slate-100 text-slate-700",
            isDisabled && "opacity-30 cursor-not-allowed hover:bg-transparent"
          )}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const availableSlots = useMemo(() => {
    return generateTimeSlots(bookingDetails.date);
  }, [bookingDetails.date]);

  const renderBooking = () => (
    <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
           <Button variant="ghost" onClick={() => setStep(4)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
           <h2 className="text-2xl font-bold">Book Your Appointment</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Date & Time */}
            <Card className="h-fit">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary-600" />
                  Select Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {/* Calendar View */}
                <div className="mb-6">
                   <div className="flex items-center justify-between mb-4">
                     <span className="font-bold text-slate-800">
                       {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                     </span>
                     <div className="flex gap-1">
                       <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => changeMonth(-1)}>
                         <ChevronLeft className="h-4 w-4" />
                       </Button>
                       <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => changeMonth(1)}>
                         <ChevronRight className="h-4 w-4" />
                       </Button>
                     </div>
                   </div>
                   <div className="grid grid-cols-7 text-center text-xs font-medium text-slate-400 mb-2">
                     <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                   </div>
                   <div className="grid grid-cols-7 gap-y-2">
                     {renderCalendar()}
                   </div>
                </div>
                
                {/* Time Slots */}
                <div>
                   <h4 className="font-medium text-sm text-slate-700 mb-3">Available Times</h4>
                   {!bookingDetails.date ? (
                     <p className="text-sm text-slate-400 text-center py-4 bg-slate-50 rounded-lg">Please select a date first</p>
                   ) : availableSlots.length === 0 ? (
                     <p className="text-sm text-red-500 text-center py-4 bg-red-50 rounded-lg">No available slots on this day.</p>
                   ) : (
                     <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                       {availableSlots.map(slot => (
                         <button
                           key={slot}
                           type="button"
                           onClick={() => setBookingDetails({ ...bookingDetails, time: slot })}
                           className={cn(
                             "py-2 px-1 text-sm rounded border transition-colors",
                             bookingDetails.time === slot
                               ? "bg-primary-500 border-primary-500 text-slate-900 font-medium"
                               : "border-slate-200 hover:border-primary-500 hover:text-primary-600 text-slate-600"
                           )}
                         >
                           {slot}
                         </button>
                       ))}
                     </div>
                   )}
                </div>
              </CardContent>
            </Card>

            {/* Right Column: User Details & Summary */}
            <Card className="h-fit">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-lg">Your Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input required placeholder="John Doe" value={bookingDetails.name} onChange={e => setBookingDetails({...bookingDetails, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input required placeholder="+31 6 12345678" value={bookingDetails.phone} onChange={e => setBookingDetails({...bookingDetails, phone: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input required type="email" placeholder="john@example.com" value={bookingDetails.email} onChange={e => setBookingDetails({...bookingDetails, email: e.target.value})} />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg space-y-3 border border-slate-100">
                    <h4 className="font-semibold text-sm text-slate-900 border-b border-slate-200 pb-2">Booking Summary</h4>
                    <div className="flex justify-between text-sm text-slate-600">
                       <span>Device:</span>
                       <span className="font-medium text-slate-900">{selectedBrand?.name} {selectedModel?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                       <span>Repair:</span>
                       <span className="font-medium text-slate-900">{selectedRepairs[0]?.name} {selectedRepairs.length > 1 && `+${selectedRepairs.length - 1} more`}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                       <span>Date:</span>
                       <span className="font-medium text-slate-900">{bookingDetails.date || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                       <span>Time:</span>
                       <span className="font-medium text-slate-900">{bookingDetails.time || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200 mt-2">
                       <span>Total Est:</span>
                       <span>€{totalPrice}</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full" 
                    disabled={!bookingDetails.date || !bookingDetails.time}
                  >
                    Confirm Booking
                  </Button>
                </form>
              </CardContent>
            </Card>
        </div>
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