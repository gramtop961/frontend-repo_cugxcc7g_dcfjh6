import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import Cart from './components/Cart.jsx';
import CheckoutPanel from './components/CheckoutPanel.jsx';

const PRODUCTS = [
  { id: 'p1', name: 'Espresso', price: 2.5, sku: 'COF-ESP', category: 'Drinks', emoji: '☕️' },
  { id: 'p2', name: 'Cappuccino', price: 3.75, sku: 'COF-CAP', category: 'Drinks', emoji: '🥛' },
  { id: 'p3', name: 'Iced Latte', price: 4.25, sku: 'COF-ICE', category: 'Drinks', emoji: '🧊' },
  { id: 'p4', name: 'Blueberry Muffin', price: 2.95, sku: 'BAK-BLU', category: 'Bakery', emoji: '🧁' },
  { id: 'p5', name: 'Chocolate Croissant', price: 3.25, sku: 'BAK-CHO', category: 'Bakery', emoji: '🥐' },
  { id: 'p6', name: 'Bagel', price: 1.95, sku: 'BAK-BAG', category: 'Bakery', emoji: '🥯' },
  { id: 'p7', name: 'Chicken Sandwich', price: 6.5, sku: 'FD-CHS', category: 'Food', emoji: '🥪' },
  { id: 'p8', name: 'Caesar Salad', price: 7.25, sku: 'FD-CSL', category: 'Food', emoji: '🥗' },
  { id: 'p9', name: 'Water Bottle', price: 1.5, sku: 'DRK-WAT', category: 'Drinks', emoji: '🫗' },
];

function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [lastSale, setLastSale] = useState(null);

  const categories = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.category))), []);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const inc = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const dec = (id) => setCart((prev) => prev.flatMap((i) => (i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i])));
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const tax = subtotal * 0.07; // 7% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [cart]);

  const handleCheckout = (method) => {
    if (cart.length === 0) return;
    const sale = {
      id: `SALE-${Date.now()}`,
      method,
      items: cart,
      totals,
      at: new Date().toLocaleString(),
    };
    setLastSale(sale);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900">
      <Header search={search} setSearch={setSearch} cartCount={cart.reduce((a, b) => a + b.qty, 0)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <ProductGrid
            products={PRODUCTS}
            onAdd={addToCart}
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            search={search}
          />
        </section>

        <aside className="lg:col-span-1 space-y-4">
          <Cart items={cart} onInc={inc} onDec={dec} onRemove={removeItem} totals={totals} />
          <CheckoutPanel totals={totals} onCheckout={handleCheckout} disabled={cart.length === 0} />
        </aside>
      </main>

      {lastSale && (
        <div className="fixed inset-0 z-30 bg-black/30 flex items-end sm:items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-lg overflow-hidden">
            <div className="px-5 py-4 border-b">
              <h3 className="font-semibold">Receipt</h3>
              <p className="text-xs text-gray-500">{lastSale.id} • {lastSale.at} • {lastSale.method.toUpperCase()}</p>
            </div>
            <div className="px-5 py-4 divide-y max-h-80 overflow-auto">
              {lastSale.items.map((i) => (
                <div key={i.id} className="py-2 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-7 w-7 rounded bg-gray-50 grid place-items-center">{i.emoji}</span>
                    <span>{i.name} × {i.qty}</span>
                  </div>
                  <span className="font-medium">${(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-medium">${lastSale.totals.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Tax</span><span className="font-medium">${lastSale.totals.tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-base"><span className="font-semibold">Total</span><span className="font-bold">${lastSale.totals.total.toFixed(2)}</span></div>
            </div>
            <div className="px-5 py-4 bg-gray-50 flex items-center justify-end gap-2">
              <button onClick={() => setLastSale(null)} className="px-4 py-2 rounded-lg border hover:bg-white">Close</button>
              <button onClick={() => window.print()} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Print</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
