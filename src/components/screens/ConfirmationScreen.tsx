import React, { useState } from 'react';
import { 
  CheckCircle2, 
  CreditCard, 
  Printer, 
  QrCode, 
  Plane, 
  RotateCcw, 
  Layers, 
  User
} from 'lucide-react';
import type { Flight, CabinClass, ServiceType, PassengerDetails } from '../../types/flight';
import type { FlightTicket } from '../../decorator/TicketSystem';
import { TicketFactory } from '../../decorator/TicketSystem';
import { SERVICE_OPTIONS } from '../../data/flights';

interface ConfirmationScreenProps {
  flight: Flight;
  cabinClass: CabinClass;
  selectedServices: ServiceType[];
  passengerDetails: PassengerDetails;
  onResetBooking: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  flight,
  cabinClass,
  selectedServices,
  passengerDetails,
  onResetBooking
}) => {
  const [paymentState, setPaymentState] = useState<'pending' | 'processing' | 'confirmed'>('pending');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');

  const decoratedTicket: FlightTicket = TicketFactory.createTicket(flight, cabinClass, selectedServices);
  const totalCost = decoratedTicket.getCost();
  const baseCost = Math.round(
    flight.basePrice * (cabinClass === 'Premium' ? 1.25 : cabinClass === 'Business' ? 1.6 : 1)
  );

  const bookingId = `TF-${Math.floor(10000 + Math.random() * 90000)}-DEC`;

  const handlePayNow = () => {
    setPaymentState('processing');
    setTimeout(() => {
      setPaymentState('confirmed');
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Step A: Payment Pending State */}
      {paymentState !== 'confirmed' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="lavender-glass p-8 rounded-3xl border border-purple-300/60 shadow-2xl space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg">
                <CreditCard className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Payment Checkout</h2>
              <p className="text-xs text-purple-700">
                Complete transaction to finalize your decorated flight ticket.
              </p>
            </div>

            {/* Total Highlight */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-purple-950 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-purple-300 block">Total Amount Payable</span>
                <span className="text-xs text-pink-400 font-mono">
                  {selectedServices.length} Decorator Layer{selectedServices.length > 1 ? 's' : ''} Included
                </span>
              </div>
              <span className="text-3xl font-black text-pink-400 font-mono">
                ₹{totalCost.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider">
                Select Payment Method
              </label>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Credit/Debit Card' },
                  { id: 'upi', label: 'UPI / QR Code' },
                  { id: 'netbanking', label: 'Net Banking' }
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-3 rounded-2xl text-xs font-bold border transition-all ${
                      paymentMethod === pm.id
                        ? 'btn-infrared shadow'
                        : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-50'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Card details placeholder */}
            {paymentMethod === 'card' && (
              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  placeholder="Card Number (4532 •••• •••• 8912)"
                  defaultValue="4532 8901 2345 8912"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-purple-200 text-xs font-semibold text-slate-800"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="12/28"
                    className="px-4 py-3 rounded-xl bg-white border border-purple-200 text-xs font-semibold text-slate-800"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    defaultValue="894"
                    className="px-4 py-3 rounded-xl bg-white border border-purple-200 text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>
            )}

            <button
              onClick={handlePayNow}
              disabled={paymentState === 'processing'}
              className="w-full py-4 rounded-2xl btn-infrared font-bold text-sm flex items-center justify-center space-x-2 shadow-xl"
            >
              {paymentState === 'processing' ? (
                <span>Instantiating Decorated Ticket...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm Booking & Pay ₹{totalCost.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

          </div>
        </div>
      )}

      {/* Step B: Payment Confirmed - Digital Boarding Pass Pass Ticket */}
      {paymentState === 'confirmed' && (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          
          {/* Confirmed Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl border border-emerald-500/30">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-emerald-500 text-white shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-emerald-300 font-bold">
                  Booking Confirmed • Reference: {bookingId}
                </span>
                <h2 className="text-2xl font-black">Personalized Ticket Successfully Issued!</h2>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" /> Print Pass
              </button>
              <button
                onClick={onResetBooking}
                className="px-4 py-2.5 rounded-xl btn-infrared text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <RotateCcw className="w-4 h-4" /> New Booking
              </button>
            </div>
          </div>

          {/* Electronic Boarding Pass Component */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white shadow-2xl border border-purple-500/30 p-8 space-y-8">
            
            {/* Ticket Header Bar */}
            <div className="flex flex-wrap items-center justify-between border-b border-purple-500/20 pb-6 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-pink-600 text-white shadow-md">
                  <Plane className="w-6 h-6 transform -rotate-45" />
                </div>
                <div>
                  <h3 className="text-xl font-black">{flight.airline}</h3>
                  <p className="text-xs text-purple-300 font-mono">
                    Flight {flight.flightNumber} • {flight.aircraft} • {cabinClass} Class
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-purple-300 block font-mono">PNR / BOOKING CODE</span>
                <span className="text-2xl font-black text-pink-400 font-mono tracking-widest">
                  {bookingId}
                </span>
              </div>
            </div>

            {/* Flight Route Banner */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-950/80 p-6 rounded-2xl border border-purple-500/20">
              
              <div className="md:col-span-5 space-y-1">
                <div className="text-xs text-purple-400 font-mono">DEPARTURE</div>
                <div className="text-3xl font-black">{flight.fromCity}</div>
                <div className="text-sm font-bold text-pink-400 font-mono">
                  {flight.from} • {flight.departureTime}
                </div>
              </div>

              <div className="md:col-span-2 text-center space-y-1">
                <div className="text-xs text-purple-400">{flight.duration}</div>
                <div className="w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded" />
                <div className="text-[10px] text-purple-300 font-mono">DIRECT FLIGHT</div>
              </div>

              <div className="md:col-span-5 text-right space-y-1">
                <div className="text-xs text-purple-400 font-mono">ARRIVAL</div>
                <div className="text-3xl font-black">{flight.toCity}</div>
                <div className="text-sm font-bold text-pink-400 font-mono">
                  {flight.to} • {flight.arrivalTime}
                </div>
              </div>

            </div>

            {/* Passenger & Services Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Passenger Info */}
              <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/20 space-y-3">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4 text-pink-400" /> Passenger Information
                </h4>
                <div className="text-base font-bold">{passengerDetails.fullName || 'Passenger'}</div>
                <div className="text-xs text-purple-300 space-y-1 font-mono">
                  <div>Email: {passengerDetails.email || 'guest@travelflex.com'}</div>
                  <div>Phone: {passengerDetails.phone || '+91 98765 43210'}</div>
                  <div>Govt ID: {passengerDetails.idNumber || 'PROTOTYPE-ID'}</div>
                </div>
              </div>

              {/* Applied Decorators */}
              <div className="p-5 rounded-2xl bg-pink-950/30 border border-pink-500/20 space-y-3">
                <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Dynamically Added Decorators ({selectedServices.length})
                </h4>

                {selectedServices.length === 0 ? (
                  <div className="text-xs text-slate-400 italic">No extra decorator services added.</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedServices.map((id) => {
                      const s = SERVICE_OPTIONS.find(opt => opt.id === id);
                      return (
                        <span key={id} className="px-3 py-1 rounded-xl text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 font-mono">
                          ✓ {s?.name} (+₹{s?.price})
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* Boarding Pass Bottom Stub with QR Code */}
            <div className="pt-6 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-6">
              
              <div className="space-y-1">
                <div className="text-xs text-purple-300 font-mono">DECORATED COMPOSITE TOTAL</div>
                <div className="text-3xl font-black text-pink-400 font-mono">
                  ₹{totalCost.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-purple-400">
                  Base Ticket (₹{baseCost.toLocaleString('en-IN')}) + Decorators (₹{(totalCost - baseCost).toLocaleString('en-IN')})
                </div>
              </div>

              {/* QR Code Graphic */}
              <div className="flex items-center space-x-4 p-3 rounded-2xl bg-white text-slate-900 shadow-xl">
                <QrCode className="w-16 h-16 text-slate-900" />
                <div className="text-left font-mono text-[10px]">
                  <div className="font-bold text-pink-600">TravelFlex Boarding Pass</div>
                  <div className="text-slate-600">SCAN AT GATE</div>
                  <div className="text-slate-500 font-bold">{bookingId}</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
