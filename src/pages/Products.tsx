import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
import { products, categories } from '../data/products';
import { useLang } from '../context/LangContext';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState(searchParams.get('category') || 'all');
  const { tr } = useLang();

  useEffect(() => {
    const cat = searchParams.get('category');
    setActiveCat(cat || 'all');
  }, [searchParams]);

  const setCat = (id: string) => {
    setActiveCat(id);
    setSearchParams(id === 'all' ? {} : { category: id });
  };

  const filtered = products.filter(p => {
    const matchCat = activeCat === 'all' || p.categoryId === activeCat;
    const q = search.toLowerCase();
    const matchSearch = !q
      || p.name.toLowerCase().includes(q)
      || p.tagline.toLowerCase().includes(q)
      || p.crops.some(c => c.toLowerCase().includes(q))
      || p.ingredients.some(i => i.toLowerCase().includes(q))
      || p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const currentCat = categories.find(c => c.id === activeCat);
  const pills = [{ id: 'all', name: 'All Products', icon: '✦', color: '#16a34a' }, ...categories];

  return (
    <div className="bg-white min-h-screen">

      {/* ── PAGE HEADER ── */}
      <div className="bg-gradient-to-br from-green-900 to-green-700">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <p className="section-label text-green-300 mb-2">{tr('products')}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            {currentCat ? currentCat.name : 'Our Complete Range'}
          </h1>
          <p className="text-sm text-white/60 max-w-xl mb-8 leading-relaxed">
            {currentCat ? currentCat.description : 'Government-approved bio solutions for sustainable, high-yield farming across India.'}
          </p>

          {/* Search bar */}
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products, crops, ingredients…"
              className="w-full pl-11 pr-10 py-3 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/35 focus:outline-none focus:bg-white/15 focus:border-white/40 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── CATEGORY FILTER ── */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {pills.map(p => (
              <button key={p.id} onClick={() => setCat(p.id)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeCat === p.id
                    ? 'bg-green-700 text-white border-green-700 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700'
                }`}>
                <span>{p.icon}</span>
                <span className="whitespace-nowrap">{p.id === 'all' ? 'All' : p.name.split('&')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        <div className="flex items-center gap-3 mb-7">
          <span className="text-sm text-gray-500">
            <span className="font-bold text-gray-900">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
          </span>
          {activeCat !== 'all' && currentCat && (
            <button onClick={() => setCat('all')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors">
              {currentCat.name.split('&')[0].trim()} <X size={11} />
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl mb-5">🔍</div>
            <h3 className="text-base font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-sm text-gray-500 mb-6">Try a different search or category</p>
            <button onClick={() => { setSearch(''); setCat('all'); }} className="btn-primary text-sm">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => (
              <Link key={p.id} to={`/products/${p.id}`}
                className="card-hover group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
                {/* Image / icon panel */}
                <div className="relative h-40 flex items-center justify-center overflow-hidden"
                  style={{ background: `${p.color}12` }}>
                  {p.image
                    ? <img src={p.image} alt={p.name} className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                    : <span className="text-6xl">{p.icon}</span>}
                  {p.featured && (
                    <span className="absolute top-2.5 right-2.5 text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Top
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: p.color }} />
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5 truncate" style={{ color: p.color }}>
                    {p.category.split('&')[0].trim()}
                  </p>
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-green-700 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed flex-1 line-clamp-2 hidden sm:block">{p.tagline}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-green-600">
                    {tr('viewDetails')} <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
