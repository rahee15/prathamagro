import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Shield, Leaf, MapPin, FlaskConical, Sprout, Truck } from 'lucide-react';
import { products, categories } from '../data/products';
import { company } from '../data/company';
import { useLang } from '../context/LangContext';

/* ── Scroll-reveal hook ── */
function useFade(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('js-ready');
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => el.classList.add('visible'), delay); io.disconnect(); } },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

function Fade({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFade(delay);
  return <div ref={ref} className={`fade-in ${className}`}>{children}</div>;
}

const featured = products.filter(p => p.featured).slice(0, 6);

const cropGrid = [
  { name: 'Cotton',      img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&q=75&fit=crop&crop=center' },
  { name: 'Wheat',       img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=75&fit=crop&crop=center' },
  { name: 'Chilli',      img: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&q=75&fit=crop&crop=center' },
  { name: 'Tomato',      img: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&q=75&fit=crop&crop=center' },
  { name: 'Pomegranate', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=75&fit=crop&crop=center' },
  { name: 'Banana',      img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=75&fit=crop&crop=center' },
  { name: 'Paddy',       img: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=400&q=75&fit=crop&crop=center' },
  { name: 'Groundnut',   img: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&q=75&fit=crop&crop=center' },
];

const whyIcons: Record<string, React.ReactNode> = {
  'FCO Approved Products':     <Shield size={20} />,
  'Continuous R&D':            <FlaskConical size={20} />,
  'Eco-Friendly Formulations': <Leaf size={20} />,
  'On-Ground Expert Support':  <Sprout size={20} />,
  'Free Seasonal Samples':     <MapPin size={20} />,
  'Pan India Distribution':    <Truck size={20} />,
};

export default function Home() {
  const { tr } = useLang();

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85&fit=crop&crop=center"
          alt="Farm at golden hour"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-white/90">{tr('nocBadge')}</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-5">
              {tr('heroTitle1')}<br />
              <span className="text-green-300">{tr('heroTitle2')}</span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 max-w-lg font-light">
              {tr('heroDesc')}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary text-sm">
                {tr('exploreProducts')} <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="btn-ghost-white text-sm">
                {tr('findByCrop')}
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-12 pt-10 border-t border-white/15 flex flex-wrap gap-8">
              {[
                { v: '30+',       l: 'Bio Products' },
                { v: '8+',        l: 'Categories' },
                { v: 'Pan India', l: 'Distribution' },
                { v: '🇮🇳',        l: 'Made in India' },
              ].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-extrabold text-white leading-none">{s.v}</div>
                  <div className="text-[11px] font-semibold text-white/50 uppercase tracking-widest mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="trust-bar py-3 px-5 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 sm:gap-10 min-w-max">
          {['✅ FCO Approved', '🇮🇳 Made in India', '🏛️ Govt. of Gujarat Certified', '🚀 Pan India Distribution', '🔬 Expert Agronomy Support'].map(item => (
            <span key={item} className="text-xs font-semibold text-green-200 whitespace-nowrap">{item}</span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Fade className="mb-12">
            <p className="section-label">{tr('ourRange')}</p>
            <div className="accent-line" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {tr('sixCategories')}
            </h2>
          </Fade>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {categories.map((cat, i) => (
              <Fade key={cat.id} delay={i * 50}>
                <Link
                  to={`/products?category=${cat.id}`}
                  className="card-hover group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 sm:p-7"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 flex-shrink-0"
                    style={{ background: cat.bgColor }}>
                    {cat.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug group-hover:text-green-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1 hidden sm:block">{cat.description}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-green-600">
                    {tr('browse')} <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Fade className="mb-12">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <p className="section-label">{tr('topProducts')}</p>
                <div className="accent-line" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                  {tr('flagshipSolutions')}
                </h2>
              </div>
              <Link to="/products" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors">
                {tr('viewAll')} <ChevronRight size={15} />
              </Link>
            </div>
          </Fade>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p, i) => (
              <Fade key={p.id} delay={i * 55}>
                <Link to={`/products/${p.id}`}
                  className="card-hover group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
                  {/* Image / icon panel */}
                  <div className="relative h-44 flex items-center justify-center overflow-hidden"
                    style={{ background: `${p.color}10` }}>
                    {p.image
                      ? <img src={p.image} alt={p.name} className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105" />
                      : <span className="text-6xl">{p.icon}</span>}
                    <span className="absolute top-3 right-3 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {tr('bestSeller')}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: p.color }} />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: p.color }}>
                      {p.category}
                    </p>
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors leading-snug">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-2">{p.tagline}</p>
                    {/* Crop tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {p.crops.slice(0, 3).map(c => (
                        <span key={c} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-500">{c}</span>
                      ))}
                      {p.crops.length > 3 && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-400">+{p.crops.length - 3}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-5 text-sm font-semibold text-green-600">
                      {tr('viewDetails')} <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Fade>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="text-sm font-semibold text-green-700">{tr('viewAll')} →</Link>
          </div>
        </div>
      </section>

      {/* ── CROP FINDER ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Fade>
              <p className="section-label">{tr('cropSolutions')}</p>
              <div className="accent-line" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                {tr('whatsYourCrop')}
              </h2>
              <p className="text-base text-gray-500 leading-relaxed mb-8">{tr('cropDesc')}</p>
              <Link to="/crop-solutions" className="btn-primary inline-flex text-sm">
                {tr('fullCropGuide')} <ArrowRight size={15} />
              </Link>
            </Fade>

            <Fade delay={80}>
              <div className="grid grid-cols-4 gap-2.5">
                {cropGrid.map((crop, i) => (
                  <Link
                    key={crop.name}
                    to={`/crop-solutions?crop=${crop.name}`}
                    className="card-hover group relative overflow-hidden rounded-2xl border border-gray-100"
                    style={{ aspectRatio: '1' }}
                  >
                    <img src={crop.img} alt={crop.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading={i < 4 ? 'eager' : 'lazy'} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <span className="absolute bottom-2 left-0 right-0 text-center text-[11px] font-bold text-white px-1 leading-tight drop-shadow-sm">
                      {crop.name}
                    </span>
                  </Link>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── WHY US (compact) ── */}
      <section className="py-20 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Fade className="mb-12 text-center">
            <p className="section-label">{tr('whyUs')}</p>
            <div className="accent-line mx-auto" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {tr('builtForFarmers')}
            </h2>
          </Fade>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {company.whyChooseUs.map((item, i) => (
              <Fade key={i} delay={i * 45}>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                    {whyIcons[item.title] || <span className="text-xl">{item.icon}</span>}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed hidden sm:block">{item.description}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-dark-green py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { v: '30+',       l: 'Bio Products',      sub: 'Across 7 categories' },
              { v: 'FCO',       l: 'Approved',           sub: 'Govt. of Gujarat' },
              { v: 'Pan India', l: 'Distribution',         sub: 'All states covered' },
              { v: '🇮🇳',        l: 'Made in India',       sub: 'Proudly from Gujarat' },
            ].map((s, i) => (
              <Fade key={i} delay={i * 60}>
                <div>
                  <p className="text-4xl sm:text-5xl font-extrabold text-white leading-none mb-2">{s.v}</p>
                  <p className="text-sm font-bold text-green-300 mb-1">{s.l}</p>
                  <p className="text-xs text-green-500">{s.sub}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEALER CTA ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Fade>
            <div className="cta-gradient rounded-3xl px-8 py-14 sm:px-14 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden">
              {/* decorative circles */}
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-green-500/10 pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-green-400/10 pointer-events-none" />

              <div className="relative text-center sm:text-left max-w-lg">
                <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-3">Dealer & Distributor Network</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                  Grow your business with us
                </h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  Partner with Pratham Agro — 🇮🇳 Made in India, FCO approved bio products trusted by farmers across all states.
                </p>
              </div>

              <div className="relative flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link to="/contact" className="btn-primary text-sm">
                  {tr('contactUs')} <ArrowRight size={15} />
                </Link>
                <Link to="/products" className="btn-ghost-white text-sm">
                  {tr('products')}
                </Link>
              </div>
            </div>
          </Fade>
        </div>
      </section>

    </div>
  );
}
