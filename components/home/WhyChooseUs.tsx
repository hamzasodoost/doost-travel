import { Shield, Headphones, Globe, CreditCard, Award, Clock } from 'lucide-react';

const features = [
  { icon: Globe, title: 'Global Coverage', desc: '120+ destinations worldwide, with new routes added every month.' },
  { icon: Shield, title: 'Secure Booking', desc: 'PCI-DSS compliant checkout. Your payment data is always protected.' },
  { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock assistance via chat, WhatsApp, or phone.' },
  { icon: CreditCard, title: 'Flexible Payment', desc: 'Pay in full or split into installments — no hidden fees.' },
  { icon: Award, title: 'Best Price Guarantee', desc: "Find it cheaper elsewhere? We'll match the price, no questions asked." },
  { icon: Clock, title: 'Instant Confirmation', desc: 'Real-time availability and instant booking confirmation.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-teal-500 font-semibold text-sm uppercase tracking-widest mb-3">Why Doost Travel</p>
          <h2 className="font-display font-bold text-navy-700 text-4xl lg:text-5xl">
            Travel with<br /><span className="text-teal-500">Total Confidence</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group flex gap-5 p-6 rounded-2xl hover:bg-navy-50 transition-colors">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-500 flex items-center justify-center transition-colors">
                <Icon className="h-6 w-6 text-teal-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy-700 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
