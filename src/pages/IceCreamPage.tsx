import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Snowflake, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';

const ICE_CREAM_FORMATS = [
  { name: 'Artisan Waffle Cone', desc: 'Hand-rolled crisp golden cone baked warm in-house' },
  { name: 'Parlour Cup', desc: 'Generous double serving with waffle shard' },
  { name: 'Take-Home Tub', desc: 'Sealed with insulated cold-chain delivery pack' },
  { name: 'Family Reserve Tub', desc: 'Ideal for family weekends & dinner hosts' },
];

export const IceCreamPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'signature' | 'dairy-free'>('all');

  const iceCreams = PRODUCTS.filter((p) => p.category === 'ice-cream').filter((p) => {
    if (filter === 'signature') return p.featured || p.tag === 'Bestseller';
    if (filter === 'dairy-free') return p.tag === 'Dairy-Free';
    return true;
  });

  return (
    <div className="bg-[#FAF7F2]">
      {/* Page Hero */}
      <section className="relative h-[58vh] min-h-[420px] max-h-[580px] flex items-end overflow-hidden">
        <img
          src="/images/ice-cream-collection.jpg"
          alt="Crest Artisan Ice Cream"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03112E]/92 via-[#051B47]/60 to-[#03112E]/45" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-14 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#F48C1C]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F6B254]">
                Collection 01 · Cold Craft
              </span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-white leading-[1.06]">
              Artisan <span className="italic text-[#F6B254]">Ice Cream</span>
            </h1>
            <p className="mt-4 text-base text-white/80 font-light leading-relaxed">
              Slow-churned small batches and velvety soft-serve swirls made from fresh highland
              cream, whole Madagascar vanilla pods, and sun-ripened regional fruit.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="self-start md:self-end bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl border border-white/80"
          >
            <img
              src="/images/crest-ice-cream-logo.png"
              alt="Crest Ice Cream"
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* Serving Formats Strip */}
      <section className="bg-white border-b border-[#E6DDD0] py-10 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ICE_CREAM_FORMATS.map((fmt) => (
            <div
              key={fmt.name}
              className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE1D3] flex flex-col justify-between"
            >
              <div>
                <p className="font-serif text-xl text-[#051B47]">{fmt.name}</p>
                <p className="text-xs text-[#5A657A] font-light mt-1 leading-relaxed">{fmt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Flavor Catalog */}
      <section className="py-20 sm:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Current Churn"
              title="Explore Every Scoop & Swirl"
              italicWord="Swirl"
            />
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Flavors' },
                { id: 'signature', label: 'House Signatures' },
                { id: 'dairy-free', label: 'Dairy-Free Sorbetto' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFilter(t.id as 'all' | 'signature' | 'dairy-free')}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.16em] border transition-colors cursor-pointer ${
                    filter === t.id
                      ? 'bg-[#072B75] text-white border-[#072B75]'
                      : 'bg-white text-[#051B47] border-[#E4DACB] hover:border-[#072B75]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {iceCreams.map((item, idx) => (
              <ProductCard key={item.id} product={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Cold-Chain Promise Banner */}
      <section className="pb-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto rounded-3xl bg-[#051B47] text-white p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[#F6B254] text-xs font-semibold uppercase tracking-[0.22em]">
              <Snowflake className="w-4 h-4" />
              Chilled-to-Door Guarantee
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl">
              Planning a Party or Pairing With Gourmet Popcorn?
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] font-light leading-relaxed max-w-2xl">
              Every 500ml and 1L tub ships inside insulated thermal packs. Pair your freezer order
              with our copper-kettle caramel or cheddar popcorn for the complete Crest weekend box.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <Link
              to="/popcorn"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F48C1C] hover:bg-[#D41414] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Add Popcorn
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
