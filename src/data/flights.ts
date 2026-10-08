import type { Flight, ServiceOption } from '../types/flight';

export const POPULAR_AIRPORTS = [
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi Intl Airport' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj Intl' },
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda Intl Airport' },
  { code: 'MAA', city: 'Chennai', name: 'Chennai Intl Airport' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi Intl Airport' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai Intl Airport' },
  { code: 'LHR', city: 'London', name: 'Heathrow Airport' },
  { code: 'SIN', city: 'Singapore', name: 'Changi Airport' },
];

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: 'fl-101',
    airline: 'TravelFlex SkyExpress',
    flightNumber: 'TF-402',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    departureTime: '06:00 AM',
    arrivalTime: '08:15 AM',
    duration: '2h 15m',
    stops: 0,
    basePrice: 8000,
    aircraft: 'Airbus A320neo',
    logoColor: 'from-purple-500 to-indigo-600',
    availableSeats: 14
  },
  {
    id: 'fl-102',
    airline: 'IndigoWing Airways',
    flightNumber: 'IW-819',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    departureTime: '09:30 AM',
    arrivalTime: '11:45 AM',
    duration: '2h 15m',
    stops: 0,
    basePrice: 7500,
    aircraft: 'Boeing 737 MAX',
    logoColor: 'from-pink-500 to-rose-600',
    availableSeats: 8
  },
  {
    id: 'fl-103',
    airline: 'StarAero Jet',
    flightNumber: 'SA-214',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    departureTime: '01:15 PM',
    arrivalTime: '03:40 PM',
    duration: '2h 25m',
    stops: 0,
    basePrice: 8500,
    aircraft: 'Airbus A321neo',
    logoColor: 'from-violet-600 to-purple-800',
    availableSeats: 22
  },
  {
    id: 'fl-104',
    airline: 'Oceanic Airlines',
    flightNumber: 'OA-904',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    departureTime: '05:45 PM',
    arrivalTime: '09:10 PM',
    duration: '3h 25m',
    stops: 1,
    basePrice: 6800,
    aircraft: 'Boeing 787 Dreamliner',
    logoColor: 'from-cyan-500 to-blue-600',
    availableSeats: 5
  },
  {
    id: 'fl-201',
    airline: 'TravelFlex SkyExpress',
    flightNumber: 'TF-601',
    from: 'BLR',
    fromCity: 'Bengaluru',
    to: 'MAA',
    toCity: 'Chennai',
    departureTime: '07:10 AM',
    arrivalTime: '08:10 AM',
    duration: '1h 00m',
    stops: 0,
    basePrice: 4500,
    aircraft: 'Airbus A320neo',
    logoColor: 'from-purple-500 to-indigo-600',
    availableSeats: 18
  },
  {
    id: 'fl-202',
    airline: 'Horizon Air',
    flightNumber: 'HA-308',
    from: 'BLR',
    fromCity: 'Bengaluru',
    to: 'HYD',
    toCity: 'Hyderabad',
    departureTime: '10:00 AM',
    arrivalTime: '11:15 AM',
    duration: '1h 15m',
    stops: 0,
    basePrice: 5200,
    aircraft: 'Boeing 737-800',
    logoColor: 'from-fuchsia-500 to-pink-600',
    availableSeats: 12
  },
  {
    id: 'fl-301',
    airline: 'Emirates Global',
    flightNumber: 'EK-506',
    from: 'BOM',
    fromCity: 'Mumbai',
    to: 'DXB',
    toCity: 'Dubai',
    departureTime: '04:30 PM',
    arrivalTime: '06:45 PM',
    duration: '3h 45m',
    stops: 0,
    basePrice: 18500,
    aircraft: 'Airbus A380-800',
    logoColor: 'from-amber-500 to-red-600',
    availableSeats: 30
  }
];

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'baggage',
    name: 'Extra Baggage',
    price: 1500,
    iconName: 'Luggage',
    description: 'Add +15kg check-in baggage allowance with priority handling tag.',
    badge: 'Popular',
    decoratorClassName: 'BaggageDecorator'
  },
  {
    id: 'meal',
    name: 'In-flight Meal',
    price: 500,
    iconName: 'Utensils',
    description: 'Pre-book your favorite gourmet meal with complimentary hot/cold beverage.',
    badge: 'Chef Special',
    decoratorClassName: 'MealDecorator'
  },
  {
    id: 'priority',
    name: 'Priority Boarding',
    price: 800,
    iconName: 'Zap',
    description: 'Skip long airport queues with dedicated express security check-in & priority gate entry.',
    badge: 'Express',
    decoratorClassName: 'PriorityBoardingDecorator'
  },
  {
    id: 'lounge',
    name: 'Lounge Access',
    price: 2000,
    iconName: 'Coffee',
    description: 'Unlimited gourmet buffet, high-speed WiFi, showers, and relaxed seating at airport VIP lounges.',
    badge: 'VIP Service',
    decoratorClassName: 'LoungeDecorator'
  },
  {
    id: 'seat',
    name: 'Preferred Seat',
    price: 700,
    iconName: 'Armchair',
    description: 'Choose front-row or exit-row seats with extra legroom and window/aisle guarantee.',
    badge: 'Comfort+',
    decoratorClassName: 'SeatDecorator'
  },
  {
    id: 'assistance',
    name: 'Travel Assistance',
    price: 1000,
    iconName: 'ShieldCheck',
    description: 'Dedicated airport assistant, priority baggage transfer, and zero-cancellation protection.',
    badge: 'Peace of Mind',
    decoratorClassName: 'AssistanceDecorator'
  }
];
