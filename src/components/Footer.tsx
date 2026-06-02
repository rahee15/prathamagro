import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { company } from '../data/company';


export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Link to="/" className="flex items-center mb-5">
              <img src="/logo.png" alt="Pratham Agro Crop Science" className="h-14 w-auto object-contain rounded-xl" />
            </Link>
            <p className="text-xs leading-relaxed mb-5 max-w-[230px]">{company.tagline} — 🇮🇳 Proudly made in India.</p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-900/40 border border-green-800 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-xs font-semibold text-green-300">FCO Approved · Govt. of Gujarat</span>
            </div>
            <div className="mt-5 space-y-2.5">
              <a href={`tel:${company.phone}`} className="flex items-center gap-2 text-xs hover:text-green-400 transition-colors group">
                <Phone size={12} className="text-green-700 group-hover:text-green-400 transition-colors flex-shrink-0" />
                {company.phone}
              </a>

              <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-xs hover:text-green-400 transition-colors group break-all">
                <Mail size={12} className="text-green-700 group-hover:text-green-400 transition-colors flex-shrink-0" />
                {company.email}
              </a>
              <div className="flex items-start gap-2 text-xs">
                <MapPin size={12} className="text-green-700 flex-shrink-0 mt-0.5" />
                {company.registeredAddress}
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-2 md:col-start-6">
            <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-5">Products</p>
            <ul className="space-y-3">
              {[
                ['Bio Stimulants',        '/products?category=bio-stimulants'],
                ['Growth Promoters',      '/products?category=growth-promoters'],
                ['Flowering','/products?category=flowering'],
                ['Soil Conditioners',     '/products?category=soil-health'],
                ['Natural Fungicides/Viricides', '/products?category=fungicides-viricide'],
                ['NPK Fertilizers',       '/products?category=npk-fertilizers'],
                ['Micro Nutrients',       '/products?category=micro-nutrients'],
              ].map(([label, to]) => (
                <li key={to}><Link to={to} className="text-xs hover:text-green-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-5">Company</p>
            <ul className="space-y-3">
              {[['About', '/about'], ['Crop Guide', '/crop-solutions'], ['Products', '/products'], ['Contact', '/contact']].map(([l, to]) => (
                <li key={l}><Link to={to} className="text-xs hover:text-green-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="col-span-2 md:col-span-3">
            <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-5">Certifications</p>
            <div className="space-y-2.5">
              {company.certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs leading-relaxed">{cert}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 rounded-xl bg-green-900/30 border border-green-800/50">
              <p className="text-[10px] font-bold text-green-300 mb-1.5">NOC Authority</p>
              <p className="text-xs leading-relaxed">{company.nocAuthority}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-7 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-xs">© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p className="text-xs">🇮🇳 Made in India · Authorised for {company.territory}</p>
        </div>
      </div>
    </footer>
  );
}
