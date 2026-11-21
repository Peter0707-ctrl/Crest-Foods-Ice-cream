import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  italicWord,
  description,
  align = 'center',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';
  const alignClasses = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  const renderTitle = () => {
    if (!italicWord || !title.includes(italicWord)) return title;
    const parts = title.split(italicWord);
    return (
      <>
        {parts[0]}
        <span className={isDark ? 'text-[#F6B254]' : 'text-[#EA337A]'}>
          {italicWord}
        </span>
        {parts.slice(1).join(italicWord)}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`font-rounded flex flex-col max-w-3xl ${alignClasses} ${className}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-8 bg-[#EA337A]" />
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${
            isDark ? 'text-[#F6B254]' : 'text-[#EA337A]'
          }`}
        >
          {eyebrow}
        </span>
        {align === 'center' && <span className="h-px w-8 bg-[#EA337A]" />}
      </div>

      <h2
        className={`font-rounded text-3xl sm:text-4xl lg:text-[2.85rem] leading-[1.14] font-bold tracking-[-0.01em] ${
          isDark ? 'text-[#FAF7F2]' : 'text-[#080808]'
        }`}
      >
        {renderTitle()}
      </h2>

      {description && (
        <p
          className={`mt-4 text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-2xl font-normal ${
            isDark ? 'text-[#CBD5E1]' : 'text-[#3B383A]'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};
