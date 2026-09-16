'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

interface SearchGuestProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

export const SearchGuest: React.FC<SearchGuestProps> = ({
  onSearch,
  isLoading,
  initialValue = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 350);

    return () => clearTimeout(handler);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(searchTerm);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 mb-6">
      <div className="relative flex items-center w-full">
        {/* Icono de búsqueda posicionado a la izquierda */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold-dark z-10">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-gold" />
          ) : (
            <Search className="w-5 h-5 opacity-70" />
          )}
        </div>

        {/* Input con pl-12 estandarizado para dejar espacio libre entre la lupa y el placeholder */}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Busca por tu nombre o apellido..."
          className="w-full pl-12 pr-12 py-3.5 bg-white border border-gold/40 rounded-full text-charcoal placeholder:text-charcoal-light/50 font-sans text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold shadow-sm transition-all duration-200"
          autoComplete="off"
          spellCheck={false}
        />

        {/* Botón para limpiar búsqueda posicionado a la derecha */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-charcoal/40 hover:text-charcoal transition-colors cursor-pointer z-10"
            title="Limpiar búsqueda"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
