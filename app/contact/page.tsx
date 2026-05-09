'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-navy-700 py-16 px-4 text-center">
        <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-3">Get in Touch</p>
        <h1 className="font-display font-bold text-white text-5xl mb-4">Contact Us</h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto">Our travel experts are ready to help plan your perfect journey. Reach out anytime.</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: MapPin, title: 'Our Office', info: '123 Travel Ave, Dubai, UAE' },
              { icon: Phone, title: 'Phone', info: '+971 4 123 4567' },
              { icon: Mail, title: 'Email', info: 'hello@doosttravel.com' },
            ].map(({ icon: Icon, title, info }) => (
              <div key={title} className="flex gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0"><Icon className="h-5 w-5 text-teal-500" /></div>
                <div><div className="font-semibold text-navy-700 text-sm mb-0.5">{title}</div><div className="text-gray-500 text-sm">{info}</div></div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center shadow-sm">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-5"><Send className="h-8 w-8 text-teal-500" /></div>
                <h3 className="font-display font-bold text-navy-700 text-2xl mb-2">Message Sent!</h3>
                <p className="text-gray-500">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Your Name</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" /></div>
                  <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" /></div>
                </div>
                <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Subject</label>
                  <input required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="How can we help?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" /></div>
                <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us about your travel plans..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 resize-none" /></div>
                <button type="submit" className="w-full bg-navy-700 hover:bg-teal-500 text-white font-semibold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
