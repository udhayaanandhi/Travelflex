import React from 'react';
import { 
  Luggage, 
  Utensils, 
  Zap, 
  Coffee, 
  Armchair, 
  ShieldCheck, 
  Check, 
  Plus, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  Plane, 
  Code2
} from 'lucide-react';
import type { Flight, CabinClass, ServiceType } from '../../types/flight';
import type { FlightTicket } from '../../decorator/TicketSystem';
import { TicketFactory } from '../../decorator/TicketSystem';
import { SERVICE_OPTIONS } from '../../data/flights';

interface CustomizeScreenProps {
  flight: Flight;
  cabinClass: CabinClass;
  selectedServices: ServiceType[];
  onToggleService: (serviceId: ServiceType) => void;
  onProceedToReview: () => void;
  onOpenInspector: () => void;
}

export const CustomizeScreen: React.FC<CustomizeScreenProps> = ({
  flight,
  cabinClass,
  selectedServices,
  onToggleService,
  onProceedToReview,
  onOpenInspector
}) => {
  // Instantiate dynamic Decorator Ticket object
  const decoratedTicket: FlightTicket = TicketFactory.createTicket(flight, cabinClass, selectedServices);
  
  const baseCost = Math.round(
    flight.basePrice * (cabinClass === 'Premium' ? 1.25 : cabinClass === 'Business' ? 1.6 : 1)
  );
  const totalCost = decoratedTicket.getCost();
  const addedServicesCost = totalCost - baseCost;
  const breakdownItems = decoratedTicket.getBreakdown();

  // Helper icon renderer
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Luggage': return <Luggage className="w-6 h-6" />;
      case 'Utensils': return <Utensils className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Coffee': return <Coffee className="w-6 h-6" />;
      case 'Armchair': return <Armchair className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      default: return <Plus className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner: Selected Basic Ticket Summary */}
      <div className="lavender-glass p-6 sm:p-8 rounded-3xl border border-purple-300/60 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-200/80 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-md">
              <Plane className="w-6 h-6 transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase font-bold text-pink-600 tracking-wider">
                  Concrete Component: BasicFlightTicket
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
                  {cabinClass} Class
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                {flight.airline} ({flight.flightNumber})
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-purple-700 font-semibold block">Base Ticket Price</span>
            <span className="text-2xl font-black text-slate-900 font-mono">
              ₹{baseCost.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Flight Route Quick View */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-purple-900 pt-1">
          <div>
            Route: <strong className="text-slate-900">{flight.fromCity} ({flight.from})</strong> → <strong className="text-slate-900">{flight.toCity} ({flight.to})</strong>
          </div>
          <div>Departure: <strong className="text-slate-900">{flight.departureTime}</strong></div>
          <div>Aircraft: <strong className="text-slate-900">{flight.aircraft}</strong></div>
        </div>
      </div>

      {/* Main Grid: Left Service Cards, Right Live Decorator Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Selectable Service Decorator Cards */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-pink-600" />
                Customize Your Ticket (Select Decorators)
              </h2>
              <p className="text-xs text-purple-700 mt-0.5">
                Click any service to dynamically add its decorator wrapper around the basic ticket.
              </p>
            </div>

            <button
              onClick={onOpenInspector}
              className="text-xs text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1 bg-pink-50 px-3 py-1.5 rounded-xl border border-pink-200"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Inspect OOP Stack</span>
            </button>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICE_OPTIONS.map((service) => {
              const isSelected = selectedServices.includes(service.id);

              return (
                <div
                  key={service.id}
                  onClick={() => onToggleService(service.id)}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-200 relative overflow-hidden flex flex-col justify-between border ${
                    isSelected
                      ? 'selected-decorator-card'
                      : 'lavender-glass hover:border-purple-300 hover:shadow-lg'
                  }`}
                >
                  {/* Top Row: Icon, Badge & Checkbox */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-2xl transition-colors ${
                      isSelected
                        ? 'bg-pink-600 text-white shadow-md shadow-pink-500/30'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {renderIcon(service.iconName)}
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-pink-500/20 text-pink-700 border border-pink-300'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {service.badge}
                      </span>

                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-pink-600 border-pink-600 text-white'
                          : 'border-purple-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1 mb-4">
                    <h3 className="font-bold text-slate-900 text-base flex items-center justify-between">
                      <span>{service.name}</span>
                    </h3>
                    <p className="text-xs text-purple-800/80 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Price Tag & Class Name Footer */}
                  <div className="pt-3 border-t border-purple-100/70 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                      +{service.decoratorClassName}
                    </span>
                    <span className="text-base font-black text-pink-600 font-mono">
                      +₹{service.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Live Booking Summary & Decorator Chain Diagram */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Dynamic Decorator Visual Pipeline Card */}
          <div className="lavender-glass-dark p-6 rounded-3xl border border-purple-500/30 text-white space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <h3 className="font-bold text-base text-white">Live Decorator Chain</h3>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Pattern Execution
              </span>
            </div>

            {/* Dynamic Visual Chain Pipeline */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-purple-300 flex items-center justify-between">
                <span>Decorator Wrapper Pipeline:</span>
                <span>{selectedServices.length} Decorators Active</span>
              </div>

              {/* Pipeline Flow Badges */}
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-slate-950/80 border border-purple-500/20">
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-purple-600 text-white shadow">
                  Basic Ticket (₹{baseCost.toLocaleString('en-IN')})
                </span>

                {selectedServices.map((serviceId) => {
                  const s = SERVICE_OPTIONS.find(opt => opt.id === serviceId);
                  return (
                    <React.Fragment key={serviceId}>
                      <ArrowRight className="w-3.5 h-3.5 text-pink-400" />
                      <span className="px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md decorator-layer-anim flex items-center gap-1">
                        + {s?.name}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleService(serviceId);
                          }}
                          className="hover:text-purple-200 ml-1 text-[11px]"
                          title="Remove Decorator"
                        >
                          ×
                        </button>
                      </span>
                    </React.Fragment>
                  );
                })}

                <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                <span className="px-3 py-1 rounded-xl text-xs font-black bg-pink-500/20 text-pink-300 border border-pink-500/40">
                  Personalized Ticket
                </span>
              </div>
            </div>

            {/* Price Breakdown Calculation */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Live Cost Breakdown
              </h4>

              <div className="space-y-2 text-xs">
                {breakdownItems.map((item) => (
                  <div 
                    key={item.id}
                    className={`flex items-center justify-between py-1.5 px-3 rounded-xl ${
                      item.type === 'base'
                        ? 'bg-purple-950/60 text-purple-200 font-semibold'
                        : 'bg-pink-950/40 text-pink-200 border border-pink-500/20'
                    }`}
                  >
                    <span>{item.title}</span>
                    <span className="font-mono font-bold">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Calculation Highlight */}
              <div className="pt-4 border-t border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs text-purple-300">
                  <span>Basic Ticket:</span>
                  <span className="font-mono">₹{baseCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-purple-300">
                  <span>Added Decorators ({selectedServices.length}):</span>
                  <span className="font-mono text-pink-400">+₹{addedServicesCost.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-purple-500/20 text-lg font-black text-white">
                  <span>Total Amount:</span>
                  <span className="text-2xl text-pink-400 font-mono">
                    ₹{totalCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <button
              onClick={onProceedToReview}
              className="w-full py-4 rounded-2xl btn-infrared text-sm font-bold flex items-center justify-center space-x-2 shadow-xl"
            >
              <span>Proceed to Ticket Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
