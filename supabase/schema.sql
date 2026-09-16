-- ==============================================================================
-- Tabla Simplificada e Insensible a Tildes/Mayúsculas/Ñ para Recepción de Boda
-- ==============================================================================

-- 1. Habilitar extensiones necesarias (uuid y unaccent para ignorar acentos y tildes)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- 2. Creación de la tabla 'invitados'
CREATE TABLE IF NOT EXISTS public.invitados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    mesa TEXT NOT NULL
);

-- 3. Función RPC para búsquedas insensibles a tildes, acentos, mayúsculas, minúsculas y Ñ
CREATE OR REPLACE FUNCTION public.buscar_invitado(search_term TEXT)
RETURNS SETOF public.invitados AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM public.invitados
    WHERE unaccent(lower(nombre)) ILIKE unaccent(lower('%' || search_term || '%'))
    ORDER BY nombre ASC
    LIMIT 10;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Seguridad RLS
ALTER TABLE public.invitados ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir consulta publica de invitados" ON public.invitados;
CREATE POLICY "Permitir consulta publica de invitados"
    ON public.invitados
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- 5. Datos de prueba
INSERT INTO public.invitados (nombre, mesa)
VALUES
    ('Carlos Castro', 'Mesa de Honor - Los Laureles'),
    ('Karla Gómez', 'Mesa de Honor - Los Laureles'),
    ('Sofía Castro', 'Mesa 1 - Jazmín'),
    ('Alejandro Martínez', 'Mesa 2 - Eucalipto'),
    ('Valeria Hernández', 'Mesa 2 - Eucalipto'),
    ('Mateo López', 'Mesa 3 - Magnolias'),
    ('Lucía Fernández', 'Mesa 3 - Magnolias'),
    ('Diego Rodríguez', 'Mesa 4 - Olivo'),
    ('Camila Morales', 'Mesa 4 - Olivo'),
    ('Elena Navarro', 'Mesa 6 - Almendros'),
    ('Iñaki Núñez', 'Mesa 7 - Orquídeas')
ON CONFLICT DO NOTHING;