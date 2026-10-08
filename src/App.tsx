import React, { useState } from 'react';
import { Header, type ActiveStep } from './components/Header';
import { PatternInspector } from './components/PatternInspector';
import { SearchScreen } from './components/screens/SearchScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';
import { CustomizeScreen } from './components/screens/CustomizeScreen';
import { ReviewScreen } from './components/screens/ReviewScreen';
import { ConfirmationScreen } from './components/screens/ConfirmationScreen';
import type { Flight, CabinClass, ServiceType, PassengerDetails } from './types/flight';
import { MOCK_FLIGHTS } from './data/flights';
import type { FlightTicket } from './decorator/TicketSystem';
import { TicketFactory } from './decorator/TicketSystem';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ActiveStep>('search');
  const [fromCode, setFromCode] = useState('DEL');
  const [toCode, setToCode] = useState('BOM');
  const [cabinClass, setCabinClass] = useState<CabinClass>('Economy');
  
  const [selectedFlight, setSelectedFlight] = useState<Flight>(MOCK_FLIGHTS[0]);
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>(['baggage', 'meal']);
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+91 98765 43210',
    idNumber: 'P-9872145'
  });

  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  // Instantiated OOP Decorator Ticket Object
  const activeTicket: FlightTicket = TicketFactory.createTicket(
    selectedFlight,
    cabinClass,
    selectedServices
  );

  const handleSearch = (from: string, to: string, cabin: CabinClass) => {
    setFromCode(from);
    setToCode(to);
    setCabinClass(cabin);
    setCurrentStep('results');
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentStep('customize');
  };

  const handleToggleService = (serviceId: ServiceType) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleResetBooking = () => {
    setSelectedServices(['baggage', 'meal']);
    setCurrentStep('search');
  };

  return (
    <div className="min-h-screen bg-[#f7f4fc] text-slate-900 flex flex-col font-sans">
      
      {/* Header Bar */}
      <Header
        currentStep={currentStep}
        onNavigateStep={(step) => setCurrentStep(step)}
        onOpenInspector={() => setIsInspectorOpen(true)}
        selectedServicesCount={selectedServices.length}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {currentStep === 'search' && (
          <SearchScreen onSearch={handleSearch} />
        )}

        {currentStep === 'results' && (
          <ResultsScreen
            fromCode={fromCode}
            toCode={toCode}
            cabinClass={cabinClass}
            onSelectFlight={handleSelectFlight}
            onBackToSearch={() => setCurrentStep('search')}
          />
        )}

        {currentStep === 'customize' && (
          <CustomizeScreen
            flight={selectedFlight}
            cabinClass={cabinClass}
            selectedServices={selectedServices}
            onToggleService={handleToggleService}
            onProceedToReview={() => setCurrentStep('review')}
            onOpenInspector={() => setIsInspectorOpen(true)}
          />
        )}

        {currentStep === 'review' && (
          <ReviewScreen
            flight={selectedFlight}
            cabinClass={cabinClass}
            selectedServices={selectedServices}
            passengerDetails={passengerDetails}
            onChangePassenger={setPassengerDetails}
            onModifyServices={() => setCurrentStep('customize')}
            onProceedToPayment={() => setCurrentStep('confirmation')}
          />
        )}

        {currentStep === 'confirmation' && (
          <ConfirmationScreen
            flight={selectedFlight}
            cabinClass={cabinClass}
            selectedServices={selectedServices}
            passengerDetails={passengerDetails}
            onResetBooking={handleResetBooking}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-purple-500/20 py-8 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-purple-300/80">
          <div>
            <span className="font-bold text-white">TravelFlex</span> — Personalized Flight Booking System using Decorator Pattern
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsInspectorOpen(true)}
              className="hover:text-pink-400 underline transition-colors"
            >
              Open Pattern Inspector
            </button>
            <span>•</span>
            <span>Design Patterns Academic Presentation Prototype</span>
          </div>
        </div>
      </footer>

      {/* Presentation Mode Modal */}
      <PatternInspector
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        activeTicket={activeTicket}
        selectedServices={selectedServices}
        currentFlight={selectedFlight}
        cabinClass={cabinClass}
      />

    </div>
  );
};

export default App;
