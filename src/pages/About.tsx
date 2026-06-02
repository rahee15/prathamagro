import { Link } from 'react-router-dom';
import { ArrowRight, Check, Shield, Leaf, FlaskConical, Sprout, Truck } from 'lucide-react';
import { company } from '../data/company';
import { useLang } from '../context/LangContext';

const whyIcons: Record<string, React.ReactNode> = {
  'Eco-Friendly':           <Leaf size={20} />,
  'Cost-Effective':         <FlaskConical size={20} />,
  'Expert Support':         <FlaskConical size={20} />,
  'Custom Solutions':       <Sprout size={20} />,
  'Government Approved':    <Shield size={20} />,
  'Pan India Distribution': <Truck size={20} />,
};

const whyColors: Record<string, string> = {
  'Eco-Friendly':           'bg-emerald-50 text-emerald-600',
  'Cost-Effective':         'bg-amber-50 text-amber-600',
  'Expert Support':         'bg-blue-50 text-blue-600',
  'Custom Solutions':       'bg-lime-50 text-lime-700',
  'Government Approved':    'bg-green-50 text-green-600',
  'Pan India Distribution': 'bg-purple-50 text-purple-600',
};

export default function About() {
  const { tr } = useLang();

  return (
    <div className="bg-white min-h-screen">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=85&fit=crop&crop=center"
          alt="Agricultural research field"
          className="w-full h-64 sm:h-[380px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/65 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
            <p className="section-label text-green-300 mb-3">About Us</p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight max-w-xl leading-tight mb-3">
              {company.name}
            </h1>
            <p className="text-base text-white/65 max-w-md leading-relaxed">{company.tagline}</p>
          </div>
        </div>
      </div>

      {/* ── COMPANY STORY ── */}
      <section className="py-16 sm:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label">Our Story</p>
              <div className="accent-line" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-5">
                Born in Gujarat,<br />grown for India
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-8">{company.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/products" className="btn-primary text-sm">
                  Our Products <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="btn-secondary text-sm">{tr('contactUs')}</Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { v: '30+',       l: 'Bio Products',   d: 'Across 6 categories',  icon: '🧪' },
                { v: 'Pan India', l: 'Sales Auth.',     d: 'All states covered',    icon: '🗺️' },
                { v: 'FCO',       l: 'Approved',         d: 'Govt. of Gujarat',      icon: '✅' },
                { v: '12+',       l: 'Crop Types',      d: 'Field & horticultural', icon: '🌾' },
              ].map((s, i) => (
                <div key={i} className="bg-cream rounded-2xl border border-gray-100 p-6">
                  <span className="text-2xl block mb-3">{s.icon}</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-none mb-1">{s.v}</p>
                  <p className="text-sm font-bold text-gray-700">{s.l}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-16 sm:py-20 border-b border-gray-100 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-10">
            <p className="section-label">Purpose</p>
            <div className="accent-line" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Our mission & vision</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-5">🎯</div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 mb-3">Mission</p>
              <p className="text-base text-gray-800 leading-relaxed font-medium">{company.mission}</p>
            </div>
            <div className="bg-green-800 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-2xl bg-green-700 flex items-center justify-center text-2xl mb-5">🔭</div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-green-300 mb-3">Vision</p>
              <p className="text-base text-white/85 leading-relaxed font-medium">{company.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-16 sm:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-10">
            <p className="section-label">Our Strengths</p>
            <div className="accent-line" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">{tr('builtForFarmers')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {company.whyChooseUs.map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl border border-gray-100 bg-white hover:border-green-200 transition-colors">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${whyColors[item.title] || 'bg-green-50 text-green-600'}`}>
                  {whyIcons[item.title] || <span className="text-xl">{item.icon}</span>}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="py-16 sm:py-20 border-b border-gray-100 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-10">
            <p className="section-label">Certifications</p>
            <div className="accent-line" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-2">
              Government Approved
            </h2>
            <p className="text-sm text-gray-500">NOC issued by {company.nocAuthority} · Valid till {company.nocValidTill}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: 'Approved Bio Fertilizers',  items: company.approvedBioFertilizers,   icon: '🌱', border: 'border-green-200', bg: 'bg-green-50/60' },
              { title: 'Approved Fertilizers',       items: company.approvedFertilizers,       icon: '🧪', border: 'border-blue-200',  bg: 'bg-blue-50/60' },
              { title: 'Chelated Nutrients',         items: company.approvedChelatedNutrients, icon: '⚗️', border: 'border-amber-200', bg: 'bg-amber-50/60' },
            ].map((block, i) => (
              <div key={i} className={`rounded-2xl border ${block.border} ${block.bg} p-6`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{block.icon}</span>
                  <h3 className="text-sm font-bold text-gray-900">{block.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <Check size={12} className="text-green-600 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANY DETAILS ── */}
      <section className="py-16 sm:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="section-label">Manufacturing</p>
              <div className="accent-line" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-5">Made in Gujarat,<br />for India</h2>
              <p className="text-base text-gray-600 leading-relaxed mb-8">
                Our facility in Vadodara, Gujarat follows strict quality protocols and eco-friendly formulation technology with full government compliance.
              </p>
              <div className="space-y-3.5">
                {['State-of-the-art facility in Vadodara, Gujarat', 'Strict quality control at every stage', 'Government-compliant processes', 'Pan India authorised sales'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-green-800">
                <p className="text-xs font-bold uppercase tracking-widest text-green-300">Company Details</p>
              </div>
              {[
                ['Company', company.name], ['Contact Person', company.contactPerson],
                ['District', company.district], ['State', company.state],
                ['Territory', company.territory], ['Approval Authority', company.nocAuthority],
                ['FCO Status', 'Approved'], ['Email', company.email], ['Phone', company.phone],
              ].map(([label, value], i, arr) => (
                <div key={i} className={`flex gap-4 px-5 py-3.5 ${i < arr.length - 1 ? 'border-b border-gray-50' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wide w-28 flex-shrink-0 pt-px">{label}</span>
                  <span className="text-sm text-gray-800 leading-relaxed">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="cta-gradient rounded-3xl px-8 py-14 sm:px-14 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-green-500/10 pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-green-400/10 pointer-events-none" />
            <div className="relative text-center sm:text-left">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                {tr('becomeDealer')}
              </h2>
              <p className="text-sm text-white/55 max-w-sm leading-relaxed">
                Join our growing network across India and earn more with quality bio products farmers trust.
              </p>
            </div>
            <div className="relative flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link to="/contact" className="btn-primary text-sm">
                Get in touch <ArrowRight size={15} />
              </Link>
              <Link to="/products" className="btn-ghost-white text-sm">{tr('products')}</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
