import { CheckCircle, XCircle, Clock, Package } from 'lucide-react';

function PaymentBadge({ status }) {
  const map = {
    Paid: { color: 'text-emerald-700 bg-emerald-50 ring-emerald-200', Icon: CheckCircle },
    Pending: { color: 'text-amber-700 bg-amber-50 ring-amber-200', Icon: Clock },
    Failed: { color: 'text-rose-700 bg-rose-50 ring-rose-200', Icon: XCircle },
  };
  const { color, Icon } = map[status] || map.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${color}`}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 text-sky-800 bg-sky-50 ring-sky-200">
      <Package className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}

export default function OrdersTable({ orders = [], loading, error }) {
  if (loading) {
    return (
      <div className="py-16 flex items-center justify-center text-gray-600">
        Loading your orders…
      </div>
    );
  }

  if (!loading && !orders.length) {
    return (
      <div className="py-16 text-center text-gray-600">
        {error ? (
          <div>{error}</div>
        ) : (
          <div>Enter your phone number above to see your orders.</div>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="py-3 pr-4 font-medium">Order</th>
            <th className="py-3 pr-4 font-medium">Date</th>
            <th className="py-3 pr-4 font-medium">Product</th>
            <th className="py-3 pr-4 font-medium">Qty</th>
            <th className="py-3 pr-4 font-medium">Price</th>
            <th className="py-3 pr-4 font-medium">Payment</th>
            <th className="py-3 pr-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((o) => {
            const date = new Date(o.date);
            return (
              <tr key={o.id} className="text-gray-900">
                <td className="py-3 pr-4 font-medium">{o.id}</td>
                <td className="py-3 pr-4 text-gray-600">{date.toLocaleDateString()}</td>
                <td className="py-3 pr-4">{o.productName}</td>
                <td className="py-3 pr-4">{o.qty}</td>
                <td className="py-3 pr-4">{new Intl.NumberFormat(undefined, { style: 'currency', currency: o.currency || 'USD' }).format(o.price)}</td>
                <td className="py-3 pr-4"><PaymentBadge status={o.paymentStatus} /></td>
                <td className="py-3 pr-4"><StatusBadge status={o.orderStatus} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
