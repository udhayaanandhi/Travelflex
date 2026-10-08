# TravelFlex: Personalized Flight Booking System using Decorator Pattern

![TravelFlex Logo](https://img.shields.io/badge/TravelFlex-Decorator%20Pattern-ff2a6d?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss)

**TravelFlex** is a smart, modern flight booking web application designed to demonstrate the **Decorator Design Pattern** in TypeScript and React. It transforms a basic flight ticket into a personalized travel experience by allowing passengers to dynamically add extra baggage, gourmet meals, priority boarding, VIP lounge access, seat preferences, and travel assistance without modifying the underlying basic ticket object or creating class explosion.

---

## 🎯 Core Design Pattern Concept

### Real-World Problem
In traditional subclass inheritance, offering 6 optional flight add-ons (baggage, meal, priority boarding, lounge, seat, assistance) would require creating **2⁶ = 64 distinct subclasses** (e.g. `BaggageMealTicket`, `BaggageLoungeSeatTicket`, etc.). This causes severe **Class Explosion**, rendering the codebase rigid, fragile, and difficult to maintain.

### Decorator Pattern Solution
The Decorator Pattern attaches additional responsibilities to an object dynamically at runtime. TravelFlex requires only **1 Component + 6 Concrete Decorators = 7 classes total**, supporting infinite dynamic service combinations!

```
                       +-----------------------+
                       |    <<interface>>      |
                       |     FlightTicket      |
                       +-----------------------+
                       | + getDescription()    |
                       | + getCost()           |
                       | + getBreakdown()      |
                       | + getDecoratorChain() |
                       +-----------------------+
                                   ^
            +----------------------+----------------------+
            |                                             |
+-----------------------+                     +-----------------------+
|  BasicFlightTicket    |                     |   TicketDecorator     |
| (Concrete Component)  |                     |  (Abstract Decorator) |
+-----------------------+                     +-----------------------+
| - flight: Flight      |                     | # ticket: FlightTicket|
| - cabinClass: Cabin   |                     +-----------------------+
+-----------------------+                                 ^
                                                          |
        +------------------+------------------+-----------+--------+------------------+
        |                  |                  |                    |                  |
+---------------+  +---------------+  +---------------+    +---------------+  +---------------+
|BaggageDecorator|  | MealDecorator |  |PriorityBaggage|    | LoungeDecorator|  | SeatDecorator | ...
+---------------+  +---------------+  +---------------+    +---------------+  +---------------+
```

---

## 🚀 Key Features & Screens

### 1. Home / Flight Search
- Clean airline-booking portal aesthetic with Lavender Pastel & Infrared highlights.
- Route selectors (New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Dubai, London, Singapore).
- Departure/Return dates, Passenger count, and Cabin Class selector (Economy, Premium, Business).

### 2. Flight Results
- Filterable list of available flights showing airline logos, flight numbers, aircraft type, duration, stops, and base prices.
- Sorting options: Lowest Price, Shortest Duration, Earliest Departure.

### 3. Customize Your Ticket (Main Decorator Screen)
- **Selectable Service Cards**:
  - 🧳 **Extra Baggage** — ₹1,500 (`BaggageDecorator`)
  - 🍽️ **In-flight Meal** — ₹500 (`MealDecorator`)
  - ⚡ **Priority Boarding** — ₹800 (`PriorityBoardingDecorator`)
  - ☕ **Lounge Access** — ₹2,000 (`LoungeDecorator`)
  - 🪑 **Preferred Seat** — ₹700 (`SeatDecorator`)
  - 🛡️ **Travel Assistance** — ₹1,000 (`AssistanceDecorator`)
- **Live Decorator Chain Visualizer**:
  `Basic Ticket (₹8,000) → + Baggage (₹1,500) → + Meal (₹500) → + Lounge (₹2,000) → Personalized Ticket`
- Real-time price updating upon toggling any decorator layer.

### 4. Ticket Review & Passenger Info
- Passenger input form (Full Name, Email, Phone, Passport/Govt ID).
- Itemized cost breakdown displaying core base fare and each individual decorator charge.

### 5. Payment & Electronic Boarding Pass
- Checkout simulator (Credit Card, UPI, Net Banking).
- **Printable Boarding Pass**: Includes booking code (`TF-XXXXX-DEC`), flight details, passenger info, list of active privileges, and gate QR Code barcode.

### 6. Design Pattern Inspector (Presentation Mode Modal)
- **Wrapper Stack Diagram**: Animated visual representation of nested runtime objects.
- **Live TS Code Trace**: Real-time TypeScript code snippet reflecting current memory state.
- **UML Class Diagram**: Full architecture diagram.
- **Decorator vs Inheritance Matrix**: Comparative analysis table.

---

## 🎨 Theme & Styling

- **Palette**: Lavender Pastel (`#faf7ff`, `#f2e9ff`, `#e4d3ff`) and Infrared Accents (`#ff2a6d`, `#ff437e`).
- **Styling**: Tailwind CSS v4 + custom CSS glassmorphic layers (`.lavender-glass`, `.btn-infrared`).

---

## 💻 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8 with `@tailwindcss/vite`
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v4

---

## ⚙️ Installation & Usage

1. **Clone or Navigate to Project**:
   ```bash
   cd C:\Users\udhaya\.gemini\antigravity\scratch\travelflex
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📝 License

Created as an academic prototype for Design Patterns presentation & demonstration.
