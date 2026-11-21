import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GALLERY_PHOTOS, type GalleryPhoto } from '../data/catalog';
import { Lightbox } from '../components/Lightbox';

const CATEGORIES: Array<'All' | GalleryPhoto['category']> = [
  'All',
  'Ice Cream',
  'Popcorn',
  'Craft',
  'Events',
];

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<'All' | GalleryPhoto['category']>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered =
    selectedCategory === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#FAF7F2]">
      {/* Dark Editorial Header */}
      <section className="pt-36 pb-16 px-5 sm:px-8 bg-[#051B47] text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#F48C1C]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F6B254]">
              Visual Journal
            </span>
            <span className="h-px w-8 bg-[#F48C1C]" />
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl leading-[1.06]">
            The Crest <span className="italic text-[#F6B254]">Gallery</span>
          </h1>
          <p className="mt-4 text-base text-[#CBD5E1] font-light max-w-xl mx-auto">
            A closer look at our velvety swirls, glossy copper-kettle caramel, kitchen craft, and
            twilight garden celebrations. Click any photograph to inspect in full detail.
          </p>
        </motion.div>
      </section>

      {/* Filter & Grid */}
      <section className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setLightboxIdx(null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#072B75] text-white border-[#072B75] shadow-md'
                    : 'bg-white text-[#051B47] border-[#E4DACB] hover:border-[#072B75]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filtered.map((photo, idx) => (
              <motion.button
                key={photo.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                onClick={() => setLightboxIdx(idx)}
                className={`group relative rounded-2xl overflow-hidden shadow-md cursor-pointer ${
                  photo.span === 'wide' && selectedCategory === 'All'
                    ? 'sm:col-span-2 aspect-[16/10]'
                    : 'aspect-[4/3] h-full'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        photos={filtered}
        activeIndex={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onNavigate={setLightboxIdx}
      />
    </div>
  );
};
