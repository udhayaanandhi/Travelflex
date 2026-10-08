import type { Flight, CabinClass, ServiceType, PriceBreakdownItem } from '../types/flight';

// 1. Component Interface
export interface FlightTicket {
  getDescription(): string;
  getCost(): number;
  getBreakdown(): PriceBreakdownItem[];
  getDecoratorChain(): string[];
  getBaseFlight(): Flight;
  getCabinClass(): CabinClass;
  getServices(): ServiceType[];
}

// 2. Concrete Component
export class BasicFlightTicket implements FlightTicket {
  private flight: Flight;
  private cabinClass: CabinClass;

  constructor(flight: Flight, cabinClass: CabinClass = 'Economy') {
    this.flight = flight;
    this.cabinClass = cabinClass;
  }

  getDescription(): string {
    return `Basic Ticket (${this.flight.airline} ${this.flight.flightNumber})`;
  }

  getCost(): number {
    let multiplier = 1;
    if (this.cabinClass === 'Premium') multiplier = 1.25;
    if (this.cabinClass === 'Business') multiplier = 1.6;
    return Math.round(this.flight.basePrice * multiplier);
  }

  getBreakdown(): PriceBreakdownItem[] {
    return [
      {
        id: 'base',
        title: `Basic Ticket (${this.flight.airline} - ${this.cabinClass})`,
        price: this.getCost(),
        type: 'base',
        icon: 'Plane'
      }
    ];
  }

  getDecoratorChain(): string[] {
    return ['BasicFlightTicket'];
  }

  getBaseFlight(): Flight {
    return this.flight;
  }

  getCabinClass(): CabinClass {
    return this.cabinClass;
  }

  getServices(): ServiceType[] {
    return [];
  }
}

// 3. Abstract Decorator
export abstract class TicketDecorator implements FlightTicket {
  protected ticket: FlightTicket;

  constructor(ticket: FlightTicket) {
    this.ticket = ticket;
  }

  getDescription(): string {
    return this.ticket.getDescription();
  }

  getCost(): number {
    return this.ticket.getCost();
  }

  getBreakdown(): PriceBreakdownItem[] {
    return this.ticket.getBreakdown();
  }

  getDecoratorChain(): string[] {
    return this.ticket.getDecoratorChain();
  }

  getBaseFlight(): Flight {
    return this.ticket.getBaseFlight();
  }

  getCabinClass(): CabinClass {
    return this.ticket.getCabinClass();
  }

  getServices(): ServiceType[] {
    return this.ticket.getServices();
  }
}

// 4. Concrete Decorators

const BAGGAGE_PRICE = 1500;
const MEAL_PRICE = 500;
const PRIORITY_PRICE = 800;
const LOUNGE_PRICE = 2000;
const SEAT_PRICE = 700;
const ASSISTANCE_PRICE = 1000;

export class BaggageDecorator extends TicketDecorator {
  getDescription(): string {
    return `${super.getDescription()} + Extra Baggage (15kg)`;
  }

  getCost(): number {
    return super.getCost() + BAGGAGE_PRICE;
  }

  getBreakdown(): PriceBreakdownItem[] {
    return [
      ...super.getBreakdown(),
      {
        id: 'baggage',
        title: 'Extra Baggage (+15kg Checked Bag)',
        price: BAGGAGE_PRICE,
        type: 'decorator',
        icon: 'Luggage'
      }
    ];
  }

  getDecoratorChain(): string[] {
    return [...super.getDecoratorChain(), 'BaggageDecorator'];
  }

  getServices(): ServiceType[] {
    return [...super.getServices(), 'baggage'];
  }
}

export class MealDecorator extends TicketDecorator {
  getDescription(): string {
    return `${super.getDescription()} + In-flight Meal`;
  }

  getCost(): number {
    return super.getCost() + MEAL_PRICE;
  }

  getBreakdown(): PriceBreakdownItem[] {
    return [
      ...super.getBreakdown(),
      {
        id: 'meal',
        title: 'Gourmet In-Flight Meal & Refreshments',
        price: MEAL_PRICE,
        type: 'decorator',
        icon: 'Utensils'
      }
    ];
  }

  getDecoratorChain(): string[] {
    return [...super.getDecoratorChain(), 'MealDecorator'];
  }

  getServices(): ServiceType[] {
    return [...super.getServices(), 'meal'];
  }
}

export class PriorityBoardingDecorator extends TicketDecorator {
  getDescription(): string {
    return `${super.getDescription()} + Priority Boarding`;
  }

  getCost(): number {
    return super.getCost() + PRIORITY_PRICE;
  }

  getBreakdown(): PriceBreakdownItem[] {
    return [
      ...super.getBreakdown(),
      {
        id: 'priority',
        title: 'Priority Check-In & Priority Express Boarding',
        price: PRIORITY_PRICE,
        type: 'decorator',
        icon: 'Zap'
      }
    ];
  }

  getDecoratorChain(): string[] {
    return [...super.getDecoratorChain(), 'PriorityBoardingDecorator'];
  }

