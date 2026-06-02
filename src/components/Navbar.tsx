import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLang, langLabels, type Lang } from '../context/LangContext';

const LANGS: Lang[] = ['en', 'gu', 'ta', 'kn'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { lang, setLang, tr } = useLang();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const navLinks = [
    { to: '/products',       label: tr('products') },
    { to: '/crop-solutions', label: tr('cropGuide') },
    { to: '/about',          label: tr('about') },
  ];

  return (
    <>
      {/* Top announcement bar */}
      <div className="trust-bar px-4 py-2 text-center">
        <p className="text-xs font-medium text-green-200 tracking-wide">
          🌿 &nbsp;{tr('nocBadge')}&nbsp; · &nbsp;Pan India Authorised&nbsp; 🌿
        </p>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] border-b border-gray-100'
            : 'bg-white border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 mr-auto">
            <img src="/logo.png" alt="Pratham Agro Crop Science" className="h-10 w-auto object-contain" />
            <div className="flex flex-col justify-center gap-0.5">
              <div className="text-[18px] font-bold text-gray-900 tracking-tight leading-none">Pratham Agro</div>
              <div className="text-[12px] text-green-600 font-semibold tracking-wider uppercase leading-none">Crop Science</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(l => {
              const active = pathname === l.to || pathname.startsWith(l.to + '/');
              return (
                <Link key={l.to} to={l.to}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    active ? 'text-green-700 bg-green-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Language switcher */}
          <div className="hidden sm:flex items-center gap-1 border border-gray-200 rounded-lg p-1">
            {LANGS.map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`lang-pill ${lang === l ? 'active' : ''}`}
              >
                {langLabels[l]}
              </button>
            ))}
          </div>

          {/* Contact CTA */}
          <Link to="/contact" className="btn-primary hidden lg:inline-flex py-2.5 px-5 text-sm">
            {tr('contactUs')}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-5 py-4 shadow-lg">
            <div className="space-y-1 mb-4">
              {navLinks.map(l => (
                <Link key={l.to} to={l.to}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === l.to ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                  {l.label}
                </Link>
              ))}
            </div>
            {/* Mobile language switcher */}
            <div className="flex items-center gap-1.5 mb-3 border border-gray-200 rounded-lg p-1 w-fit">
              {LANGS.map(l => (
                <button key={l} onClick={() => setLang(l)} className={`lang-pill ${lang === l ? 'active' : ''}`}>
                  {langLabels[l]}
                </button>
              ))}
            </div>
            <Link to="/contact" className="btn-primary w-full justify-center">
              {tr('contactUs')}
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
