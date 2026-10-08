import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Sparkles, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  Boxes,
  HelpCircle
} from 'lucide-react';
import type { FlightTicket } from '../decorator/TicketSystem';
import { TicketFactory } from '../decorator/TicketSystem';
import type { Flight, CabinClass, ServiceType } from '../types/flight';
import { SERVICE_OPTIONS } from '../data/flights';

interface PatternInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  activeTicket: FlightTicket | null;
  selectedServices: ServiceType[];
  currentFlight: Flight;
  cabinClass: CabinClass;
}

export const PatternInspector: React.FC<PatternInspectorProps> = ({
  isOpen,
  onClose,
  activeTicket,
  selectedServices,
  currentFlight,
  cabinClass
}) => {
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'uml' | 'comparison'>('visualizer');

  if (!isOpen) return null;

  const currentChain = activeTicket ? activeTicket.getDecoratorChain() : ['BasicFlightTicket'];
  const totalCost = activeTicket ? activeTicket.getCost() : currentFlight.basePrice;
  const executionCode = TicketFactory.getExecutionCodeSnippet(currentFlight, cabinClass, selectedServices);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 via-purple-950/60 to-slate-900 border-b border-purple-500/20">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Decorator Pattern Inspector
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-medium">
                  Live Presentation Mode
                </span>
              </h2>
              <p className="text-xs text-purple-300/80">
                Inspect how TravelFlex wraps objects dynamically without class explosion
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 pt-2 space-x-2">
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'visualizer'
                ? 'border-pink-500 text-pink-400 bg-pink-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Wrapper Stack Diagram</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'code'
                ? 'border-pink-500 text-pink-400 bg-pink-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Live TS Execution Trace</span>
          </button>

          <button
            onClick={() => setActiveTab('uml')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'uml'
                ? 'border-pink-500 text-pink-400 bg-pink-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>UML Class Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'comparison'
                ? 'border-pink-500 text-pink-400 bg-pink-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Decorator vs Inheritance</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-950/30">
          
          {/* TAB 1: VISUALIZER */}
          {activeTab === 'visualizer' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-purple-200 text-sm">
                <p className="font-medium">💡 Core Decorator Insight:</p>
                <p className="text-purple-300/80 mt-1">
                  Each selected service acts as an outer shell wrapping the inner ticket object. 
                  When <code className="text-pink-300 font-mono">getCost()</code> is called, the request cascades inward from the outermost decorator down to the core <code className="text-pink-300 font-mono">BasicFlightTicket</code>!
                </p>
              </div>

              {/* Dynamic Stack Visualizer */}
              <div className="flex flex-col items-center justify-center p-8 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs uppercase tracking-widest text-pink-400 font-bold">
                  Active Runtime Object Composition ({currentChain.length} Layers)
                </h3>

                <div className="w-full max-w-xl flex flex-col items-center space-y-3">
                  {currentChain.map((className, index) => {
                    const isBase = className === 'BasicFlightTicket';
                    const matchedService = SERVICE_OPTIONS.find(s => s.decoratorClassName === className);
                    
                    return (
                      <div
                        key={`${className}-${index}`}
                        className={`w-full p-4 rounded-xl transition-all flex items-center justify-between border ${
                          isBase
                            ? 'bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border-purple-400 text-purple-100 shadow-lg shadow-purple-950/50'
                            : 'bg-gradient-to-r from-slate-800 to-slate-850 border-pink-500/50 text-white shadow-md shadow-pink-950/20'
                        }`}
                        style={{
                          transform: `scale(${1 - (currentChain.length - 1 - index) * 0.02})`,
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            isBase ? 'bg-purple-500 text-white' : 'bg-pink-500 text-white'
                          }`}>
                            {index + 1}
                          </span>
                          <div>
                            <div className="font-mono font-bold text-sm flex items-center gap-2">
                              {className}
                              {isBase ? (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-400/20 text-purple-300 border border-purple-400/30">
                                  Concrete Component
                                </span>
                              ) : (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                                  Concrete Decorator
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400">
                              {isBase 
                                ? `Base Route: ${currentFlight.from} → ${currentFlight.to} (${cabinClass})`
                                : `Adds service: ${matchedService?.name || 'Decorator Extra'}`}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-bold text-pink-400">
                            {isBase ? `₹${currentFlight.basePrice}` : `+₹${matchedService?.price}`}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {isBase ? 'Core Object' : 'Wraps previous'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-800 w-full max-w-xl flex items-center justify-between text-sm font-bold text-white">
                  <span>Composite Total (myTicket.getCost()):</span>
                  <span className="text-xl text-pink-400 font-mono">₹{totalCost.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE CODE */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-pink-400" />
                  TypeScript Memory Instantiation Trace
                </h3>
                <span className="text-xs text-slate-400">Dynamically generated from current state</span>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-sm leading-relaxed overflow-x-auto text-pink-300">
                <pre className="text-slate-200">{executionCode}</pre>
                <div className="text-pink-400 font-bold mt-1">
                  {totalCost.toLocaleString('en-IN')}); // Output calculated dynamically!
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: UML ARCHITECTURE */}
          {activeTab === 'uml' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-200">Decorator Pattern Class Diagram</h3>

              <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 space-y-6">
                
                {/* Interface */}
                <div className="w-64 mx-auto p-4 rounded-xl bg-purple-950/80 border-2 border-purple-400 text-center font-mono shadow-lg">
                  <div className="text-xs text-purple-300 italic">«interface»</div>
                  <div className="font-bold text-purple-100 text-base">FlightTicket</div>
                  <div className="text-left text-xs text-purple-200/90 mt-2 space-y-1 border-t border-purple-700/50 pt-2">
                    <div>+ getDescription(): string</div>
                    <div>+ getCost(): number</div>
                    <div>+ getBreakdown(): Item[]</div>
                  </div>
                </div>

                <div className="flex justify-center space-x-12">
                  {/* Concrete Component */}
                  <div className="w-64 p-4 rounded-xl bg-slate-850 border border-purple-500/40 font-mono text-center shadow-md">
                    <div className="text-xs text-purple-400">Concrete Component</div>
                    <div className="font-bold text-white text-sm">BasicFlightTicket</div>
                    <div className="text-left text-xs text-slate-400 mt-2 border-t border-slate-700 pt-2">
                      <div>- flight: Flight</div>
                      <div>- cabinClass: CabinClass</div>
                      <div className="mt-1 text-pink-400">+ getCost(): basePrice</div>
                    </div>
                  </div>

                  {/* Abstract Decorator */}
                  <div className="w-64 p-4 rounded-xl bg-slate-850 border border-pink-500/40 font-mono text-center shadow-md">
                    <div className="text-xs text-pink-400">Abstract Decorator</div>
                    <div className="font-bold text-white text-sm">TicketDecorator</div>
                    <div className="text-left text-xs text-slate-400 mt-2 border-t border-slate-700 pt-2">
                      <div className="text-pink-300"># ticket: FlightTicket</div>
                      <div className="mt-1">+ getCost(): ticket.getCost()</div>
                    </div>
                  </div>
                </div>

                {/* Concrete Decorators Grid */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
                    Concrete Decorator Subclasses (Stackable Features)
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {SERVICE_OPTIONS.map((s) => {
                      const isSelected = selectedServices.includes(s.id);
                      return (
                        <div
                          key={s.id}
                          className={`p-3 rounded-lg border text-center font-mono text-xs transition-all ${
                            isSelected
                              ? 'bg-pink-500/20 border-pink-500 text-pink-300 font-bold shadow-md shadow-pink-500/20'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="text-[10px] text-slate-500">{s.decoratorClassName}</div>
                          <div>{s.name} (+₹{s.price})</div>
                          {isSelected && (
                            <span className="inline-block mt-1 text-[9px] px-2 py-0.5 rounded bg-pink-500 text-white">
                              Active Wrapper
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: COMPARISON */}
          {activeTab === 'comparison' && (
            <div className="grid grid-cols-2 gap-6">
              
              {/* Without Decorator */}
              <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-4">
                <div className="flex items-center space-x-2 text-red-400 font-bold">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Without Decorator (Class Explosion)</span>
                </div>

                <p className="text-xs text-slate-300">
                  Using traditional subclass inheritance for 6 optional flight features creates 
                  <strong className="text-red-400"> 2⁶ = 64 unique classes</strong>!
                </p>

                <div className="bg-slate-950 p-3 rounded-lg border border-red-500/20 font-mono text-xs text-red-300 space-y-1">
                  <div>class BaggageTicket extends BasicTicket {}</div>
                  <div>class BaggageMealTicket extends BasicTicket {}</div>
                  <div>class BaggageMealLoungeTicket extends BasicTicket {}</div>
                  <div>class BaggageMealLoungeSeatTicket extends ...</div>
                  <div className="text-slate-500 italic">... 60 more classes!</div>
                </div>

                <div className="text-xs text-red-300/80">
                  ❌ Rigid, unmaintainable, and impossible to scale when new services are added.
                </div>
              </div>

              {/* With Decorator */}
              <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>With Decorator Pattern (TravelFlex)</span>
                </div>

                <p className="text-xs text-slate-300">
                  Using Decorator composition requires only 
                  <strong className="text-emerald-400"> 1 Component + 6 Decorators = 7 classes</strong> total!
                </p>

                <div className="bg-slate-950 p-3 rounded-lg border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-1">
                  <div>1. Component: BasicFlightTicket</div>
                  <div>2. Abstract Decorator: TicketDecorator</div>
                  <div>3. 6 Concrete Decorators (Baggage, Meal...)</div>
                  <div className="text-emerald-400 font-bold mt-2">
                    Infinite combinations at runtime!
                  </div>
                </div>

                <div className="text-xs text-emerald-300/80">
                  ✅ Highly flexible, reusable, follows Open/Closed Principle!
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            TravelFlex Architecture presentation mode active
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl btn-infrared text-xs font-bold"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
