import React from 'react';
import { Plane, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export type ActiveStep = 'search' | 'results' | 'customize' | 'review' | 'confirmation';

interface HeaderProps {
  currentStep: ActiveStep;
  onNavigateStep: (step: ActiveStep) => void;
  onOpenInspector: () => void;
  selectedServicesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onNavigateStep,
  onOpenInspector,
  selectedServicesCount
}) => {
  const steps: { id: ActiveStep; label: string; number: number }[] = [
    { id: 'search', label: 'Flight Search', number: 1 },
    { id: 'results', label: 'Select Flight', number: 2 },
    { id: 'customize', label: 'Customize Ticket', number: 3 },
    { id: 'review', label: 'Review & Details', number: 4 },
    { id: 'confirmation', label: 'Boarding Pass', number: 5 }
  ];

  const getStepStatus = (stepId: ActiveStep) => {
    const order: ActiveStep[] = ['search', 'results', 'customize', 'review', 'confirmation'];
    const currentIndex = order.indexOf(currentStep);
    const stepIndex = order.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-purple-500/20 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Title */}
          <div 
            onClick={() => onNavigateStep('search')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative p-2.5 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 shadow-lg shadow-pink-500/25 group-hover:scale-105 transition-transform">
              <Plane className="w-6 h-6 text-white transform -rotate-45" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-purple-100 to-pink-300 bg-clip-text text-transparent">
                  TravelFlex
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  Decorator Pattern
                </span>
              </div>
              <p className="text-[11px] text-purple-300/80 hidden sm:block">
                Dynamic Flight Ticket Customization Architecture
              </p>
            </div>
          </div>

          {/* Stepper Indicator */}
          <div className="hidden lg:flex items-center space-x-1 py-1 px-3 rounded-2xl bg-slate-950/60 border border-purple-500/20">
            {steps.map((step, idx) => {
              const status = getStepStatus(step.id);
              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => {
                      if (status === 'completed' || status === 'active') {
                        onNavigateStep(step.id);
                      }
                    }}
                    disabled={status === 'upcoming'}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      status === 'active'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/30'
                        : status === 'completed'
                        ? 'text-purple-300 hover:text-white hover:bg-white/5 cursor-pointer'
                        : 'text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      status === 'active'
                        ? 'bg-white text-pink-600'
                        : status === 'completed'
                        ? 'bg-purple-500/30 text-purple-200'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {status === 'completed' ? <CheckCircle2 className="w-3 h-3 text-purple-300" /> : step.number}
                    </span>
                    <span>{step.label}</span>
                  </button>

                  {idx < steps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Presentation Mode Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenInspector}
              className="relative group flex items-center space-x-2 px-4 py-2.5 rounded-xl btn-infrared font-semibold text-xs transition-all"
            >
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
              <span>Inspect Pattern</span>
              {selectedServicesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white text-pink-600 text-[10px] font-bold shadow-inner">
                  +{selectedServicesCount} Decorators
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
