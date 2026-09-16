'use client';

import React, { useState, useCallback } from 'react';
import { Header, OrnamentalDivider } from '@/components/Header';
import { SearchGuest } from '@/components/SearchGuest';
import { GuestResults } from '@/components/GuestResults';
import { searchGuests } from '@/lib/supabase';
import { EVENT_CONFIG } from '@/lib/config';
import { Invitado, SearchStatus } from '@/types/invitado';
import { Heart } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [searchResults, setSearchResults] = useState<Invitado[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Invitado | null>(null);

  const handleSearch = useCallback(async (term: string) => {
    setSearchTerm(term);
    setSelectedGuest(null);

    if (!term.trim()) {
      setStatus('idle');
      setSearchResults([]);
      return;
    }

    setStatus('loading');
    const result = await searchGuests(term);

    if (result.data.length === 0) {
      setStatus('not-found');
      setSearchResults([]);
    } else {
      setStatus('success');
      setSearchResults(result.data);
      if (result.data.length === 1) {
        setSelectedGuest(result.data[0]);
      }
    }
  }, []);

  const handleResetSearch = () => {
    setSearchTerm('');
    setStatus('idle');
    setSearchResults([]);
    setSelectedGuest(null);
  };

  return (
    <main className="central-card-strip shadow-2xl my-0 sm:my-6 sm:rounded-2xl overflow-hidden border-t sm:border border-gold/30 bg-white">
      {/* Encabezado con el Logo Floral */}
      <Header />

      {/* Buscador de invitados */}
      <SearchGuest
        onSearch={handleSearch}
        isLoading={status === 'loading'}
        initialValue={searchTerm}
      />

      {/* Vista de Resultados Unificada */}
      <div className="flex-1 px-4">
        <GuestResults
          status={status}
          searchResults={searchResults}
          selectedGuest={selectedGuest}
          searchTerm={searchTerm}
          onSelectGuest={(guest) => setSelectedGuest(guest)}
          onResetSearch={handleResetSearch}
        />
      </div>

      {/* Pie de página */}
      <footer className="mt-auto py-6 px-6 text-center border-t border-gold/20 bg-white">
        <OrnamentalDivider className="my-2" />
        <p className="font-cursive text-2xl text-gold-dark">
          {EVENT_CONFIG.names}
        </p>
        <p className="text-xs text-charcoal-light/60 font-light mt-1 flex items-center justify-center gap-1">
          <span>Con amor y gratitud por acompañarnos</span>
          <Heart className="w-3 h-3 text-gold-dark fill-gold-dark" />
        </p>
      </footer>
    </main>
  );
}