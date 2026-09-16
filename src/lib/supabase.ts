import { createClient } from '@supabase/supabase-js';
import { Invitado } from '@/types/invitado';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('tu-proyecto.supabase.co') &&
    supabaseAnonKey !== 'tu-anon-key-aqui'
  );
};

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

/**
 * Normaliza una cadena removiendo tildes y acentos.
 * Ejemplo: "Calderón" -> "calderon"
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n');
}

/**
 * Genera una expresión regular POSIX para PostgreSQL tolerante a acentos, tildes y Ñ
 * Ejemplo: "calderon" -> "c[aáAÁ]ld[eéEÉ]r[oóOÓ][nñNÑ]"
 */
export function buildAccentInsensitiveRegex(str: string): string {
  const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escaped
    .replace(/[aáAÁ]/g, '[aáAÁ]')
    .replace(/[eéEÉ]/g, '[eéEÉ]')
    .replace(/[iíÍI]/g, '[iíÍI]')
    .replace(/[oóOÓ]/g, '[oóOÓ]')
    .replace(/[uúÚU]/g, '[uúÚU]')
    .replace(/[nñNÑ]/g, '[nñNÑ]');
}

// Datos de prueba con casos reales incluyendo tildes y acentos
const MOCK_INVITADOS: Invitado[] = [
  { id: '1', nombre: 'Carlos Castro', mesa: 'Mesa de Honor - Los Laureles' },
  { id: '2', nombre: 'Karla Gómez', mesa: 'Mesa de Honor - Los Laureles' },
  { id: '3', nombre: 'Sofía Castro', mesa: 'Mesa 1 - Jazmín' },
  { id: '4', nombre: 'Alejandro Martínez', mesa: 'Mesa 2 - Eucalipto' },
  { id: '5', nombre: 'Valeria Hernández', mesa: 'Mesa 2 - Eucalipto' },
  { id: '6', nombre: 'Mateo López', mesa: 'Mesa 3 - Magnolias' },
  { id: '7', nombre: 'Lucía Fernández', mesa: 'Mesa 3 - Magnolias' },
  { id: '8', nombre: 'Diego Rodríguez', mesa: 'Mesa 4 - Olivo' },
  { id: '9', nombre: 'Camila Morales', mesa: 'Mesa 4 - Olivo' },
  { id: '10', nombre: 'Elena Navarro', mesa: 'Mesa 6 - Almendros' },
  { id: '11', nombre: 'Iñaki Núñez', mesa: 'Mesa 7 - Orquídeas' },
  { id: '12', nombre: 'Juan Calderón', mesa: 'Mesa 8 - Los Pinos' },
];

export interface SearchResult {
  data: Invitado[];
  isDemo: boolean;
  error?: string;
}

/**
 * Consulta insensible a mayúsculas, minúsculas, tildes, acentos y la letra Ñ
 */
export async function searchGuests(searchTerm: string): Promise<SearchResult> {
  const query = searchTerm.trim();
  if (!query) return { data: [], isDemo: !isSupabaseConfigured() };

  const normalizedQuery = normalizeText(query);

  // Modo demostración
  if (!isSupabaseConfigured()) {
    const filtered = MOCK_INVITADOS.filter((inv) =>
      normalizeText(inv.nombre).includes(normalizedQuery)
    );
    return { data: filtered, isDemo: true };
  }

  // Conexión en vivo a Supabase
  try {
    const clean = query.replace(/[%_,]/g, '');
    const regexPattern = buildAccentInsensitiveRegex(clean);

    // 1. Búsqueda con expresión regular POSIX (~* / imatch) en PostgreSQL
    // Permite que "calderon" encuentre "Calderón", "sofia" encuentre "Sofía", "nunez" encuentre "Núñez"
    const { data: regexData, error: regexError } = await supabase
      .from('invitados')
      .select('id, nombre, mesa')
      .filter('nombre', 'imatch', regexPattern)
      .order('nombre', { ascending: true })
      .limit(10);

    if (!regexError && regexData && regexData.length > 0) {
      return { data: regexData as Invitado[], isDemo: false };
    }

    // 2. Intento vía RPC 'buscar_invitado' en caso de que esté configurada con la extensión unaccent
    const { data: rpcData, error: rpcError } = await supabase.rpc('buscar_invitado', {
      search_term: clean,
    });

    if (!rpcError && rpcData && (rpcData as Invitado[]).length > 0) {
      return { data: rpcData as Invitado[], isDemo: false };
    }

    // 3. Fallback con ilike estándar
    const { data: ilikeData, error: ilikeError } = await supabase
      .from('invitados')
      .select('id, nombre, mesa')
      .ilike('nombre', `%${clean}%`)
      .order('nombre', { ascending: true })
      .limit(10);

    if (ilikeError) return { data: [], isDemo: false, error: ilikeError.message };
    return { data: (ilikeData as Invitado[]) || [], isDemo: false };
  } catch (err: any) {
    return { data: [], isDemo: false, error: err?.message || 'Error de conexión' };
  }
}
