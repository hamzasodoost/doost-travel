import Link from 'next/link';
import { Plane, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-teal-500 p-2 rounded-lg">
                <Plane className="h-5 w-5 text-white rotate-45" />
              </div>
              <span className="text-white font-display font-bold text-xl">
                Doost<span className="text-gold-400">Travel</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Your trusted travel partner for unforgettable journeys. We craft bespoke experiences that inspire, delight, and create lifelong memories.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-teal-500 flex items-center justify-center transition-colors">
                  <Icon className="h-4 w-4 text-white/70 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/flights', label: 'Search Flights' },
                { href: '/packages', label: 'Tour Packages' },
                { href: '/destinations', label: 'Destinations' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/dashboard', label: 'My Bookings' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-gold-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">Popular Destinations</h4>
            <ul className="space-y-3">
              {['Santorini, Greece', 'Bali, Indonesia', 'Maldives', 'Tokyo, Japan', 'Amalfi Coast, Italy', 'Machu Picchu, Peru'].map((dest) => (
                <li key={dest}>
                  <Link href="/destinations" className="text-white/60 hover:text-gold-400 text-sm transition-colors">
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">123 Travel Avenue, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-teal-400 shrink-0" />
                <a href="tel:+97141234567" className="text-white/60 hover:text-gold-400 text-sm transition-colors">+971 4 123 4567</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-teal-400 shrink-0" />
                <a href="mailto:hello@doosttravel.com" className="text-white/60 hover:text-gold-400 text-sm transition-colors">hello@doosttravel.com</a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/40 mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-teal-500"
                />
                <button className="bg-teal-500 hover:bg-teal-400 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© 2026 Doost Travel. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
