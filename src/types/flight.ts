export type CabinClass = 'Economy' | 'Premium' | 'Business';

export type ServiceType = 
  | 'baggage' 
  | 'meal' 
  | 'priority' 
  | 'lounge' 
  | 'seat' 
  | 'assistance';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  basePrice: number;
  aircraft: string;
  logoColor: string;
  availableSeats: number;
}

export interface ServiceOption {
  id: ServiceType;
  name: string;
  price: number;
  iconName: string;
  description: string;
  badge: string;
  decoratorClassName: string;
}

export interface PriceBreakdownItem {
  id: string;
  title: string;
  price: number;
  type: 'base' | 'decorator';
  icon?: string;
}

export interface PassengerDetails {
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
}

export interface Booking {
  bookingId: string;
  flight: Flight;
  passenger: PassengerDetails;
  cabinClass: CabinClass;
  selectedServices: ServiceType[];
  decoratedDescription: string;
  breakdown: PriceBreakdownItem[];
  totalPrice: number;
  decoratorChain: string[];
  bookingDate: string;
}
