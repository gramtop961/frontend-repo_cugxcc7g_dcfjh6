import React, { useMemo } from 'react';
import { CreditCard, Printer, Receipt, DollarSign } from 'lucide-react';

const formatCurrency = (n) => `$${n.toFixed(2)}`;

const CheckoutPanel = ({ totals, onCheckout, disabled }) => {
  const quickAmounts = useMemo(() => {
    const t = totals.total;
    const roundedUp = Math.ceil(t);
    return [t, roundedUp, roundedUp + 5, roundedUp + 10].map((x) => Number(x.toFixed(2)));
  }, [totals.total]);

  return (
    <div className="rounded-xl border bg-white p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Checkout</h3>
        <span className="text-sm text-gray-500">Due {formatCurrency(totals.total)}</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {quickAmounts.map((amt, i) => (
          <button key={i} className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm">
            {formatCurrency(amt)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button disabled={disabled} onClick={() => onCheckout('cash')} className="col-span-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">
          <DollarSign className="h-5 w-5" /> Cash
        </button>
        <button disabled={disabled} onClick={() => onCheckout('card')} className="col-span-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
          <CreditCard className="h-5 w-5" /> Card
        </button>
        <button disabled className="col-span-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-gray-200 text-gray-700">
          <Receipt className="h-5 w-5" /> Split
        </button>
      </div>

      <div className="flex items-center justify-between">
        <button disabled className="px-3 py-2 rounded-lg border text-sm text-gray-500">Discount</button>
        <button disabled className="px-3 py-2 rounded-lg border text-sm text-gray-500">Note</button>
        <button className="px-3 py-2 rounded-lg border text-sm flex items-center gap-2">
          <Printer className="h-4 w-4" /> Print Receipt
        </button>
      </div>
    </div>
  );
};

export default CheckoutPanel;
