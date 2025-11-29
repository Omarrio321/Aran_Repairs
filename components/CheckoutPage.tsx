
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from './ui';
import { Trash2, Plus, Minus, ShoppingCart, CheckCircle2, ArrowRight } from 'lucide-react';

export const CheckoutPage = () => {
  const { items, removeFromCart, total, clearCart, addToCart } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '' });
  const [step, setStep] = useState<'cart' | 'details' | 'success'>('cart');

  const handleUpdateQuantity = (item: any, delta: number) => {
    // Only works for accessories currently as per simplified logic, 
    // but useful if we expand logic. For now, we mainly use add/remove.
    // If delta is +1, we call addToCart again.
    if (delta > 0) {
       addToCart(item);
    } else {
       // Ideally we'd have a decrement function in context, 
       // but for this MVP, remove completely if single, or handle logic later.
       // Let's just allow removing items entirely for simplicity or rely on 
       // the fact that Accessories stack in logic but here visually we might list them.
       // Given the implementation of context, accessories update quantity there.
       // But we didn't export a decrement function. 
       // So we will stick to "Remove" button for now to be safe.
       removeFromCart(item.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      setStep('success');
      clearCart();
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto">
          Thank you for your purchase, {formData.name}. We have sent a confirmation email to <strong>{formData.email}</strong>.
        </p>
        <Button size="lg" onClick={() => window.location.href = '/'}>
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">Checkout</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <ShoppingCart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-600 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-8">Looks like you haven't added any items yet.</p>
          <Button onClick={() => window.location.href = '/'}>Start Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Cart Items or Form */}
          <div className="lg:col-span-2 space-y-6">
            {step === 'cart' ? (
              <Card>
                <CardHeader>
                   <CardTitle>Shopping Cart ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                      <div className="w-20 h-20 bg-slate-50 rounded-lg flex items-center justify-center p-2 border border-slate-100">
                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-slate-900">{item.name}</h3>
                            <p className="text-sm text-slate-500">{item.description}</p>
                            {item.details && (
                              <div className="flex gap-2 mt-1">
                                {item.details.color && (
                                   <div className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: item.details.color }} />
                                )}
                              </div>
                            )}
                          </div>
                          <p className="font-bold text-lg">€{item.price * item.quantity}</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                           <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-2 py-1">
                              <span className="text-sm font-medium text-slate-600 px-2">Qty: {item.quantity}</span>
                           </div>
                           <button 
                             onClick={() => removeFromCart(item.id)}
                             className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                           >
                             <Trash2 className="h-4 w-4" /> Remove
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Details</CardTitle>
                </CardHeader>
                <CardContent>
                   <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-sm font-medium">Full Name</label>
                           <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-medium">Phone Number</label>
                           <Input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+31 6 12345678" />
                        </div>
                      </div>
                      <div className="space-y-2">
                           <label className="text-sm font-medium">Email Address</label>
                           <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                      </div>
                      <div className="space-y-2">
                           <label className="text-sm font-medium">Address</label>
                           <Input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Street and number" />
                      </div>
                      <div className="space-y-2">
                           <label className="text-sm font-medium">City / Postal Code</label>
                           <Input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Amsterdam, 1011 AB" />
                      </div>
                   </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
             <Card className="sticky top-24">
               <CardHeader className="bg-slate-50 border-b border-slate-100">
                 <CardTitle className="text-lg">Order Summary</CardTitle>
               </CardHeader>
               <CardContent className="pt-6 space-y-4">
                 <div className="flex justify-between text-slate-600">
                   <span>Subtotal</span>
                   <span>€{total}</span>
                 </div>
                 <div className="flex justify-between text-slate-600">
                   <span>Shipping</span>
                   <span className="text-green-600 font-medium">Free</span>
                 </div>
                 <div className="border-t border-slate-100 pt-4 flex justify-between font-bold text-xl text-slate-900">
                   <span>Total</span>
                   <span>€{total}</span>
                 </div>

                 {step === 'cart' ? (
                   <Button size="lg" className="w-full mt-4" onClick={() => setStep('details')}>
                     Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                 ) : (
                   <div className="space-y-3 mt-4">
                     <Button type="submit" form="checkout-form" size="lg" className="w-full">
                       Complete Order
                     </Button>
                     <Button variant="ghost" className="w-full" onClick={() => setStep('cart')}>
                       Back to Cart
                     </Button>
                   </div>
                 )}
               </CardContent>
             </Card>
             
             <div className="mt-6 flex items-center justify-center gap-4 text-slate-400 grayscale opacity-70">
                {/* Placeholder Payment Icons */}
                <div className="h-8 w-12 bg-slate-200 rounded"></div>
                <div className="h-8 w-12 bg-slate-200 rounded"></div>
                <div className="h-8 w-12 bg-slate-200 rounded"></div>
             </div>
             <p className="text-center text-xs text-slate-400 mt-2">Secure SSL Encrypted Payment</p>
          </div>

        </div>
      )}
    </div>
  );
};
