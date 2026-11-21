import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/useCart';
import { BRAND_CONFIG } from '../data/catalog';

interface NavItem {
  id: string;
  label: string;
  path: string;
  hash?: string;
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'HOME', path: '/', hash: '#hero-top' },
  { id: 'order', label: 'ORDER', path: '/', hash: '#order-menu' },
  { id: 'delivery', label: 'DELIVERY', path: '/', hash: '#delivery-info' },
  { id: 'about', label: 'ABOUT US', path: '/', hash: '#about-us' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (item: NavItem) => {
    setMobileOpen(false);
    if (location.pathname !== item.path) {
      navigate(item.path);
      setTimeout(() => {
        if (item.hash) {
          document.querySelector(item.hash)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
      return;
    }
    if (item.hash) {
      const el = document.querySelector(item.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DDD0] shadow-[0_6px_28px_rgba(5,27,71,0.06)] py-3'
            : 'bg-gradient-to-b from-black/45 via-black/15 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between gap-6">
          {/* Top-Left Logo — sits directly on hero video without a white box, just like Lala Salama Serengeti */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center transition-transform duration-300 hover:scale-[1.03]"
            aria-label={BRAND_CONFIG.name}
          >
            <img
              src={scrolled ? '/images/crest-logo.png' : '/images/crest-logo-hero.png'}
              alt={BRAND_CONFIG.name}
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? 'h-11 sm:h-12' : 'h-12 sm:h-14'
              }`}
            />
          </Link>

          {/* Top-Right Minimal Navigation Links (Lala Salama Serengeti style): HOME · ORDER · DELIVERY · ABOUT US */}
          <div className="flex items-center gap-6 sm:gap-9">
            <nav className="hidden md:flex items-center gap-8 lg:gap-11" aria-label="Primary">
              {PRIMARY_NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`font-rounded text-[12px] uppercase tracking-[0.25em] font-medium transition-colors cursor-pointer ${
                    scrolled
                      ? 'text-[#051B47] hover:text-[#D41414]'
                      : 'text-white/95 hover:text-[#F6B254] drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Subtle Basket Indicator if user adds items */}
            {totalItems > 0 && (
              <button
                type="button"
                onClick={openDrawer}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all cursor-pointer border ${
                  scrolled
                    ? 'bg-[#072B75] text-white border-[#072B75]'
                    : 'bg-white/15 backdrop-blur-md text-white border-white/40 hover:bg-white/25'
                }`}
                aria-label="Open order basket"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{totalItems}</span>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={`md:hidden p-2 rounded-full transition-colors cursor-pointer ${
                scrolled
                  ? 'text-[#051B47] hover:bg-[#F2EBE0]'
                  : 'text-white bg-black/25 backdrop-blur-sm hover:bg-black/40'
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#051B47] text-[#FAF7F2] flex flex-col justify-between p-6 sm:p-10"
          >
            <div className="flex items-center justify-between">
              <img
                src="/images/crest-logo-hero.png"
                alt={BRAND_CONFIG.name}
                className="h-12 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-full border border-white/20 text-white hover:bg-white/10 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 my-auto py-8">
              {PRIMARY_NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * idx }}
                >
                  <button
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#FAF7F2] hover:text-[#F6B254] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-white/15 pt-6 flex items-center justify-between text-xs text-white/75">
              <span>{BRAND_CONFIG.location}</span>
              <span>{BRAND_CONFIG.hours}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
