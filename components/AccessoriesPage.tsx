import React, { useState } from 'react';
import { Badge, Button, Card, CardContent } from './ui';
import { ACCESSORIES } from '../data';
import { ShieldCheck, Zap, Smartphone, Headphones } from 'lucide-react';

export const AccessoriesPage = () => {
  const [filterType, setFilterType] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All', icon: null },
    { id: 'case', label: 'Cases', icon: Smartphone },
    { id: 'protection', label: 'Protection', icon: ShieldCheck },
    { id: 'power', label: 'Power', icon: Zap },
    { id: 'audio', label: 'Audio', icon: Headphones },
  ];

  const filteredItems = filterType === 'all' 
    ? ACCESSORIES 
    : ACCESSORIES.filter(item => item.type === filterType);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Essential Accessories</h1>
        <p className="text-slate-500">
          Complete your setup with our premium selection of cases, chargers, and protection.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <Button
              key={cat.id}
              variant={filterType === cat.id ? 'default' : 'outline'}
              onClick={() => setFilterType(cat.id)}
              className="min-w-[100px]"
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              {cat.label}
            </Button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <Card key={item.id} className="group hover:shadow-md transition-all">
            <div className="aspect-square bg-slate-50 relative p-6 flex items-center justify-center">
              <img 
                src={item.image} 
                alt={item.name} 
                className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 mix-blend-multiply"
              />
              {item.badge && (
                <Badge className="absolute top-3 left-3 bg-primary-600">{item.badge}</Badge>
              )}
            </div>
            <CardContent className="p-5">
              <div className="mb-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{item.type}</p>
                <h3 className="font-bold text-slate-900">{item.name}</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">€{item.price}</span>
                <Button size="sm" variant="secondary">Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};