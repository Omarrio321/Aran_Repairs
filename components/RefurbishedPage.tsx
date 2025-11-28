import React, { useState } from 'react';
import { Badge, Button, Card, CardContent, Input } from './ui';
import { REFURBISHED_DEVICES } from '../data';
import { RefurbishedDevice } from '../types';
import { CheckCircle2, Search, ArrowLeft, Battery, Shield, Truck, Smartphone } from 'lucide-react';

export const RefurbishedPage = () => {
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<RefurbishedDevice | null>(null);

  const filteredDevices = REFURBISHED_DEVICES.filter(device => {
    const matchBrand = filterBrand === 'all' || device.brandId === filterBrand;
    const matchSearch = device.name.toLowerCase().includes(search.toLowerCase());
    return matchBrand && matchSearch;
  });

  // --- Detail View ---
  if (selectedDevice) {
    return (
      <div className="container mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedDevice(null)} 
          className="mb-6 pl-0 hover:bg-transparent hover:text-primary-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all devices
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image Section */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 flex items-center justify-center min-h-[400px] lg:min-h-[600px] relative overflow-hidden">
                <div className="absolute top-4 right-4 z-10">
                   <Badge variant={selectedDevice.condition === 'Like New' ? 'success' : 'secondary'} className="text-sm px-3 py-1">
                      {selectedDevice.condition} Condition
                   </Badge>
                </div>
                <img 
                  src={selectedDevice.image} 
                  alt={selectedDevice.name} 
                  className="max-h-[300px] lg:max-h-[500px] w-auto object-contain hover:scale-105 transition-transform duration-500" 
                />
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col h-full">
                <div className="mb-6 border-b border-slate-100 pb-6">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">{selectedDevice.name}</h1>
                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                        <span className="bg-slate-100 px-2 py-1 rounded">{selectedDevice.storage}</span>
                        <span>•</span>
                        <span>Unlocked</span>
                        <span>•</span>
                        <span className="capitalize">{selectedDevice.brandId}</span>
                    </div>
                </div>

                <div className="flex items-end gap-3 mb-8">
                    <span className="text-4xl font-bold text-primary-600">€{selectedDevice.price}</span>
                    <div className="flex flex-col mb-1">
                        <span className="text-sm text-slate-400 line-through">€{selectedDevice.originalPrice}</span>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                            Save €{selectedDevice.originalPrice - selectedDevice.price}
                        </span>
                    </div>
                </div>

                {/* Color Selection (Visual only) */}
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Available Colors</h3>
                    <div className="flex gap-3">
                        {selectedDevice.colors.map((color, i) => (
                            <div 
                                key={i}
                                className="w-10 h-10 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-primary-500 ring-offset-2 relative"
                                style={{ backgroundColor: color }}
                                title="Color option"
                            />
                        ))}
                    </div>
                </div>

                {/* Selling Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-50 p-4 rounded-xl flex items-start gap-3">
                        <Battery className="h-6 w-6 text-primary-600 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-slate-900 text-sm">New Battery</h4>
                            <p className="text-xs text-slate-500 mt-1">100% health guaranteed or we replace it.</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl flex items-start gap-3">
                        <Shield className="h-6 w-6 text-primary-600 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-slate-900 text-sm">2 Year Warranty</h4>
                            <p className="text-xs text-slate-500 mt-1">Complete coverage for any hardware defects.</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl flex items-start gap-3">
                        <Smartphone className="h-6 w-6 text-primary-600 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-slate-900 text-sm">Quality Check</h4>
                            <p className="text-xs text-slate-500 mt-1">30-point inspection by expert technicians.</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl flex items-start gap-3">
                        <Truck className="h-6 w-6 text-primary-600 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-slate-900 text-sm">Fast Delivery</h4>
                            <p className="text-xs text-slate-500 mt-1">Order before 23:00, receive it tomorrow.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex gap-4">
                    <Button size="lg" className="flex-1 text-lg h-14" onClick={() => alert('Item added to cart!')}>
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --- List View ---
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary-900 to-slate-900 rounded-2xl p-8 md:p-12 mb-10 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-green-500 text-white hover:bg-green-600 border-none mb-4">Eco-Friendly Choice</Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Premium Refurbished iPhones & Samsungs</h1>
          <p className="text-slate-300 text-lg mb-6">Like-new quality for a fraction of the price. All devices come with a 2-year warranty and new battery.</p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 hidden md:block" />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          <Button 
            variant={filterBrand === 'all' ? 'default' : 'outline'} 
            onClick={() => setFilterBrand('all')}
            className="whitespace-nowrap"
          >
            All Brands
          </Button>
          <Button 
            variant={filterBrand === 'apple' ? 'default' : 'outline'} 
            onClick={() => setFilterBrand('apple')}
            className="whitespace-nowrap"
          >
            Apple
          </Button>
          <Button 
            variant={filterBrand === 'samsung' ? 'default' : 'outline'} 
            onClick={() => setFilterBrand('samsung')}
            className="whitespace-nowrap"
          >
            Samsung
          </Button>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search devices..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDevices.map(device => (
          <Card key={device.id} className="overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
            <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden">
               <img 
                 src={device.image} 
                 alt={device.name} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute top-3 left-3">
                 <Badge variant={device.condition === 'Like New' ? 'success' : 'secondary'} className="bg-white/90 backdrop-blur shadow-sm">
                   {device.condition}
                 </Badge>
               </div>
            </div>
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{device.name}</h3>
                  <p className="text-sm text-slate-500">{device.storage}</p>
                </div>
                <div className="flex -space-x-1">
                  {device.colors.map((c, i) => (
                    <div key={i} className="w-4 h-4 rounded-full border border-white ring-1 ring-slate-100" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4 text-xs text-green-600 font-medium">
                <CheckCircle2 className="h-3 w-3" /> 24 Months Warranty
              </div>

              <div className="mt-auto flex items-center justify-between">
                 <div className="flex flex-col">
                   <span className="text-xs text-slate-400 line-through">€{device.originalPrice}</span>
                   <span className="text-xl font-bold text-primary-600">€{device.price}</span>
                 </div>
                 <Button size="sm" onClick={() => setSelectedDevice(device)}>View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-lg border border-dashed border-slate-300">
           <p className="text-slate-500">No devices found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};