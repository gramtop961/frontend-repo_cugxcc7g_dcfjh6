import React from 'react';
import { Plus } from 'lucide-react';

const ProductGrid = ({ products, onAdd, categories, activeCategory, setActiveCategory, search }) => {
  const filtered = products.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm border transition ${
              activeCategory === cat ? 'bg-indigo-600 text-white border-indigo-600' : 'hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => onAdd(p)}
            className="group relative overflow-hidden rounded-xl border bg-white hover:shadow-md transition focus:outline-none focus:ring-2 ring-indigo-500/40 text-left"
          >
            <div className="aspect-square w-full bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
              <span className="text-4xl">{p.emoji}</span>
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium leading-tight line-clamp-1">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.sku}</p>
                </div>
                <span className="text-sm font-semibold">${p.price.toFixed(2)}</span>
              </div>
            </div>
            <div className="absolute right-2 bottom-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-600 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                <Plus className="h-3.5 w-3.5" /> Add
              </span>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
