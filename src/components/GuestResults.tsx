import React from 'react';
import { Utensils, Sparkles, RefreshCw, Heart, ChevronRight, SearchX, HelpCircle } from 'lucide-react';
import { Invitado, SearchStatus } from '@/types/invitado';
import { OrnamentalDivider } from './Header';

interface GuestResultsProps {
  status: SearchStatus;
  searchResults: Invitado[];
  selectedGuest: Invitado | null;
  searchTerm: string;
  onSelectGuest: (guest: Invitado) => void;
  onResetSearch: () => void;
}

export const GuestResults: React.FC<GuestResultsProps> = ({
  status,
  searchResults,
  selectedGuest,
  searchTerm,
  onSelectGuest,
  onResetSearch,
}) => {
  // Estado inicial
  if (status === 'idle') {
    return (
      <div className="w-full max-w-lg mx-auto px-4 mb-8 text-center animate-fade-in-scale">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold/30 shadow-sm">
          <div className="flex justify-center text-gold-dark mb-2">
            <Sparkles className="w-6 h-6 text-gold animate-pulse-subtle" />
          </div>
          <h2 className="font-serif text-2xl text-charcoal mb-2 font-normal">
            ¿Cómo funciona la búsqueda?
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-light/80 leading-relaxed font-light mb-6">
            Escribe tu nombre en la barra superior. El sistema consultará la lista oficial para asignarte tu mesa.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gold/15 text-center text-xs">
            <div>
              <span className="font-serif text-gold-dark text-xl block font-medium">1</span>
              <span className="text-charcoal-light text-[11px]">Escribe tu nombre</span>
            </div>
            <div>
              <span className="font-serif text-gold-dark text-xl block font-medium">2</span>
              <span className="text-charcoal-light text-[11px]">Ubica tu mesa</span>
            </div>
            <div>
              <span className="font-serif text-gold-dark text-xl block font-medium">3</span>
              <span className="text-charcoal-light text-[11px]">¡A disfrutar!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Estado No Encontrado
  if (status === 'not-found') {
    return (
      <div className="w-full max-w-lg mx-auto px-4 mb-8 animate-fade-in-scale">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold/30 shadow-sm text-center">
          <div className="mx-auto w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold-dark mb-4">
            <SearchX className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal mb-1">
            No encontramos tu reservación
          </h2>

          <p className="text-xs text-charcoal-light/70 uppercase tracking-widest font-sans mb-3">
            Búsqueda realizada: «{searchTerm}»
          </p>

          <OrnamentalDivider className="my-3" />

          <div className="text-sm text-charcoal/80 space-y-3 my-4 font-light leading-relaxed">
            <p>
              Te recomendamos verificar la ortografía o intentar buscando únicamente tu primer nombre o apellido.
            </p>
            <div className="pt-2 text-xs text-left flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-eucalyptus flex-shrink-0 mt-0.5" />
              <p className="text-charcoal-light">
                <strong className="font-medium text-charcoal">¿Continúas sin encontrar tu mesa?</strong><br />
                Acércate a nuestro equipo de protocolo, te asistirá con mucho gusto.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onResetSearch}
            className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gold hover:bg-gold-dark text-white text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Intentar otra búsqueda</span>
          </button>
        </div>
      </div>
    );
  }

  // Estado Múltiples Resultados (Estandarizado 100% alineado a la izquierda)
  if (status === 'success' && !selectedGuest && searchResults.length > 1) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 mb-8 animate-fade-in-scale">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold/30 shadow-sm text-center">
          <p className="text-xs uppercase tracking-widest text-eucalyptus font-semibold mb-1">
            Coincidencias Encontradas ({searchResults.length})
          </p>
          <h3 className="font-serif text-xl text-charcoal mb-4">
            Por favor, selecciona tu nombre de la lista:
          </h3>

          <div className="space-y-2 text-left max-h-64 overflow-y-auto pr-1">
            {searchResults.map((invitado) => (
              <button
                key={invitado.id}
                type="button"
                onClick={() => onSelectGuest(invitado)}
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl border border-gold/20 hover:border-gold/60 transition-all duration-200 group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3 text-left flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold-dark font-serif text-sm font-semibold flex-shrink-0">
                    {invitado.nombre[0]}
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <span className="font-serif text-base text-charcoal font-medium block text-left leading-tight">
                      {invitado.nombre}
                    </span>
                    <span className="text-xs text-charcoal-light/70 block text-left mt-0.5">
                      Mesa: {invitado.mesa}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gold-dark opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Estado Tarjeta Resultado de Invitado Simplificada (únicamente Nombre y Mesa)
  if (selectedGuest) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 mb-8 animate-fade-in-scale">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold/30 gold-glow shadow-sm text-center relative overflow-hidden">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold/30 text-gold-dark text-xs uppercase tracking-wider font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lugar Reservado</span>
          </div>

          {/* Nombre del Invitado */}
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium tracking-wide mb-1">
            {selectedGuest.nombre}
          </h2>
          <p className="text-xs text-charcoal-light/70 uppercase tracking-widest font-sans mb-3">
            Invitado de Honor
          </p>

          <OrnamentalDivider className="my-4" />

          {/* Mesa Asignada */}
          <div className="my-6">
            <p className="text-xs uppercase tracking-[0.2em] text-eucalyptus font-semibold mb-1.5">
              Tu Mesa Asignada
            </p>
            <div className="flex items-center justify-center gap-2 text-gold-dark my-1">
              <Utensils className="w-5 h-5 text-gold" />
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal tracking-wide">
                {selectedGuest.mesa}
              </span>
            </div>
            <p className="text-xs text-charcoal-light/60 italic font-serif mt-2">
              Por favor ubica este número de mesa a tu llegada al salón
            </p>
          </div>

          {/* Pie de la tarjeta */}
          <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-xs text-eucalyptus font-medium italic font-serif">
              <Heart className="w-3.5 h-3.5 fill-eucalyptus/20" />
              <span>¡Estamos ansiosos por celebrar contigo!</span>
            </div>

            <button
              type="button"
              onClick={onResetSearch}
              className="inline-flex items-center gap-1.5 text-xs text-gold-dark hover:text-charcoal transition-colors underline font-sans cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Buscar otro nombre</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
