import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ChevronRight, Check, Droplets, Sprout, Phone, Mail } from 'lucide-react';
import QRCode from 'react-qr-code';
import { products } from '../data/products';
import { company } from '../data/company';
import { useLang } from '../context/LangContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tr } = useLang();
  const product = products.find(p => p.id === id);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-white text-center">
      <div className="w-20 h-20 rounded-3xl bg-green-50 flex items-center justify-center text-4xl mb-6">🌿</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Product not found</h2>
      <p className="text-sm text-gray-500 mb-6">This product doesn't exist or has been moved.</p>
      <Link to="/products" className="btn-primary text-sm">Browse all products</Link>
    </div>
  );

  const related = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);
  const productUrl = `https://prathamagro.in/products/${product.id}`;

  return (
    <div className="bg-white min-h-screen">

      {/* ── HERO HEADER ── */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${product.color}dd 0%, ${product.color}99 100%)` }}>
        {/* subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/60 mb-8 flex-wrap">
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight size={12} />
            <Link to={`/products?category=${product.categoryId}`} className="hover:text-white transition-colors">
              {product.category}
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/90 font-medium">{product.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/65 mb-1">{product.category}</p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1.5">{product.name}</h1>
              <p className="text-base text-white/65 italic">{product.tagline}</p>
            </div>
            {product.image && (
              <div className="flex-shrink-0 w-40 h-40 sm:w-64 sm:h-64 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}>
                <img src={product.image} alt={product.name} className="w-full h-full object-contain p-3" />
              </div>
            )}
            {!product.image && (
              <div className="flex-shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)' }}>
                <span className="text-5xl sm:text-6xl">{product.icon}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-10">
          <ArrowLeft size={16} /> {tr('backToProducts')}
        </button>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-14">

          {/* Sidebar */}
          <div className="space-y-5">
            {/* QR */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center gap-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{tr('packSizes')} / QR</p>
              <QRCode value={productUrl} size={96} />
              <div className="flex flex-wrap justify-center gap-2 mt-1">
                {product.packaging.map(pk => (
                  <span key={pk} className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50">
                    {pk}
                  </span>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Droplets size={15} className="text-green-600" />
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{tr('ingredients')}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map(ing => (
                  <span key={ing} className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-800 border border-green-100">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Regulatory */}
            <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-green-800 mb-3">FCO Approved</p>
              <div className="space-y-2.5">
                {[
                  ['Manufacturer', company.name],
                  ['Approval', 'FCO Approved'],
                  ['Authority', 'Directorate of Agriculture, Gujarat'],
                  ['Territory', company.territory],
                ].map(([l, v]) => (
                  <div key={l} className="flex gap-2">
                    <span className="text-xs font-bold text-green-700 w-24 flex-shrink-0">{l}</span>
                    <span className="text-xs text-green-900 leading-relaxed">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            <p className="text-base text-gray-600 leading-relaxed">{product.description}</p>

            {/* Benefits */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <Check size={15} className="text-green-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900">{tr('keyBenefits')}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-px">
                      <Check size={11} className="text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700 leading-snug">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dosage */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Droplets size={15} className="text-blue-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900">{tr('dosage')}</h3>
              </div>
              <div className="space-y-2.5">
                {product.dosage.map((d, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-3.5 rounded-xl border border-gray-100 bg-white">
                    <div className="flex items-center gap-2.5 flex-1">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: product.color }} />
                      <span className="text-sm text-gray-700 font-medium">{d.method}</span>
                    </div>
                    <span className="text-sm font-bold rounded-lg px-3 py-1 self-start sm:self-auto"
                      style={{ background: `${product.color}12`, color: product.color }}>
                      {d.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitable Crops */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Sprout size={15} className="text-amber-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900">{tr('suitableCrops')}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.crops.map(crop => (
                  <Link key={crop} to={`/crop-solutions?crop=${crop}`}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors">
                    {crop}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── INQUIRY + CONTACT ── */}
        <div className="border-t border-gray-100 pt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-100 p-7 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1.5">Request Information</h2>
            <p className="text-sm text-gray-500 mb-7">Get pricing, availability, or expert crop advice.</p>

            {sent ? (
              <div className="flex items-start gap-4 p-5 bg-green-50 rounded-xl border border-green-100">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-900 mb-0.5">Inquiry sent!</p>
                  <p className="text-xs text-green-700">We'll reach out within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Name *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name" className="input" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Phone *</label>
                  <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210" className="input" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Message</label>
                  <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Your question or crop challenge…"
                    className="input resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full justify-center text-sm py-3.5">
                  {tr('sendInquiry')}
                </button>
              </form>
            )}
          </div>

          {/* Contact card */}
          <div className="cta-gradient rounded-2xl p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">Direct Contact</p>
              <h3 className="text-xl font-bold text-white mb-7">Talk to our team</h3>
              <div className="space-y-4">
                <a href={`tel:${company.phone}`} className="flex items-center gap-3.5 group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Phone size={16} className="text-green-300" />
                  </div>
                  <span className="text-sm font-medium text-white/85 group-hover:text-green-300 transition-colors">{company.phone}</span>
                </a>
                <a href={`mailto:${company.email}`} className="flex items-center gap-3.5 group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Mail size={16} className="text-green-300" />
                  </div>
                  <span className="text-sm font-medium text-white/85 group-hover:text-green-300 transition-colors break-all">{company.email}</span>
                </a>
              </div>
            </div>
            <p className="text-xs text-white/35 mt-8 leading-relaxed">{company.correspondenceAddress}</p>
          </div>
        </div>

        {/* ── RELATED ── */}
        {related.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5">More in {product.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(rp => (
                <Link key={rp.id} to={`/products/${rp.id}`}
                  className="card-hover group flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-white">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden"
                    style={{ background: `${rp.color}12` }}>
                    {rp.image
                      ? <img src={rp.image} alt={rp.name} className="w-full h-full object-contain p-1" />
                      : rp.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-green-700 transition-colors truncate">{rp.name}</h4>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{rp.tagline}</p>
                  </div>
                  <ChevronRight size={15} className="text-gray-300 flex-shrink-0 group-hover:text-green-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
