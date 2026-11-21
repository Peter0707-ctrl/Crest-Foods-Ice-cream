import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../data/catalog';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToSection = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#F6DEEB] text-[#140D11] pt-16 sm:pt-20 overflow-hidden select-none">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        {/* ==================== 1. TOP 3-COLUMN MINIMAL GRID (Pages | Menu | Opening hours) ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 sm:pb-20">
          {/* Column 1: Pages */}
          <div className="md:col-span-3">
            <h3 className="text-[14px] font-medium text-[#140D11] mb-6">Pages</h3>
            <ul className="space-y-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2A1B23]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('#hero-top')}
                  className="hover:text-[#EA337A] transition-colors cursor-pointer uppercase"
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('#about-us')}
                  className="hover:text-[#EA337A] transition-colors cursor-pointer uppercase"
                >
                  ABOUT US
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('#order-menu')}
                  className="hover:text-[#EA337A] transition-colors cursor-pointer uppercase"
                >
                  ORDER
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('#delivery-info')}
                  className="hover:text-[#EA337A] transition-colors cursor-pointer uppercase"
                >
                  DELIVERY
                </button>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#EA337A] transition-colors">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Menu */}
          <div className="md:col-span-3">
            <h3 className="text-[14px] font-medium text-[#140D11] mb-6">Menu</h3>
            <ul className="space-y-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2A1B23]">
              <li>
                <Link to="/ice-cream" className="hover:text-[#EA337A] transition-colors">
                  ICE CREAM
                </Link>
              </li>
              <li>
                <Link to="/popcorn" className="hover:text-[#EA337A] transition-colors">
                  POPCORN
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="hover:text-[#EA337A] transition-colors">
                  EXPERIENCES
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#EA337A] transition-colors">
                  GALLERY
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#EA337A] transition-colors"
                >
                  RESERVATION
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Opening hours (Exact horizontal hairline rows) */}
          <div className="md:col-span-6">
            <h3 className="text-[14px] font-medium text-[#140D11] mb-6">Opening hours</h3>
            <div className="border-t border-[#DFBFD1] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2A1B23]">
              <div className="flex items-center justify-between py-4 border-b border-[#DFBFD1]">
                <span>MONDAY — THURSDAY</span>
                <span>10 AM - 9 PM</span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-[#DFBFD1]">
                <span>FRIDAY — SATURDAY</span>
                <span>10 AM - 11 PM</span>
              </div>
              <div className="flex items-center justify-between py-4">
                <span>SUNDAY</span>
                <span>11 AM - 10 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== 2. MIDDLE COPYRIGHT & SOCIALS BAR BETWEEN TWO HAIRLINES ==================== */}
        <div className="border-y border-[#DFBFD1] py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11.5px] text-[#2A1B23]">
          <p className="font-medium">
            © {BRAND_CONFIG.shortName} — {CURRENT_YEAR}. All rights reserved.
          </p>

          <div className="flex items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.14em]">
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#EA337A] transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#EA337A] transition-colors"
            >
              TIKTOK
            </a>
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#EA337A] transition-colors"
            >
              WHATSAPP
            </a>
          </div>
        </div>
      </div>

      {/* ==================== 3. GIANT CROPPED BOTTOM WORDMARK ("CREST" LIKE "ASCENT") ==================== */}
      <div className="max-w-[1240px] mx-auto px-4 pt-8 sm:pt-10 overflow-hidden">
        <div
          aria-hidden="true"
          className="font-sans font-extrabold uppercase text-[#140D11] text-[22vw] sm:text-[18.5vw] lg:text-[225px] leading-[0.74] tracking-[-0.03em] text-center whitespace-nowrap -mb-[0.06em]"
        >
          CREST
        </div>
      </div>
    </footer>
  );
};
