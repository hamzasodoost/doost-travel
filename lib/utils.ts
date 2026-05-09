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

export const MOCK_HOTELS = [
  {
    id: 'h1', name: 'Burj Al Arab Jumeirah', location: 'Jumeirah Beach Rd, Dubai', city: 'Dubai',
    stars: 5, rating: 9.6, reviews: 4821, pricePerNight: 1299, currency: 'USD',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
    amenities: ['WiFi', 'Pool', 'Breakfast', 'Gym', 'Parking', 'Spa', 'Butler Service', 'Private Beach'],
    description: 'The iconic sail-shaped silhouette of the Burj Al Arab is a defining feature of the Dubai skyline. Offering the ultimate in luxury, each suite features panoramic views of the Arabian Gulf.',
    tag: 'Iconic',
    distanceToCenter: '12 km',
  },
  {
    id: 'h2', name: 'The Ritz-Carlton Tokyo', location: 'Roppongi, Tokyo', city: 'Tokyo',
    stars: 5, rating: 9.4, reviews: 3102, pricePerNight: 750, currency: 'USD',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    amenities: ['WiFi', 'Pool', 'Breakfast', 'Gym', 'Spa', 'Concierge', 'City Views'],
    description: 'Perched on floors 45–53 of the Tokyo Midtown Tower, The Ritz-Carlton Tokyo offers sweeping views of Mount Fuji and the city skyline. Refined Japanese aesthetics meet Western luxury.',
    tag: 'Top Rated',
    distanceToCenter: '5 km',
  },
  {
    id: 'h3', name: 'Canaves Oia Epitome', location: 'Oia, Santorini', city: 'Santorini',
    stars: 5, rating: 9.8, reviews: 1876, pricePerNight: 920, currency: 'USD',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    amenities: ['WiFi', 'Pool', 'Breakfast', 'Spa', 'Sunset Views', 'Private Terrace'],
    description: 'Carved into the volcanic caldera cliffs of Oia, Canaves Oia Epitome offers breathtaking views of the Aegean Sea. Cave suites feature private infinity pools and unrivalled sunset panoramas.',
    tag: 'Best Views',
    distanceToCenter: '2 km',
  },
  {
    id: 'h4', name: 'Four Seasons Resort Bali', location: 'Sayan, Ubud', city: 'Bali',
    stars: 5, rating: 9.5, reviews: 2934, pricePerNight: 680, currency: 'USD',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    amenities: ['WiFi', 'Pool', 'Breakfast', 'Gym', 'Spa', 'Yoga', 'Jungle Views'],
    description: 'Nestled in the lush Ayung River valley, this jungle sanctuary offers villa-style accommodation with private plunge pools. Immerse yourself in Balinese culture with cooking classes and temple visits.',
    tag: 'Nature Retreat',
    distanceToCenter: '8 km',
  },
  {
    id: 'h5', name: 'Soneva Jani', location: 'Noonu Atoll, Maldives', city: 'Maldives',
    stars: 5, rating: 9.9, reviews: 1243, pricePerNight: 2100, currency: 'USD',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    amenities: ['WiFi', 'Pool', 'Breakfast', 'Spa', 'Overwater Villa', 'Snorkeling', 'All-Inclusive'],
    description: 'An overwater paradise in the remote Noonu Atoll, Soneva Jani features retractable roofs for stargazing, water slides into the lagoon, and the clearest waters in the Maldives.',
    tag: 'Luxury',
    distanceToCenter: 'Private Island',
  },
  {
    id: 'h6', name: 'Hotel de Russie', location: 'Via del Babuino, Rome', city: 'Rome',
    stars: 5, rating: 9.2, reviews: 2187, pricePerNight: 495, currency: 'USD',
    image: 'https://images.unsplash.com/photo-1533606688076-b6683a5f5f62?w=800',
    amenities: ['WiFi', 'Pool', 'Breakfast', 'Gym', 'Spa', 'Garden', 'Concierge'],
    description: 'A legendary Roman hotel steps from the Spanish Steps and Piazza del Popolo. The secret garden and terrace have hosted royalty and celebrities for over a century.',
    distanceToCenter: '1 km',
  },
  {
    id: 'h7', name: 'The Siam Hotel', location: 'Dusit, Bangkok', city: 'Bangkok',
    stars: 5, rating: 9.3, reviews: 1654, pricePerNight: 380, currency: 'USD',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    amenities: ['WiFi', 'Pool', 'Breakfast', 'Gym', 'Spa', 'River Views', 'Muay Thai Ring'],
    description: 'A stunning art deco boutique hotel on the banks of the Chao Phraya river. The Siam blends antique Thai artefacts with contemporary design, and features a legendary Muay Thai boxing ring.',
    tag: 'Boutique',
    distanceToCenter: '7 km',
  },
  {
    id: 'h8', name: 'Amangiri', location: 'Canyon Point, Utah', city: 'Utah',
    stars: 5, rating: 9.7, reviews: 987, pricePerNight: 1850, currency: 'USD',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
    amenities: ['WiFi', 'Pool', 'Breakfast', 'Spa', 'Desert Views', 'Helipad', 'Hiking'],
    description: 'Nestled in 600 acres of dramatic canyon landscape, Amangiri is one of the world\'s most extraordinary retreats. Its minimalist suites frame the Utah desert like living art.',
    tag: 'Desert Luxury',
    distanceToCenter: 'Remote',
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
