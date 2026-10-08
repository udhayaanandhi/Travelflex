import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  FileText, 
  ArrowLeft, 
  CreditCard, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';
import type { Flight, CabinClass, ServiceType, PassengerDetails } from '../../types/flight';
import type { FlightTicket } from '../../decorator/TicketSystem';
import { TicketFactory } from '../../decorator/TicketSystem';
import { SERVICE_OPTIONS } from '../../data/flights';

interface ReviewScreenProps {
  flight: Flight;
  cabinClass: CabinClass;
  selectedServices: ServiceType[];
  passengerDetails: PassengerDetails;
  onChangePassenger: (details: PassengerDetails) => void;
  onModifyServices: () => void;
  onProceedToPayment: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  flight,
  cabinClass,
  selectedServices,
  passengerDetails,
  onChangePassenger,
  onModifyServices,
  onProceedToPayment
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const decoratedTicket: FlightTicket = TicketFactory.createTicket(flight, cabinClass, selectedServices);
  const baseCost = Math.round(
    flight.basePrice * (cabinClass === 'Premium' ? 1.25 : cabinClass === 'Business' ? 1.6 : 1)
  );
  const totalCost = decoratedTicket.getCost();
  const breakdownItems = decoratedTicket.getBreakdown();

  const handleInputChange = (field: keyof PassengerDetails, value: string) => {
    onChangePassenger({ ...passengerDetails, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!passengerDetails.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!passengerDetails.email.trim()) newErrors.email = 'Valid email is required';
    if (!passengerDetails.phone.trim()) newErrors.phone = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onProceedToPayment();
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-purple-500/20 text-white shadow-xl">
        <div className="flex items-center space-x-4">
          <button
            onClick={onModifyServices}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black">Review Personalized Ticket</h1>
            <p className="text-xs text-purple-300/80 mt-0.5">
              Confirm passenger details and inspect your decorated flight package before payment.
            </p>
          </div>
        </div>

        <button
          onClick={onModifyServices}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-500/20 text-purple-200 border border-purple-400/30 hover:bg-purple-500/30 transition-all"
        >
          Modify Services
        </button>
      </div>

      {/* Concept Visual Pipeline Banner */}
      <div className="lavender-glass-dark p-6 rounded-3xl border border-purple-500/30 text-white space-y-4">
        <div className="flex items-center space-x-2 text-pink-400 font-bold text-xs">
          <Sparkles className="w-4 h-4" />
          <span>Decorator Pattern Concept Demonstration</span>
        </div>

        {/* Visual Pipeline */}
        <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-slate-950 border border-purple-500/20 text-xs">
          <span className="px-3.5 py-1.5 rounded-xl font-bold bg-purple-700 text-white">
            Basic Ticket (₹{baseCost.toLocaleString('en-IN')})
          </span>

          {selectedServices.map((serviceId) => {
            const s = SERVICE_OPTIONS.find(opt => opt.id === serviceId);
            return (
              <React.Fragment key={serviceId}>
                <ArrowRight className="w-4 h-4 text-pink-400" />
                <span className="px-3.5 py-1.5 rounded-xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow">
                  + {s?.name} (₹{s?.price})
                </span>
              </React.Fragment>
            );
          })}

          <ArrowRight className="w-4 h-4 text-purple-400" />
          <span className="px-4 py-1.5 rounded-xl font-black bg-pink-500/20 text-pink-300 border border-pink-500/40">
            Personalized Ticket
          </span>
        </div>
      </div>

      {/* Main Grid: Left Passenger Details Form, Right Detailed Ticket Summary */}
      <form onSubmit={handleProceed} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="lavender-glass p-6 sm:p-8 rounded-3xl border border-purple-300/60 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-purple-100 pb-4">
              <User className="w-5 h-5 text-pink-600" />
              Passenger Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-pink-600" />
                  Full Name (as per Passport/ID)
                </label>
                <input
                  type="text"
                  value={passengerDetails.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className={`w-full px-4 py-3.5 rounded-2xl bg-white border ${
                    errors.fullName ? 'border-red-500' : 'border-purple-200'
                  } text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500`}
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-purple-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={passengerDetails.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="alex@example.com"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-white border ${
                      errors.email ? 'border-red-500' : 'border-purple-200'
                    } text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-600" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={passengerDetails.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-white border ${
                      errors.phone ? 'border-red-500' : 'border-purple-200'
                    } text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-pink-600" />
                  Government ID / Passport Number
                </label>
                <input
                  type="text"
                  value={passengerDetails.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  placeholder="e.g. Z9821543"
                  className="w-full px-4 py-3.5 rounded-2xl bg-white border border-purple-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3 text-xs text-purple-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Instant electronic ticket confirmation issued upon payment completion.</span>
            </div>
          </div>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="lavender-glass p-6 sm:p-8 rounded-3xl border border-purple-300/60 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-purple-100 pb-4">
              Ticket Itemized Breakdown
            </h2>

            {/* Flight info */}
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-purple-900">
                <span>{flight.airline} ({flight.flightNumber})</span>
                <span>{cabinClass} Class</span>
              </div>
              <div className="text-sm font-black text-slate-900">
                {flight.fromCity} ({flight.from}) → {flight.toCity} ({flight.to})
              </div>
              <div className="text-xs text-purple-700">
                Departure: {flight.departureTime} • Duration: {flight.duration}
              </div>
            </div>

            {/* Individual Decorator Price List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-900">
                Applied Decorator Services ({selectedServices.length})
              </h3>

              <div className="space-y-2 text-xs">
                {breakdownItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      item.type === 'base'
                        ? 'bg-purple-100 text-purple-950 font-bold'
                        : 'bg-pink-50 text-pink-950 border border-pink-200 font-semibold'
                    }`}
                  >
                    <span>{item.title}</span>
                    <span className="font-mono font-bold">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Footer & Buttons */}
            <div className="pt-4 border-t border-purple-200 space-y-4">
              <div className="flex items-center justify-between text-xl font-black text-slate-900">
                <span>Final Total Amount:</span>
                <span className="text-2xl text-pink-600 font-mono">
                  ₹{totalCost.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onModifyServices}
                  className="w-1/2 py-4 rounded-2xl btn-lavender font-bold text-xs text-purple-950 border border-purple-300"
                >
                  Modify Services
                </button>

                <button
                  type="submit"
                  className="w-1/2 py-4 rounded-2xl btn-infrared font-bold text-xs flex items-center justify-center space-x-2 shadow-xl"
                >
                  <span>Proceed to Payment</span>
                  <CreditCard className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </form>

    </div>
  );
};
