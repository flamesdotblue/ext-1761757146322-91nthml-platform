import { CreditCard, CheckCircle, Clock } from 'lucide-react';

export default function OrderSummary({ phone, count, paidTotal, pendingTotal, lastDate }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded-xl bg-white/70 backdrop-blur p-4 ring-1 ring-black/5 shadow-sm">
        <div className="text-xs text-gray-500">Phone</div>
        <div className="mt-1 text-lg font-semibold tracking-tight">{formatPhone(phone)}</div>
      </div>
      <div className="rounded-xl bg-white/70 backdrop-blur p-4 ring-1 ring-black/5 shadow-sm">
        <div className="text-xs text-gray-500">Orders</div>
        <div className="mt-1 text-lg font-semibold tracking-tight">{count}</div>
      </div>
      <div className="rounded-xl bg-white/70 backdrop-blur p-4 ring-1 ring-black/5 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CheckCircle className="h-4 w-4 text-emerald-600" /> Paid total
        </div>
        <div className="mt-1 text-lg font-semibold tracking-tight">{formatCurrency(paidTotal)}</div>
      </div>
      <div className="rounded-xl bg-white/70 backdrop-blur p-4 ring-1 ring-black/5 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-4 w-4 text-amber-600" /> Pending amount
        </div>
        <div className="mt-1 text-lg font-semibold tracking-tight">{formatCurrency(pendingTotal)}</div>
      </div>
      <div className="rounded-xl bg-white/70 backdrop-blur p-4 ring-1 ring-black/5 shadow-sm sm:col-span-2 lg:col-span-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CreditCard className="h-4 w-4 text-sky-600" /> Last order
        </div>
        <div className="mt-1 text-lg font-semibold tracking-tight">{lastDate ? lastDate.toLocaleString() : '—'}</div>
      </div>
    </section>
  );
}

function formatCurrency(v) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(v || 0);
  } catch {
    return `$${(v || 0).toFixed(2)}`;
  }
}

function formatPhone(p) {
  if (!p) return '—';
  const d = p.replace(/\D/g, '');
  if (d.length === 10) {
    return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  }
  return d;
}
