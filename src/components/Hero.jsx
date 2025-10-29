import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Phone, Search } from 'lucide-react';

export default function Hero({ onSearch, loading, error }) {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(phone);
  };

  return (
    <section className="relative w-full" style={{ minHeight: '60vh' }}>
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80 pointer-events-none" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8 py-14">
        <div className="w-full">
          <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-black/5 mb-4">
            <Phone className="h-3.5 w-3.5 mr-2 text-teal-600" />
            Secure Order Lookup
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight">
            View your orders with your phone number
          </h1>
          <p className="mt-3 max-w-2xl text-gray-700">
            Enter the phone number used at checkout to see order details, payment status, and delivery progress.
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex w-full max-w-xl items-stretch rounded-xl bg-white/80 backdrop-blur ring-1 ring-black/5 shadow-sm overflow-hidden">
              <div className="pl-3 flex items-center text-gray-500">
                <Phone className="h-5 w-5" />
              </div>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-3 outline-none bg-transparent placeholder:text-gray-400 text-gray-900"
                aria-label="Phone number"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-gray-900 text-white px-4 sm:px-5 py-3 hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="h-4 w-4" />
                {loading ? 'Searching…' : 'Search'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-3 text-sm text-rose-600">{error}</div>
          )}
        </div>
      </div>
    </section>
  );
}
