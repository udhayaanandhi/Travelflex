import React, { useState } from 'react';
import { 
  Plane, 
  Clock, 
  ArrowRight, 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import type { Flight, CabinClass } from '../../types/flight';
import { MOCK_FLIGHTS } from '../../data/flights';

interface ResultsScreenProps {
  fromCode: string;
  toCode: string;
  cabinClass: CabinClass;
  onSelectFlight: (flight: Flight) => void;
  onBackToSearch: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  fromCode,
  toCode,
  cabinClass,
  onSelectFlight,
  onBackToSearch
}) => {
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [filterStops, setFilterStops] = useState<'all' | 'direct' | 'stops'>('all');

  // Filter flights matching from and to
  let flights = MOCK_FLIGHTS.filter(
    f => f.from.toUpperCase() === fromCode.toUpperCase() && f.to.toUpperCase() === toCode.toUpperCase()
  );

  // Fallback if none match exact filter
  if (flights.length === 0) {
    flights = MOCK_FLIGHTS.filter(f => f.from === 'DEL' && f.to === 'BOM');
  }

  // Apply stops filter
  if (filterStops === 'direct') {
    flights = flights.filter(f => f.stops === 0);
  } else if (filterStops === 'stops') {
    flights = flights.filter(f => f.stops > 0);
  }

  // Sort flights
  flights.sort((a, b) => {
    if (sortBy === 'price') return a.basePrice - b.basePrice;
    if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
    return a.duration.localeCompare(b.duration);
  });

  const cabinMultiplier = cabinClass === 'Premium' ? 1.25 : cabinClass === 'Business' ? 1.6 : 1;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Info Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-purple-500/20 text-white shadow-xl">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToSearch}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Modify Search"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center space-x-3 text-2xl font-black">
              <span>{fromCode}</span>
              <Plane className="w-5 h-5 text-pink-400 transform rotate-90" />
              <span>{toCode}</span>
              <span className="text-xs px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-semibold">
                {cabinClass} Class
              </span>
            </div>
            <p className="text-xs text-purple-300/80 mt-1">
              Found {flights.length} available basic ticket flights. Select a flight to decorate with optional services.
            </p>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-2 bg-slate-950/60 p-1.5 rounded-2xl border border-purple-500/20 text-xs">
          <span className="text-slate-400 font-semibold px-2 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-pink-400" /> Sort:
          </span>
          <button
            onClick={() => setSortBy('price')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              sortBy === 'price'
                ? 'btn-infrared shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Lowest Price
          </button>
          <button
            onClick={() => setSortBy('duration')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              sortBy === 'duration'
                ? 'btn-infrared shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Shortest Duration
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Filters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="lavender-glass p-6 rounded-3xl border border-purple-200/60 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-purple-200 pb-3">
              <h3 className="font-bold text-purple-950 text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-pink-600" /> Filter Results
              </h3>
              <span className="text-[11px] text-purple-600 font-medium">Reset</span>
            </div>

            {/* Stops Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider">
                Stops
              </label>
              <div className="space-y-1.5 text-xs text-purple-950 font-semibold">
                <label className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-purple-100/50 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    checked={filterStops === 'all'}
                    onChange={() => setFilterStops('all')}
                    className="accent-pink-600"
                  />
                  <span>All Flights ({MOCK_FLIGHTS.length})</span>
                </label>
                <label className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-purple-100/50 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    checked={filterStops === 'direct'}
                    onChange={() => setFilterStops('direct')}
                    className="accent-pink-600"
                  />
                  <span>Direct Non-Stop</span>
                </label>
                <label className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-purple-100/50 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    checked={filterStops === 'stops'}
                    onChange={() => setFilterStops('stops')}
                    className="accent-pink-600"
                  />
                  <span>1 Stop</span>
                </label>
              </div>
            </div>

            {/* Decorator Pattern Reminder */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900 to-slate-900 text-white space-y-2">
              <div className="flex items-center space-x-2 text-pink-400 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Decorator Concept</span>
              </div>
              <p className="text-[11px] text-purple-200/90 leading-relaxed">
                The price shown below is the base ticket price (<code className="text-pink-300">BasicFlightTicket</code>). In the next step, you will wrap this ticket with decorators!
              </p>
            </div>
          </div>
        </div>

        {/* Flight Listings List */}
        <div className="lg:col-span-9 space-y-4">
          {flights.map((flight) => {
            const calculatedPrice = Math.round(flight.basePrice * cabinMultiplier);

            return (
              <div
                key={flight.id}
                className="lavender-glass p-6 rounded-3xl border border-purple-200/70 hover:border-pink-500/80 hover:shadow-2xl transition-all space-y-4 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-100 pb-4">
                  {/* Airline Info */}
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${flight.logoColor} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                      {flight.airline.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-base">
                        {flight.airline}
                      </div>
                      <div className="text-xs text-purple-700 font-mono">
                        {flight.flightNumber} • {flight.aircraft}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                      {flight.stops === 0 ? 'Direct Non-Stop' : `${flight.stops} Stop`}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800">
                      {flight.availableSeats} Seats Left
                    </span>
                  </div>
                </div>

                {/* Times & Route Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center py-2">
                  
                  {/* Departure */}
                  <div className="sm:col-span-4">
                    <div className="text-2xl font-black text-slate-900">
                      {flight.departureTime}
                    </div>
                    <div className="text-xs font-bold text-purple-900">
                      {flight.fromCity} ({flight.from})
                    </div>
                  </div>

                  {/* Flight Duration Visualizer */}
                  <div className="sm:col-span-4 text-center space-y-1">
                    <div className="text-xs font-bold text-purple-700 flex items-center justify-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-pink-600" />
                      {flight.duration}
                    </div>
                    <div className="relative flex items-center justify-center">
                      <div className="w-full h-0.5 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 rounded" />
                      <div className="absolute p-1 rounded-full bg-pink-600 text-white shadow">
                        <Plane className="w-3.5 h-3.5 transform rotate-90" />
                      </div>
                    </div>
                    <div className="text-[10px] text-purple-600 uppercase font-semibold">
                      {flight.stops === 0 ? 'Non-Stop Flight' : '1 Transit Connection'}
                    </div>
                  </div>

                  {/* Arrival */}
                  <div className="sm:col-span-4 text-right">
                    <div className="text-2xl font-black text-slate-900">
                      {flight.arrivalTime}
                    </div>
                    <div className="text-xs font-bold text-purple-900">
                      {flight.toCity} ({flight.to})
                    </div>
                  </div>

                </div>

                {/* Footer Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-purple-100">
                  <div className="text-xs text-purple-700 font-medium flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Includes Basic Ticket Features (Carry-on bag & Standard seating)</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-[10px] text-purple-600 uppercase font-bold">Base Ticket Price</div>
                      <div className="text-2xl font-black text-pink-600 font-mono">
                        ₹{calculatedPrice.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectFlight(flight)}
                      className="px-6 py-3 rounded-2xl btn-infrared text-xs font-bold flex items-center space-x-2 shadow-lg"
                    >
                      <span>Select & Decorate Ticket</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
