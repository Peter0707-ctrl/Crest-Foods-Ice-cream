import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#EA337A] hover:bg-[#D41F66] text-white shadow-[0_6px_20px_rgba(234,51,122,0.38)] flex flex-col items-center justify-center leading-none transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      <ArrowUp className="w-4 h-4 stroke-[2.2]" />
      <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">TOP</span>
    </button>
  );
};
