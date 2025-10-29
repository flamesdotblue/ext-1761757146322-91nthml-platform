import { useState, useMemo } from 'react';
import Hero from './components/Hero';
import OrdersTable from './components/OrdersTable';
import OrderSummary from './components/OrderSummary';
import Footer from './components/Footer';

// Mock dataset keyed by phone numbers
const MOCK_ORDERS = [
  {
    id: 'ORD-10241',
    phone: '5551112222',
    productName: 'Pro Plan Subscription',
    qty: 1,
    date: '2025-07-12T14:10:00Z',
    price: 29.99,
    currency: 'USD',
    paymentStatus: 'Paid',
    orderStatus: 'Active',
  },
  {
    id: 'ORD-10256',
    phone: '5551112222',
    productName: 'Virtual Card Top-up',
    qty: 1,
    date: '2025-08-02T10:25:00Z',
    price: 120,
    currency: 'USD',
    paymentStatus: 'Paid',
    orderStatus: 'Completed',
  },
  {
    id: 'ORD-10280',
    phone: '5551112222',
    productName: 'Plastic Debit Card',
    qty: 1,
    date: '2025-09-19T09:05:00Z',
    price: 12.5,
    currency: 'USD',
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
  },
  {
    id: 'ORD-20014',
    phone: '9990001234',
    productName: 'Business Premium Plan',
    qty: 1,
    date: '2025-06-03T16:35:00Z',
    price: 99,
    currency: 'USD',
    paymentStatus: 'Paid',
    orderStatus: 'Active',
  },
  {
    id: 'ORD-20028',
    phone: '9990001234',
    productName: 'Team Cards (5 pack)',
    qty: 5,
    date: '2025-09-04T12:00:00Z',
    price: 75,
    currency: 'USD',
    paymentStatus: 'Failed',
    orderStatus: 'On Hold',
  },
];

function fakeFetchOrdersByPhone(phone) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const clean = (phone || '').replace(/\D/g, '');
      const rows = MOCK_ORDERS.filter((o) => o.phone === clean);
      resolve(rows);
    }, 700);
  });
}

export default function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [queryPhone, setQueryPhone] = useState('');

  const handleSearch = async (phone) => {
    setError('');
    const cleaned = (phone || '').replace(/\D/g, '');
    if (!cleaned || cleaned.length < 8) {
      setError('Please enter a valid phone number.');
      setOrders([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fakeFetchOrdersByPhone(cleaned);
      setOrders(res);
      setQueryPhone(cleaned);
      if (res.length === 0) {
        setError('No orders found for this phone number.');
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const summary = useMemo(() => {
    const count = orders.length;
    const paidTotal = orders
      .filter((o) => o.paymentStatus === 'Paid')
      .reduce((acc, o) => acc + o.price, 0);
    const pendingTotal = orders
      .filter((o) => o.paymentStatus === 'Pending')
      .reduce((acc, o) => acc + o.price, 0);
    const lastDate = orders
      .map((o) => new Date(o.date))
      .sort((a, b) => b - a)[0];
    return { count, paidTotal, pendingTotal, lastDate };
  }, [orders]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F9FAFB] to-white text-gray-900">
      <Hero onSearch={handleSearch} loading={loading} error={error} />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 -mt-24 pb-24">
        <div className="relative z-10">
          {orders.length > 0 && (
            <div className="mb-8">
              <OrderSummary
                phone={queryPhone}
                count={summary.count}
                paidTotal={summary.paidTotal}
                pendingTotal={summary.pendingTotal}
                lastDate={summary.lastDate}
              />
            </div>
          )}

          <div className="bg-white/70 backdrop-blur rounded-2xl shadow-sm ring-1 ring-black/5 p-4 sm:p-6">
            <OrdersTable
              orders={orders}
              loading={loading}
              error={error}
            />
          </div>

          <div className="mt-6 text-xs text-gray-500">
            Try demo numbers: 5551112222 or 9990001234
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
