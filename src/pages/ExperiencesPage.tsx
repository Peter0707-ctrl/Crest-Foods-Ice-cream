import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { EXPERIENCES } from '../data/catalog';
import { SectionHeading } from '../components/SectionHeading';

const EVENT_PACKAGES = [
  {
    tier: 'Intimate Gathering',
    guests: 'Boutique Celebration',
    features: [
      'Artisan Ice Cream flavors + warm waffle cones',
      'Gourmet Popcorn apothecary jars',
      'Uniformed Crest host service',
      'Styled tabletop bar setup & napkins',
    ],
  },
  {
    tier: 'Grand Celebration',
    guests: 'Weddings & Receptions',
    featured: true,
    features: [
      'Full Artisan Ice Cream selection + signature swirls',
      'Loaded Gourmet Popcorn Canoes (sweet & savory)',
      'Full timber & deep-navy Crest mobile cart',
      'Dedicated hosts + chilled backup',
    ],
  },
  {
    tier: 'Corporate & Hotel Bespoke',
    guests: 'Custom Scale & Trade',
    features: [
      'Full custom flavor & spice menu curation',
      'Co-branded takeaway popcorn tins & cups',
      'Multi-station rapid-serve hospitality team',
      'Dedicated event coordinator & logistics',
    ],
  },
];

export const ExperiencesPage: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[430px] max-h-[600px] flex items-end overflow-hidden">
        <img
          src="/images/events-catering.jpg"
          alt="Crest Bespoke Events Cart & Hospitality"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03112E]/92 via-[#051B47]/55 to-[#03112E]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-14 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#F48C1C]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F6B254]">
                Crest Experiences · Hospitality
              </span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-white leading-[1.06]">
              Events, Pop-Ups &amp; <span className="italic text-[#F6B254]">Partnerships</span>
            </h1>
            <p className="mt-4 text-base text-white/80 font-light leading-relaxed">
              From candlelit wedding receptions to high-energy corporate launches and safari-lodge
              wholesale supply — we bring unforgettable dessert hospitality anywhere you gather.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Editorial Alternating Experiences */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          {EXPERIENCES.map((exp, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={exp.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}
                >
                  <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(5,27,71,0.13)] aspect-[4/3]">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <span className="font-serif text-4xl italic text-[#F48C1C]">{exp.number}</span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C86E12] mt-2">
                    {exp.subtitle}
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#051B47] mt-2 leading-tight">
                    {exp.title}
                  </h2>
                  <p className="mt-4 text-[15px] text-[#525F75] font-light leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-[#E6DDD0] pt-6">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm text-[#051B47]">
                        <span className="w-5 h-5 rounded-full bg-[#F48C1C]/15 text-[#C86E12] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2.5 mt-8 px-7 py-3.5 rounded-full bg-[#072B75] hover:bg-[#D41414] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
                  >
                    {exp.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Event Packages */}
      <section className="py-24 px-5 sm:px-8 bg-[#051B47] text-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            theme="dark"
            eyebrow="Curated Event Tiers"
            title="Tailored to Your Guest List"
            italicWord="Guest List"
            description="Transparent starting packages — every setup is customized around your colors, schedule, and favorite Crest flavors."
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-7">
            {EVENT_PACKAGES.map((pkg) => (
              <div
                key={pkg.tier}
                className={`rounded-3xl p-8 flex flex-col justify-between border transition-all ${
                  pkg.featured
                    ? 'bg-white text-[#051B47] border-[#F48C1C] shadow-2xl lg:-translate-y-2'
                    : 'bg-white/[0.04] text-white border-white/12'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
                        pkg.featured ? 'text-[#D41414]' : 'text-[#F6B254]'
                      }`}
                    >
                      {pkg.guests}
                    </span>
                    {pkg.featured && (
                      <span className="px-3 py-1 rounded-full bg-[#F48C1C] text-white text-[10px] font-semibold uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-3xl mt-3">{pkg.tier}</h3>

                  <ul className="mt-6 space-y-3 pt-6 border-t border-current/10 text-sm">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            pkg.featured ? 'text-[#D41414]' : 'text-[#F6B254]'
                          }`}
                        />
                        <span className={pkg.featured ? 'text-[#4A566B]' : 'text-[#CBD5E1]'}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className={`mt-8 w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                    pkg.featured
                      ? 'bg-[#D41414] hover:bg-[#072B75] text-white'
                      : 'bg-white/10 hover:bg-[#F48C1C] text-white border border-white/20'
                  }`}
                >
                  Reserve This Package
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
