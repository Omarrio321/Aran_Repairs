import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Info } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from './ui';

export const ContactPage = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setIsSubmitted(true), 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const schedule = [
    { day: "Monday", hours: "13:00 – 18:00" },
    { day: "Tuesday", hours: "10:00 – 18:00" },
    { day: "Wednesday", hours: "10:00 – 18:00" },
    { day: "Thursday", hours: "10:00 – 18:00" },
    { day: "Friday", hours: "10:00 – 13:00 & 14:00 – 18:00", note: "Closed 1pm-2pm" },
    { day: "Saturday", hours: "10:00 – 17:00" },
    { day: "Sunday", hours: "Closed", isClosed: true },
  ];

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
        <p className="text-lg text-slate-600">
          Have a question about a repair, or need a custom quote? 
          Our team is here to help you get your devices back in top shape.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Contact Information Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-l-4 border-l-primary-500 shadow-md h-full">
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Visit Us</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Van Weedestraat 55<br />
                    3761 CD Soest<br />
                    The Netherlands
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Call Us</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    +31 6 12345678
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Email Us</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    info@aranrepairs.nl
                  </p>
                  <p className="text-xs text-slate-400 mt-1">We reply within 24 hours</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold">
                  <Clock className="h-5 w-5 text-primary-600" />
                  <h3>Opening Hours</h3>
                </div>
                <div className="space-y-3">
                  {schedule.map((item, idx) => (
                    <div key={idx} className={`flex flex-col text-sm border-b border-slate-50 last:border-0 pb-2 last:pb-0 ${item.isClosed ? 'text-slate-400' : 'text-slate-700'}`}>
                       <div className="flex justify-between items-center">
                         <span className="font-medium w-24">{item.day}</span>
                         <span className="text-right">{item.hours}</span>
                       </div>
                       {item.note && (
                         <div className="flex items-center justify-end gap-1 text-xs text-amber-600 mt-0.5 font-medium">
                           <Info className="h-3 w-3" /> {item.note}
                         </div>
                       )}
                    </div>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-2">
          <Card className="shadow-md h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary-500" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600 max-w-md">
                    Thank you for contacting Aran Repairs. We have received your message and will get back to you shortly at <strong>{formState.email}</strong>.
                  </p>
                  <Button 
                    className="mt-8" 
                    variant="outline" 
                    onClick={() => { setIsSubmitted(false); setFormState({ name: '', email: '', subject: '', message: '' }); }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                      <Input 
                        id="name" 
                        name="name" 
                        required 
                        placeholder="John Doe" 
                        value={formState.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        placeholder="john@example.com" 
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</label>
                    <select 
                      id="subject" 
                      name="subject" 
                      className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      value={formState.subject}
                      onChange={(e: any) => handleChange(e)}
                      required
                    >
                      <option value="" disabled>Select a topic</option>
                      <option value="repair_quote">Repair Quote</option>
                      <option value="business_inquiry">Business Inquiry</option>
                      <option value="order_status">Order Status</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={5}
                      className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 placeholder:text-slate-500"
                      placeholder="How can we help you?"
                      value={formState.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto md:px-8">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-96 bg-slate-100 rounded-xl overflow-hidden shadow-lg border border-slate-200 relative">
        <iframe 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy" 
          allowFullScreen 
          referrerPolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Van%20Weedestraat%2055,%203761%20CD%20Soest+(Aran%20Repairs)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
      </div>
    </div>
  );
};