export interface Invitado {
  id: string;
  nombre: string;
  mesa: string;
}

export type SearchStatus = 'idle' | 'loading' | 'success' | 'not-found' | 'error';
