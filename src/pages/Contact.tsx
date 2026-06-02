import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { company } from '../data/company';
import { useLang } from '../context/LangContext';

type Tab = 'general' | 'dealer' | 'distributor';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<Tab>('general');
  const [sent, setSent] = useState(false);
  const { tr } = useLang();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', business: '',
    gst: '', city: '', state: '', crop: '', message: '',
  });

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'dealer') setTab('dealer');
    else if (hash === 'distributor') setTab('distributor');
  }, [searchParams]);

  const f = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const resetForm = () => {
    setSent(false);
    setForm({ name: '', phone: '', email: '', business: '', gst: '', city: '', state: '', crop: '', message: '' });
  };

  const tabs = [
    { id: 'general' as Tab,     label: tr('generalInquiry') },
    { id: 'dealer' as Tab,      label: tr('dealerReg') },
    { id: 'distributor' as Tab, label: tr('distributor') },
  ];

  const contactItems = [
    { Icon: Phone,  label: 'Phone',  value: company.phone,  href: `tel:${company.phone}`,       color: 'text-green-600', bg: 'bg-green-50' },
    { Icon: Mail,   label: 'Email',  value: company.email,  href: `mailto:${company.email}`,     color: 'text-blue-600',  bg: 'bg-blue-50' },
    { Icon: MapPin, label: 'Address', value: company.registeredAddress, href: undefined, color: 'text-amber-600', bg: 'bg-amber-50' },
    { Icon: Clock,  label: 'Hours',  value: 'Mon–Sat, 9 AM–6 PM IST', href: undefined, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* ── HEADER ── */}
      <div className="bg-gradient-to-br from-green-900 to-green-700">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <p className="section-label text-green-300 mb-2">{tr('contact')}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
            {tr('getInTouch')}
          </h1>
          <p className="text-sm text-white/60 max-w-md leading-relaxed">
            Product inquiries, dealer registration, or expert crop advice — we're here to help you grow.
          </p>
        </div>
      </div>

      {/* ── CONTACT INFO CARDS ── */}
      <div className="bg-cream border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {contactItems.map(({ Icon, label, value, href, color, bg }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex gap-3.5 items-start">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={17} className={color} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-green-700 transition-colors break-all leading-snug">
                      {value}
                    </a>
                  ) : (
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── SIDEBAR ── */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-xs font-bold uppercase tracking-widest text-green-800">FCO Approved</p>
              </div>
              <div className="space-y-3">
                {['FCO Approved Products', company.nocAuthority, `Sales Territory: ${company.territory}`].map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check size={12} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-green-800 leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Correspondence</p>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{company.correspondenceAddress}</p>
              <a href="https://maps.google.com/?q=Subhanpura+Vadodara+Gujarat" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 hover:text-green-800 transition-colors">
                <MapPin size={11} /> View on Maps →
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-xl flex-shrink-0">👨‍💼</div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Contact Person</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{company.contactPerson}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Dealer &amp; Distributor</p>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Interested in becoming an authorized dealer or distributor? We offer Pan India distribution rights with competitive margins.
              </p>
              <Link to="/contact#dealer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 hover:text-green-800 transition-colors">
                Apply Now →
              </Link>
            </div>
          </aside>

          {/* ── FORM PANEL ── */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-2 mb-7">
              {tabs.map(t => (
                <button key={t.id} onClick={() => { setTab(t.id); setSent(false); }}
                  className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                    tab === t.id
                      ? 'bg-green-700 text-white border-green-700 shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-green-200 hover:text-green-700'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-7 sm:p-8 shadow-sm">
              {sent ? (
                <div className="py-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-5">✅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h3>
                  <p className="text-sm text-gray-500 mb-7">Our team will reach out within 24–48 hours.</p>
                  <button onClick={resetForm} className="btn-primary text-sm inline-flex">Send another</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Full Name *</label>
                      <input required value={form.name} onChange={f('name')} placeholder="Your name" className="input" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phone *</label>
                      <input required type="tel" value={form.phone} onChange={f('phone')} placeholder="+91 98765 43210" className="input" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                    <input type="email" value={form.email} onChange={f('email')} placeholder="your@email.com (optional)" className="input" />
                  </div>

                  {(tab === 'dealer' || tab === 'distributor') && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Business Name *</label>
                        <input required value={form.business} onChange={f('business')} placeholder="Company / shop name" className="input" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">GST Number</label>
                        <input value={form.gst} onChange={f('gst')} placeholder="Optional" className="input" />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">City / Village *</label>
                      <input required value={form.city} onChange={f('city')} placeholder="e.g. Vadodara, Anand" className="input" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">State *</label>
                      <select value={form.state} onChange={f('state')} className="input">
                        <option value="">Select state</option>
                        {['Gujarat','Maharashtra','Rajasthan','Madhya Pradesh','Uttar Pradesh','Punjab','Haryana','Karnataka','Andhra Pradesh','Tamil Nadu','Telangana','Other'].map(s => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {tab === 'general' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Your Crop</label>
                      <input value={form.crop} onChange={f('crop')} placeholder="e.g. Cotton, Groundnut, Chilli" className="input" />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Message</label>
                    <textarea rows={4} value={form.message} onChange={f('message')}
                      placeholder={tab === 'general' ? 'Describe your crop problem or question…' : 'Tell us about your business and region…'}
                      className="input resize-none" />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center text-sm py-3.5">
                    {tr('sendMessage')}
                  </button>

                  <p className="text-xs text-gray-400 text-center">Your information is used only to respond to your inquiry.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
