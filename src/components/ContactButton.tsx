import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ContactButtonProps {
  className?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ className = '' }) => {
  return (
    <button
      type="button"
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-transform duration-200 hover:scale-105 sm:px-8 sm:py-4 sm:text-base ${className}`}
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.45)',
        filter: 'drop-shadow(-3px -3px 0 #ffffff)',
      }}
    >
      <span>联系我</span>
      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
    </button>
  );
};

export default ContactButton;
