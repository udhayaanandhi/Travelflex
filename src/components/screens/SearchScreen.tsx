import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowRightLeft, 
  Search, 
  ShieldCheck, 
  Layers,
  CheckCircle,
  Tag
} from 'lucide-react';
import type { CabinClass } from '../../types/flight';
import { POPULAR_AIRPORTS } from '../../data/flights';

interface SearchScreenProps {
  onSearch: (from: string, to: string, cabinClass: CabinClass) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onSearch }) => {
  const [fromCode, setFromCode] = useState('DEL');
  const [toCode, setToCode] = useState('BOM');
  const [departDate, setDepartDate] = useState('2026-10-15');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState<CabinClass>('Economy');

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(fromCode, toCode, cabinClass);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner with Pastel & Infrared Accents */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950 border border-purple-500/20 p-8 sm:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Pattern Demonstration Prototype</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Personalized Flight Booking Powered by the{' '}
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Decorator Design Pattern
            </span>
          </h1>

          <p className="text-base text-purple-200/90 leading-relaxed">
            Start with a basic flight ticket and dynamically layer extra baggage, gourmet meals, priority boarding, VIP lounge access, and concierge assistance without altering the core ticket object!
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-purple-200">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
              <Layers className="w-4 h-4 text-pink-400" />
              <span>Dynamic Object Wrapping</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
              <CheckCircle className="w-4 h-4 text-purple-400" />
              <span>No Class Explosion</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Open/Closed Principle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Search Widget */}
      <div className="relative -mt-8 mx-auto max-w-6xl">
        <form 
          onSubmit={handleFormSubmit}
          className="lavender-glass rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-300/40 space-y-6"
        >
          {/* Trip Type & Cabin Selection */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-200/60 pb-5">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20"
              >
                One Way / Return Flight
              </button>
            </div>

            <div className="flex items-center space-x-2 bg-purple-100/60 p-1 rounded-2xl border border-purple-200">
              {(['Economy', 'Premium', 'Business'] as CabinClass[]).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setCabinClass(cls)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    cabinClass === cls
                      ? 'btn-infrared shadow-md'
                      : 'text-purple-900 hover:text-purple-950 hover:bg-white/40'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* From Airport */}
            <div className="md:col-span-5 relative">
              <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-pink-600" />
                From (Origin)
              </label>
              <select
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white border border-purple-200 text-purple-950 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
              >
                {POPULAR_AIRPORTS.map((ap) => (
                  <option key={ap.code} value={ap.code}>
                    {ap.city} ({ap.code}) - {ap.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-2 flex justify-center pt-2">
              <button
                type="button"
                onClick={handleSwap}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:scale-110 transition-transform"
                title="Swap Locations"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>

            {/* To Airport */}
            <div className="md:col-span-5 relative">
              <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-600" />
                To (Destination)
              </label>
              <select
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white border border-purple-200 text-purple-950 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
              >
                {POPULAR_AIRPORTS.map((ap) => (
                  <option key={ap.code} value={ap.code}>
                    {ap.city} ({ap.code}) - {ap.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Date & Passengers Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            
            <div>
              <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-pink-600" />
                Departure Date
              </label>
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-purple-200 text-purple-950 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-600" />
                Return Date (Optional)
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-purple-200 text-purple-950 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                Passengers
              </label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-purple-200 text-purple-950 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} Passenger{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl btn-infrared font-bold text-sm flex items-center justify-center space-x-3 shadow-xl"
            >
              <Search className="w-5 h-5" />
              <span>Search Flights & Customize Ticket</span>
            </button>
          </div>

        </form>
      </div>

      {/* Featured Routes */}
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-xl font-bold text-purple-950 flex items-center gap-2">
          <Tag className="w-5 h-5 text-pink-600" />
          Popular Flight Routes with Decorator Customization
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { from: 'DEL', to: 'BOM', title: 'New Delhi to Mumbai', price: '₹8,000', airline: 'TravelFlex SkyExpress' },
            { from: 'BLR', to: 'MAA', title: 'Bengaluru to Chennai', price: '₹4,500', airline: 'TravelFlex SkyExpress' },
            { from: 'BOM', to: 'DXB', title: 'Mumbai to Dubai', price: '₹18,500', airline: 'Emirates Global' }
          ].map((r, i) => (
            <div 
              key={i}
              onClick={() => onSearch(r.from, r.to, 'Economy')}
              className="lavender-glass p-5 rounded-2xl border border-purple-200/70 hover:border-pink-500 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-purple-700 font-bold mb-2">
                <span>{r.airline}</span>
                <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-600 font-mono">From {r.price}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-pink-600 transition-colors">
                {r.title}
              </h3>
              <p className="text-xs text-purple-600/80 mt-1">
                Base Ticket + Baggage + Meals + Lounge + Priority Boarding
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
