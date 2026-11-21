import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryPhoto } from '../data/catalog';

interface LightboxProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  activeIndex,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % photos.length);
      if (e.key === 'ArrowLeft') onNavigate((activeIndex - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, photos.length, onClose, onNavigate]);

  if (activeIndex === null) return null;
  const current = photos[activeIndex];
  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-[#03112E]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close gallery"
        >
          <X className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((activeIndex - 1 + photos.length) % photos.length);
          }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F48C1C] text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((activeIndex + 1) % photos.length);
          }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F48C1C] text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          onClick={(e) => e.stopPropagation()}
          className="max-w-5xl w-full flex flex-col items-center"
        >
          <motion.img
            key={current.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={current.src}
            alt={current.title}
            className="max-h-[72vh] w-auto rounded-2xl shadow-2xl object-contain"
          />

          <div className="mt-5 text-center max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#F6B254] font-semibold">
              {current.category} · {activeIndex + 1} / {photos.length}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">{current.title}</h3>
            <p className="text-sm text-white/70 font-light mt-1.5">{current.caption}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
