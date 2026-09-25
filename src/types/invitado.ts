export interface Invitado {
  id: string;
  nombre: string;
  mesa: string;
  familia: string | null;
}

export type SearchStatus = 'idle' | 'loading' | 'success' | 'not-found' | 'error';
