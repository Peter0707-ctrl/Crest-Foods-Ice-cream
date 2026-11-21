import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Gift, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/useCart';

const POPCORN_FORMATS = [
  { name: 'Loaded Treat Pouch', desc: 'Resealable gourmet snack pouch · Solo indulgence' },
  { name: 'Sharing Dessert Box', desc: 'Generous movie-night sharing box' },
  { name: 'Signature Popcorn Canoe', desc: 'Our iconic loaded dessert canoe platter' },
  { name: 'Party Canoe Platter', desc: 'Grand event centerpiece for celebrations' },
];

const CANOE_SPOTLIGHT = [
  {
    id: 'pc-cookies-cream',
    title: 'Cookies & Cream',
    subtitle: 'White Chocolate · Oreo Crumble & Chunks',
    image: '/images/popcorn-cookies-cream.jpg',
  },
  {
    id: 'pc-strawberry-shortcake',
    title: 'Strawberry Shortcake',
    subtitle: 'Ruby Berry Glaze · Shortcake & Pink Kisses',
    image: '/images/popcorn-strawberry-shortcake.jpg',
  },
  {
    id: 'pc-birthday-cake',
    title: 'Birthday Cake Confetti',
    subtitle: 'Vanilla Glaze · Rainbow Sprinkles & Cookies',
    image: '/images/popcorn-birthday-cake.jpg',
  },
];

export const PopcornPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'loaded' | 'classic'>('all');
  const { openProductModal } = useCart();

  const popcorns = PRODUCTS.filter((p) => p.category === 'popcorn').filter((p) => {
    if (filter === 'loaded')
      return ['pc-cookies-cream', 'pc-strawberry-shortcake', 'pc-birthday-cake', 'pc-zebra-chocolate'].includes(p.id);
    if (filter === 'classic')
      return ['pc-salted-caramel', 'pc-savory-duo'].includes(p.id);
    return true;
  });

  return (
    <div className="bg-[#FAF7F2]">
      {/* Page Hero */}
      <section className="relative h-[60vh] min-h-[430px] max-h-[600px] flex items-end overflow-hidden">
        <img
          src="/images/popcorn-canoes-hero.jpg"
          alt="Crest Loaded Gourmet Popcorn Canoes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03112E]/92 via-[#051B47]/58 to-[#03112E]/45" />

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
                Collection 02 · Loaded Dessert Canoes &amp; Kettle Corn
              </span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-white leading-[1.06]">
              Loaded Gourmet <span className="italic text-[#F6B254]">Popcorn</span>
            </h1>
            <p className="mt-4 text-base text-white/80 font-light leading-relaxed">
              Lavishly drizzled in white &amp; dark chocolate, crowned with crushed cookies,
              shortcake crumble, rainbow sprinkles, and chocolate kisses — served in treat pouches
              and our showstopping <strong className="text-white font-medium">Signature Popcorn Canoes</strong>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="self-start md:self-end bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl border border-white/80"
          >
            <img
              src="/images/crest-logo.png"
              alt="Crest Food & Beverage"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* Formats Strip */}
      <section className="bg-white border-b border-[#E6DDD0] py-10 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POPCORN_FORMATS.map((fmt) => (
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

      {/* Signature Loaded Popcorn Canoes Trio Spotlight */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 bg-[#F2EBE0]/65 border-b border-[#E6DDD0]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Our Viral Centerpieces"
            title="The Signature Popcorn Canoes"
            italicWord="Popcorn Canoes"
            description="Elongated dessert boats overflowing with hand-drizzled chocolate, cookie crunch, and festive toppings — click any canoe to pick your size and order."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {CANOE_SPOTLIGHT.map((canoe, idx) => {
              const matched = PRODUCTS.find((p) => p.id === canoe.id);
              return (
                <motion.button
                  key={canoe.id}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onClick={() => matched && openProductModal(matched)}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/3] text-left shadow-lg cursor-pointer"
                >
                  <img
                    src={canoe.image}
                    alt={canoe.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03112E]/90 via-[#051B47]/30 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D41414] text-white text-[10px] font-semibold uppercase tracking-[0.18em]">
                    <Sparkles className="w-3 h-3" />
                    Signature Canoe
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#F6B254] font-semibold">
                      {canoe.subtitle}
                    </p>
                    <h3 className="font-serif text-3xl mt-1 group-hover:text-[#F6B254] transition-colors">
                      {canoe.title}
                    </h3>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Popcorn Catalog */}
      <section className="py-20 sm:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Fresh From Our Dessert Table"
              title="Loaded Dessert & Kettle Creations"
              italicWord="Loaded Dessert"
            />
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Varieties' },
                { id: 'loaded', label: 'Loaded Dessert Canoes' },
                { id: 'classic', label: 'Caramel & Savory Classics' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFilter(t.id as 'all' | 'loaded' | 'classic')}
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
            {popcorns.map((item, idx) => (
              <ProductCard key={item.id} product={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Event Canoes & Gifting Callout */}
      <section className="pb-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto rounded-3xl bg-[#051B47] text-white p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[#F6B254] text-xs font-semibold uppercase tracking-[0.22em]">
              <Flame className="w-4 h-4" />
              Custom Color-Matched Canoes · Events &amp; Birthdays
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl">
              Custom-Styled Popcorn Canoes for Your Celebration
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] font-light leading-relaxed max-w-2xl">
              Hosting a birthday, bridal shower, wedding reception, or corporate launch? We build
              bespoke loaded popcorn canoe spreads matched to your event colors, cookies, and
              chocolate drizzles.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D41414] hover:bg-[#F48C1C] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
            >
              <Gift className="w-3.5 h-3.5" />
              Order Custom Canoes
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
