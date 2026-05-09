import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plane, Package, MapPin, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export const metadata = { title: 'My Dashboard' };

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const stats = {
    total: bookings?.length ?? 0,
    confirmed: bookings?.filter(b => b.status === 'confirmed').length ?? 0,
    pending: bookings?.filter(b => b.status === 'pending').length ?? 0,
    spent: bookings?.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + (b.total_amount ?? 0), 0) ?? 0,
  };

  const statusColor = (status: string) => ({
    confirmed: 'bg-teal-100 text-teal-700',
    pending: 'bg-amber-100 text-amber-700',
    expired: 'bg-red-100 text-red-600',
  }[status] ?? 'bg-gray-100 text-gray-600');

  const statusIcon = (status: string) => status === 'confirmed'
    ? <CheckCircle className="h-3.5 w-3.5" />
    : status === 'pending' ? <Clock className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />;

  const firstName = user.user_metadata?.full_name?.split(' ')[0] ?? user.email?.split('@')[0];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-navy-700 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-2xl">
              {firstName?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-white/60 text-sm">Welcome back,</p>
              <h1 className="font-display font-bold text-white text-2xl">{firstName}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Bookings', value: stats.total, icon: Package, color: 'text-navy-700 bg-navy-50' },
            { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'text-teal-600 bg-teal-50' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-600 bg-amber-50' },
            { label: 'Total Spent', value: formatCurrency(stats.spent), icon: Plane, color: 'text-purple-600 bg-purple-50' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="font-display font-bold text-navy-700 text-2xl mb-1">{value}</div>
              <div className="text-gray-500 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { href: '/flights', icon: Plane, label: 'Search Flights', desc: 'Find and book your next flight', color: 'from-navy-700 to-teal-600' },
            { href: '/packages', icon: Package, label: 'Browse Packages', desc: 'Explore curated travel packages', color: 'from-teal-500 to-teal-700' },
            { href: '/destinations', icon: MapPin, label: 'Destinations', desc: 'Discover new places to visit', color: 'from-gold-500 to-amber-600' },
          ].map(({ href, icon: Icon, label, desc, color }) => (
            <Link key={href} href={href} className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white hover:opacity-90 transition-opacity group`}>
              <Icon className="h-8 w-8 mb-4 opacity-80" />
              <div className="font-display font-bold text-lg mb-1">{label}</div>
              <div className="text-white/70 text-sm mb-4">{desc}</div>
              <div className="flex items-center gap-1 text-sm font-medium">
                Explore <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-display font-bold text-navy-700 text-xl">Recent Bookings</h2>
            <Link href="/dashboard/bookings" className="text-teal-500 hover:text-teal-600 text-sm font-medium flex items-center gap-1">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {bookings && bookings.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {bookings.map((booking) => (
                <div key={booking.id} className="px-6 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center shrink-0">
                    <Plane className="h-5 w-5 text-navy-700 rotate-45" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-navy-700 text-sm truncate">{booking.description ?? 'Flight Booking'}</div>
                    <div className="text-gray-400 text-xs">{formatDate(booking.created_at)}</div>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${statusColor(booking.status)}`}>
                    {statusIcon(booking.status)} {booking.status}
                  </span>
                  <div className="text-navy-700 font-bold text-sm shrink-0">
                    {formatCurrency(booking.total_amount, booking.currency)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <Plane className="h-12 w-12 mx-auto mb-4 opacity-30 rotate-45" />
              <p className="font-medium">No bookings yet</p>
              <p className="text-sm mt-1 mb-6">Your travel history will appear here</p>
              <Link href="/flights" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                Search Flights
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
