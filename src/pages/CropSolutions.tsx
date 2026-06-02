import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { products, cropRecommendations, problemSolutions } from '../data/products';
import { useLang } from '../context/LangContext';

const crops = Object.keys(cropRecommendations);
const problems = Object.keys(problemSolutions);

const cropImgs: Record<string, string> = {
  Cotton:      'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=80&q=70&fit=crop',
  Wheat:       'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=80&q=70&fit=crop',
  Chilli:      'https://images.unsplash.com/photo-1562702978-8c21a21d2453?w=80&q=70&fit=crop',
  Tomato:      'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=80&q=70&fit=crop',
  Banana:      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=80&q=70&fit=crop',
  Pomegranate: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=80&q=70&fit=crop',
  Paddy:       'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=80&q=70&fit=crop',
  Groundnut:   'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=80&q=70&fit=crop',
  Onion:       'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=80&q=70&fit=crop',
  Potato:      'https://images.unsplash.com/photo-1518977676405-d4b776b4e284?w=80&q=70&fit=crop',
  Castor:      '',
  Cumin:       '',
};

const problemIcons: Record<string, string> = {
  'Flower Drop': '🌸', 'Low Yield': '📉', 'Weak Roots': '🌱', 'Poor Germination': '🌰',
  'Fungal Diseases': '🛡️', 'Larval Pests': '🐛', 'Sucking Pests': '🦟',
  'Poor Soil Health': '🌍', 'Low Flowering': '🌼', 'Viral Diseases': '💊',
  'White Fly': '🦟', 'Mites': '🔬',
};

export default function CropSolutions() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<'crop' | 'problem'>('crop');
  const [crop, setCrop] = useState(crops[0]);
  const [problem, setProblem] = useState(problems[0]);
  const [dropOpen, setDropOpen] = useState(false);
  const { tr } = useLang();

  useEffect(() => {
    const c = searchParams.get('crop');
    const p = searchParams.get('problem');
    if (c) { setTab('crop'); const m = crops.find(x => x.toLowerCase() === c.toLowerCase()); if (m) setCrop(m); }
    else if (p) { setTab('problem'); const m = problems.find(x => x.toLowerCase() === p.toLowerCase()); if (m) setProblem(m); }
  }, [searchParams]);

  const active = tab === 'crop' ? crop : problem;
  const list = tab === 'crop' ? crops : problems;

  const recommended = products.filter(p => {
    const ids = tab === 'crop' ? (cropRecommendations[crop] || []) : (problemSolutions[problem] || []);
    return ids.includes(p.id);
  });

  return (
    <div className="bg-white min-h-screen">

      {/* ── HEADER ── */}
      <div className="bg-gradient-to-br from-green-900 to-green-700">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <p className="section-label text-green-300 mb-2">{tr('cropGuide')}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
            {tr('findRightProduct')}
          </h1>
          <p className="text-sm text-white/60 max-w-lg leading-relaxed">
            Select your crop or crop problem — we'll recommend the right bio solution for your needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">

        {/* Tab toggle */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <span className="text-sm font-semibold text-gray-500">Find by:</span>
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
            {(['crop', 'problem'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}>
                {t === 'crop' ? tr('byCrop') : tr('byProblem')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Mobile dropdown */}
          <div className="lg:hidden">
            <button onClick={() => setDropOpen(!dropOpen)}
              className="w-full flex items-center justify-between px-4 py-3.5 border-1.5 border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-800 shadow-sm">
              <span className="flex items-center gap-3">
                {tab === 'crop' && cropImgs[active] ? (
                  <img src={cropImgs[active]} alt={active} className="w-7 h-7 rounded-lg object-cover" />
                ) : (
                  <span className="text-lg">{problemIcons[active] || '🌱'}</span>
                )}
                {active}
              </span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropOpen && (
              <div className="mt-1.5 rounded-xl border border-gray-200 overflow-hidden shadow-xl bg-white">
                {list.map(item => (
                  <button key={item}
                    onClick={() => { tab === 'crop' ? setCrop(item) : setProblem(item); setDropOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-left border-b border-gray-50 last:border-0 transition-colors ${
                      active === item ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-gray-50'
                    }`}>
                    {tab === 'crop' && cropImgs[item] ? (
                      <img src={cropImgs[item]} alt={item} className="w-7 h-7 rounded-lg object-cover flex-shrink-0" />
                    ) : <span className="text-base flex-shrink-0">{problemIcons[item] || '🌱'}</span>}
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="rounded-2xl border border-gray-100 overflow-hidden sticky top-24">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {tab === 'crop' ? 'Select Crop' : 'Select Problem'}
                </p>
              </div>
              <div className="max-h-[60vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                {list.map(item => {
                  const isActive = active === item;
                  return (
                    <button key={item}
                      onClick={() => tab === 'crop' ? setCrop(item) : setProblem(item)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-left border-b border-gray-50 last:border-0 transition-all ${
                        isActive ? 'bg-green-700 text-white' : 'text-gray-600 hover:bg-green-50 hover:text-green-800'
                      }`}>
                      {tab === 'crop' && cropImgs[item] ? (
                        <img src={cropImgs[item]} alt={item} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                      ) : <span className="text-lg flex-shrink-0">{problemIcons[item] || '🌱'}</span>}
                      <span className="truncate">{item}</span>
                      {isActive && <ChevronRight size={14} className="ml-auto flex-shrink-0 text-white/60" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="lg:col-span-9">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 overflow-hidden border border-green-100">
                {tab === 'crop' && cropImgs[active]
                  ? <img src={cropImgs[active]} alt={active} className="w-full h-full object-cover" />
                  : <span className="text-2xl">{problemIcons[active] || '🌱'}</span>
                }
              </div>
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
                  {tab === 'crop' ? `Recommended for ${crop}` : `Solutions for ${problem}`}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {recommended.length} product{recommended.length !== 1 ? 's' : ''} {tr('recommended')}
                </p>
              </div>
            </div>

            {recommended.length === 0 ? (
              <div className="py-16 text-center rounded-2xl border border-dashed border-gray-200 bg-gray-50">
                <div className="text-4xl mb-4">🌱</div>
                <p className="text-base font-bold text-gray-700 mb-2">No recommendations yet</p>
                <p className="text-sm text-gray-500 mb-6">Our team can guide you personally.</p>
                <Link to="/contact" className="btn-primary inline-flex text-sm">
                  {tr('talkToExpert')} <ChevronRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {recommended.map((p, i) => (
                  <Link key={p.id} to={`/products/${p.id}`}
                    className="card-hover group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
                    <div className="h-1" style={{ background: p.color }} />
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
                          style={{ background: `${p.color}15` }}>{p.icon}</div>
                        {i === 0 && (
                          <span className="text-[9px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full uppercase">
                            Top Pick
                          </span>
                        )}
                      </div>
                      <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: p.color }}>
                        {p.category.split('&')[0].trim()}
                      </p>
                      <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-green-700 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 hidden sm:block flex-1">{p.tagline}</p>
                      <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-green-600">
                        {tr('viewDetails')} <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Expert CTA */}
            <div className="bg-cream rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl flex-shrink-0">🔬</div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Need personalised advice?</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Our agronomists recommend the best combination for your soil, climate and crop stage.</p>
              </div>
              <Link to="/contact" className="flex-shrink-0 btn-primary text-sm py-2.5 px-5">
                {tr('talkToExpert')} <ChevronRight size={14} />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
