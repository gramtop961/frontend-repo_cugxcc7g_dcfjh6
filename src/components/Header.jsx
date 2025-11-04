import React from 'react';
import { Store, ShoppingCart, Search, Settings } from 'lucide-react';

const Header = ({ search, setSearch, cartCount }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white flex items-center justify-center shadow">
            <Store className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500 leading-tight">Point of Sale</p>
            <h1 className="text-lg font-semibold tracking-tight">Flames POS</h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search products, SKU, or barcode"
              className="w-full pl-9 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ring-indigo-500/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-lg border px-3 py-2 hover:bg-gray-50">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="rounded-lg border px-3 py-2 hover:bg-gray-50">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
