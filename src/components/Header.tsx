import React from 'react';
import { MapPin } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';

export const OrnamentalDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center my-6 gap-3 ${className}`}>
    <div className="h-[1px] flex-1 max-w-[90px] bg-gradient-to-r from-transparent to-gold/60" />
    <svg className="w-8 h-4 text-gold opacity-80" viewBox="0 0 40 20" fill="currentColor">
      <path d="M20 2C20 2 17 8 11 9C17 10 19 14 20 18C21 14 23 10 29 9C23 8 20 2 20 2Z" />
      <circle cx="20" cy="10" r="1.5" />
    </svg>
    <div className="h-[1px] flex-1 max-w-[90px] bg-gradient-to-l from-transparent to-gold/60" />
  </div>
);

export const Header: React.FC = () => {
  return (
    <header className="pt-8 pb-4 px-6 text-center flex flex-col items-center">
      {/* Logo floral con monograma K & C */}
      <div className="relative mb-2 flex justify-center items-center">
        <img
          src={EVENT_CONFIG.logo}
          alt={`Logo Boda ${EVENT_CONFIG.names}`}
          className="w-64 sm:w-72 md:w-80 h-auto object-contain transition-transform duration-500 hover:scale-[1.0]"
        />
      </div>

      {/* Fecha estilizada */}
      <p className="font-serif italic text-lg sm:text-xl text-charcoal/80 tracking-wide mt-1 mb-2">
        {EVENT_CONFIG.date}
      </p>

      <OrnamentalDivider />

      {/* Título de la recepción y lugar */}
      <div className="max-w-lg mx-auto">
        <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal tracking-wide mb-2">
          Asignación de Mesas
        </h1>

        <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-charcoal-light/80 font-light mb-4">
          <MapPin className="w-4 h-4 text-gold-dark flex-shrink-0" />
          <span>{EVENT_CONFIG.venue}</span>
        </div>

        <p className="text-sm md:text-base font-serif italic text-charcoal/80 leading-relaxed px-2">
          «El amor no solo se celebra, se comparte . Ingresa tu nombre para conocer tu lugar en la fiesta.»
        </p>
      </div>
    </header>
  );
};