  getServices(): ServiceType[] {
    return [...super.getServices(), 'priority'];
  }
}

export class LoungeDecorator extends TicketDecorator {
  getDescription(): string {
    return `${super.getDescription()} + Lounge Access`;
  }

  getCost(): number {
    return super.getCost() + LOUNGE_PRICE;
  }

  getBreakdown(): PriceBreakdownItem[] {
    return [
      ...super.getBreakdown(),
      {
        id: 'lounge',
        title: 'Premium VIP Airport Lounge Pass',
        price: LOUNGE_PRICE,
        type: 'decorator',
        icon: 'Coffee'
      }
    ];
  }

  getDecoratorChain(): string[] {
    return [...super.getDecoratorChain(), 'LoungeDecorator'];
  }

  getServices(): ServiceType[] {
    return [...super.getServices(), 'lounge'];
  }
}

export class SeatDecorator extends TicketDecorator {
  getDescription(): string {
    return `${super.getDescription()} + Preferred Seat`;
  }

  getCost(): number {
    return super.getCost() + SEAT_PRICE;
  }

  getBreakdown(): PriceBreakdownItem[] {
    return [
      ...super.getBreakdown(),
      {
        id: 'seat',
        title: 'Preferred Extra-Legroom Seat Selection',
        price: SEAT_PRICE,
        type: 'decorator',
        icon: 'Armchair'
      }
    ];
  }

  getDecoratorChain(): string[] {
    return [...super.getDecoratorChain(), 'SeatDecorator'];
  }

  getServices(): ServiceType[] {
    return [...super.getServices(), 'seat'];
  }
}

export class AssistanceDecorator extends TicketDecorator {
  getDescription(): string {
    return `${super.getDescription()} + Travel Assistance`;
  }

  getCost(): number {
    return super.getCost() + ASSISTANCE_PRICE;
  }

  getBreakdown(): PriceBreakdownItem[] {
    return [
      ...super.getBreakdown(),
      {
        id: 'assistance',
        title: '24/7 Dedicated Concierge & Baggage Assistance',
        price: ASSISTANCE_PRICE,
        type: 'decorator',
        icon: 'ShieldCheck'
      }
    ];
  }

  getDecoratorChain(): string[] {
    return [...super.getDecoratorChain(), 'AssistanceDecorator'];
  }

  getServices(): ServiceType[] {
    return [...super.getServices(), 'assistance'];
  }
}

// 5. Helper Factory & Code Snippet Generator
export class TicketFactory {
  static createTicket(
    flight: Flight,
    cabinClass: CabinClass,
    services: ServiceType[]
  ): FlightTicket {
    let ticket: FlightTicket = new BasicFlightTicket(flight, cabinClass);

    // Dynamic Decorator Stacking
    if (services.includes('baggage')) {
      ticket = new BaggageDecorator(ticket);
    }
    if (services.includes('meal')) {
      ticket = new MealDecorator(ticket);
    }
    if (services.includes('priority')) {
      ticket = new PriorityBoardingDecorator(ticket);
    }
    if (services.includes('lounge')) {
      ticket = new LoungeDecorator(ticket);
    }
    if (services.includes('seat')) {
      ticket = new SeatDecorator(ticket);
    }
    if (services.includes('assistance')) {
      ticket = new AssistanceDecorator(ticket);
    }

    return ticket;
  }

  static getExecutionCodeSnippet(
    flight: Flight,
    cabinClass: CabinClass,
    services: ServiceType[]
  ): string {
    let code = `// Step 1: Instantiating Concrete Component\n`;
    code += `let myTicket: FlightTicket = new BasicFlightTicket(\n`;
    code += `  { flightNumber: "${flight.flightNumber}", route: "${flight.from} -> ${flight.to}", basePrice: ₹${flight.basePrice} },\n`;
    code += `  "${cabinClass}"\n`;
    code += `);\n\n`;

    if (services.length === 0) {
      code += `// No extra decorators selected.\n`;
    } else {
      code += `// Step 2: Dynamically wrapping with selected Decorators\n`;
      services.forEach((s) => {
        if (s === 'baggage') code += `myTicket = new BaggageDecorator(myTicket); // +₹1,500\n`;
        if (s === 'meal') code += `myTicket = new MealDecorator(myTicket); // +₹500\n`;
        if (s === 'priority') code += `myTicket = new PriorityBoardingDecorator(myTicket); // +₹800\n`;
        if (s === 'lounge') code += `myTicket = new LoungeDecorator(myTicket); // +₹2,000\n`;
        if (s === 'seat') code += `myTicket = new SeatDecorator(myTicket); // +₹700\n`;
        if (s === 'assistance') code += `myTicket = new AssistanceDecorator(myTicket); // +₹1,000\n`;
      });
    }

    code += `\n// Step 3: Compute final composite results dynamically\n`;
    code += `console.log(myTicket.getCost()); // => ₹`;
    return code;
  }
}
