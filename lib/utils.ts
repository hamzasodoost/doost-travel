import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string, currency = 'USD') {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(num);
}

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
}

export function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
}

export const POPULAR_AIRPORTS = [
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE' },
  { code: 'LHR', name: 'Heathrow', city: 'London', country: 'UK' },
  { code: 'JFK', name: 'John F. Kennedy', city: 'New York', country: 'USA' },
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
  { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
  { code: 'SIN', name: 'Changi', city: 'Singapore', country: 'Singapore' },
  { code: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok', country: 'Thailand' },
  { code: 'AMS', name: 'Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'FCO', name: 'Fiumicino', city: 'Rome', country: 'Italy' },
  { code: 'BCN', name: 'El Prat', city: 'Barcelona', country: 'Spain' },
  { code: 'SYD', name: 'Kingsford Smith', city: 'Sydney', country: 'Australia' },
  { code: 'NRT', name: 'Narita', city: 'Tokyo', country: 'Japan' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA' },
  { code: 'MXP', name: 'Malpensa', city: 'Milan', country: 'Italy' },
  { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' },
];

export const DESTINATIONS = [
  {
    id: '1', name: 'Santorini', country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    price: 1299, rating: 4.9, reviews: 2341, tag: 'Romantic',
    description: 'Iconic white-washed villages perched above the azure Aegean Sea.',
  },
  {
    id: '2', name: 'Bali', country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    price: 899, rating: 4.8, reviews: 4123, tag: 'Adventure',
    description: 'Emerald rice terraces, ancient temples, and spiritual tranquility.',
  },
  {
    id: '3', name: 'Maldives', country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    price: 2499, rating: 5.0, reviews: 1876, tag: 'Luxury',
    description: 'Crystal-clear lagoons and overwater bungalows in the Indian Ocean.',
  },
  {
    id: '4', name: 'Tokyo', country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    price: 1599, rating: 4.9, reviews: 3211, tag: 'Cultural',
    description: 'Where ancient temples meet futuristic skylines in perfect harmony.',
  },
  {
    id: '5', name: 'Amalfi Coast', country: 'Italy',
    image: 'https://images.unsplash.com/photo-1533606688076-b6683a5f5f62?w=800',
    price: 1799, rating: 4.8, reviews: 1654, tag: 'Scenic',
    description: 'Dramatic cliffs, pastel villages, and the sparkling Mediterranean.',
  },
  {
    id: '6', name: 'Machu Picchu', country: 'Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
    price: 1399, rating: 4.9, reviews: 2890, tag: 'Adventure',
    description: 'The lost Incan citadel hidden in the clouds of the Andes.',
  },
];

export const PACKAGES = [
  {
    id: '1', title: 'Greek Islands Escape', destination: 'Santorini & Mykonos',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    duration: '8 days / 7 nights', price: 2299, originalPrice: 2899,
    rating: 4.9, reviews: 456, included: ['Flights', 'Hotels', 'Transfers', 'Breakfast'],
    tag: 'Best Seller',
  },
  {
    id: '2', title: 'Bali Serenity Package', destination: 'Ubud & Seminyak',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    duration: '10 days / 9 nights', price: 1699, originalPrice: 2100,
    rating: 4.8, reviews: 312, included: ['Flights', 'Villa', 'Transfers', 'Spa Day'],
    tag: 'Popular',
  },
  {
    id: '3', title: 'Japan Cultural Journey', destination: 'Tokyo, Kyoto & Osaka',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    duration: '12 days / 11 nights', price: 3199, originalPrice: 3800,
    rating: 5.0, reviews: 789, included: ['Flights', 'Hotels', 'Bullet Train', 'Guide'],
    tag: 'Premium',
  },
  {
    id: '4', title: 'Maldives Honeymoon', destination: 'North Male Atoll',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    duration: '7 days / 6 nights', price: 4299, originalPrice: 5200,
    rating: 5.0, reviews: 234, included: ['Flights', 'Overwater Villa', 'All Meals', 'Snorkeling'],
    tag: 'Luxury',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5,
    text: 'Doost Travel made our honeymoon in the Maldives absolutely magical. Every detail was perfect — from the private villa to the sunset dinner on the beach.',
    destination: 'Maldives Package',
  },
  {
    name: 'James Thornton',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    text: 'I\'ve used many travel agencies but none come close to Doost. The Japan itinerary was flawlessly planned — temples, food, culture, all perfectly paced.',
    destination: 'Japan Cultural Journey',
  },
  {
    name: 'Amira Al-Hassan',
    location: 'Dubai, UAE',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 5,
    text: 'Booked the Greek Islands package and it exceeded every expectation. The team was responsive 24/7 and handled everything seamlessly.',
    destination: 'Greek Islands Escape',
  },
];
