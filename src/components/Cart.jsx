import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = ({ items, onInc, onDec, onRemove, totals }) => {
  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <h3 className="font-semibold">Current Sale</h3>
        <span className="text-sm text-gray-500">{items.length} items</span>
      </div>
      <div className="divide-y max-h-[50vh] overflow-auto">
        {items.map((item) => (
          <div key={item.id} className="px-4 py-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center text-lg">
              {item.emoji}
            </div>
            <div className="flex-1">
              <p className="font-medium leading-tight">{item.name}</p>
              <p className="text-xs text-gray-500">{item.sku}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onDec(item.id)} className="h-8 w-8 grid place-items-center rounded-md border hover:bg-gray-50">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-7 text-center font-medium">{item.qty}</span>
              <button onClick={() => onInc(item.id)} className="h-8 w-8 grid place-items-center rounded-md border hover:bg-gray-50">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="w-16 text-right font-semibold">${(item.price * item.qty).toFixed(2)}</div>
            <button onClick={() => onRemove(item.id)} className="ml-2 text-red-500 hover:bg-red-50 border rounded-md h-8 w-8 grid place-items-center">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="px-4 py-10 text-center text-gray-500">Cart is empty</div>
        )}
      </div>

      <div className="px-4 py-3 border-t bg-gray-50 space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${totals.tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-base">
          <span className="font-semibold">Total</span>
          <span className="font-bold">${totals.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
