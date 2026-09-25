-- ==============================================================================
-- Tabla Simplificada e Insensible a Tildes/Mayúsculas/Ñ para Recepción de Boda
-- ==============================================================================

-- 1. Habilitar extensiones necesarias (uuid y unaccent para ignorar acentos y tildes)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- 2. Tabla 'mesas': un registro personal por invitado con su mesa asignada
-- Renombra la tabla anterior 'invitados' si existe, conservando sus datos
CREATE TABLE IF NOT EXISTS public.mesas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    mesa TEXT NOT NULL
);

-- Migración segura si la tabla ya existía con el esquema anterior.
-- 'familia': mismo identificador para todos los miembros de una familia (NULL si va solo).
ALTER TABLE public.mesas
    ADD COLUMN IF NOT EXISTS familia TEXT;

CREATE INDEX IF NOT EXISTS mesas_familia_idx ON public.mesas (familia);

-- 3. Función RPC para búsquedas insensibles a tildes, acentos, mayúsculas, minúsculas y Ñ
CREATE OR REPLACE FUNCTION public.buscar_invitado(search_term TEXT)
RETURNS SETOF public.mesas AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM public.mesas
    WHERE unaccent(lower(nombre)) ILIKE unaccent(lower('%' || search_term || '%'))
    ORDER BY nombre ASC
    LIMIT 10;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Función RPC que devuelve todos los miembros de la familia de un invitado (incluido él)
CREATE OR REPLACE FUNCTION public.obtener_familia_invitado(p_invitado_id UUID)
RETURNS SETOF public.mesas AS $$
BEGIN
    RETURN QUERY
    SELECT i.*
    FROM public.mesas i
    WHERE i.id = p_invitado_id
       OR i.familia = (SELECT familia FROM public.mesas WHERE id = p_invitado_id)
    ORDER BY i.nombre ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Seguridad RLS
ALTER TABLE public.mesas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir consulta publica de mesas" ON public.mesas;
CREATE POLICY "Permitir consulta publica de mesas"
    ON public.mesas
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- 6. Datos de prueba
INSERT INTO public.mesas (nombre, mesa, familia)
VALUES
    -- Mesa Principal
    ('Cristhian Castro',    'Mesa Principal', NULL),
    ('Karina Huilcapi',     'Mesa Principal', NULL),
    ('Alex Castro',         'Mesa Principal', 'padres_novio'),
    ('Yolanda Gaibor',      'Mesa Principal', 'padres_novio'),
    ('Luis Huilcapi',       'Mesa Principal', 'padres_novia'),
    ('Rosario Salazar',     'Mesa Principal', 'padres_novia'),

    -- Mesa 1
    ('Wilson Gaibor',       'Mesa 1',         NULL),
    ('Anita Michuy',        'Mesa 1',         NULL),
    ('Pepi Michuy',         'Mesa 1',         NULL),
    ('Aura Gaibor',         'Mesa 1',         NULL),
    ('Mónica Gaibor',       'Mesa 1',         NULL),
    ('Ruth Gaibor',         'Mesa 1',         NULL),
    ('Maybeti Villagómez',  'Mesa 1',         'familia-21'),
    ('Javier Castro',       'Mesa 1',         'familia-21'),

    -- Mesa 2
    ('Jenniffer Huilcapi',  'Mesa 2',         'familia-11'),
    ('Alejandro Torres',    'Mesa 2',         'familia-11'),
    ('Sammy Torres',        'Mesa 2',         'familia-11'),
    ('Carolina Huilcapi',   'Mesa 2',         'familia-12'),
    ('Kevin Valencia',      'Mesa 2',         'familia-12'),
    ('Leito Jiménez',       'Mesa 2',         'familia-12'),
    ('Iván Salazar',        'Mesa 2',         'familia-13'),
    ('Carmen Maza',         'Mesa 2',         'familia-13'),

    -- Mesa 3
    ('Carolina Gaibor',     'Mesa 3',         'familia-1'),
    ('Matt Galyean',        'Mesa 3',         'familia-1'),
    ('Erika Gaibor',        'Mesa 3',         'familia-2'),
    ('Santiago Espin',      'Mesa 3',         'familia-2'),
    ('Fernando Gaibor',     'Mesa 3',         'familia-3'),
    ('Evelyn Jácome',       'Mesa 3',         'familia-3'),
    ('Carlos Gaibor',       'Mesa 3',         'familia-4'),
    ('Mónica Yanchapaxi',   'Mesa 3',         'familia-4'),

    -- Mesa 4
    ('Alex Márquez',        'Mesa 4',         'familia-14'),
    ('Myrian Buele',        'Mesa 4',         'familia-14'),
    ('Andrea Sambache',     'Mesa 4',         NULL),
    ('Josué Gómez',         'Mesa 4',         NULL),
    ('Jess Crespo',         'Mesa 4',         NULL),
    ('Xavier Jurado',       'Mesa 4',         NULL),
    ('Mariela Mosquera',    'Mesa 4',         NULL),
    ('Johanna Mina',        'Mesa 4',         'familia-15'),
    ('Rommel Landázuri',    'Mesa 4',         'familia-15'),

    -- Mesa 5
    ('Verónica Castro',     'Mesa 5',         'familia-5'),
    ('Leonardo Veintimilla','Mesa 5',         'familia-5'),
    ('Leo Gael Veintimilla','Mesa 5',         'familia-5'),
    ('Xavier Castro',       'Mesa 5',         'familia-6'),
    ('Gabriela Ayala',      'Mesa 5',         'familia-6'),
    ('Israel Castro',       'Mesa 5',         'familia-7'),
    ('Anita Calderón',      'Mesa 5',         'familia-7'),

    -- Mesa 6
    ('Celeste Yánez',       'Mesa 6',         'familia-16'),
    ('John Rivadeneira',    'Mesa 6',         'familia-16'),
    ('Liset Velasquez',     'Mesa 6',         'familia-17'),
    ('Richard Córdova',     'Mesa 6',         'familia-17'),
    ('Caren Andrango',      'Mesa 6',         NULL),
    ('Estefi Vallejos',     'Mesa 6',         'familia-18'),
    ('JuanJo Cevallos',     'Mesa 6',         'familia-18'),

    -- Mesa 7
    ('Renato Calvopiña',    'Mesa 7',         'familia-8'),
    ('Mafer Viteri',        'Mesa 7',         'familia-8'),
    ('Domenica Belalcazar', 'Mesa 7',         'familia-9'),
    ('Sebastián Camino',    'Mesa 7',         'familia-9'),
    ('Dereck Moya',         'Mesa 7',         'familia-10'),
    ('Noelia Restrepo',     'Mesa 7',         'familia-10'),
    ('Alejandro Moya',      'Mesa 7',         NULL),
    ('Carlos Gaibor',       'Mesa 7',         NULL),
    ('Andres Mora',         'Mesa 7',         NULL),

    -- Mesa 8
    ('Daniel Yangua',       'Mesa 8',         NULL),
    ('Victoria Alomoto',    'Mesa 8',         NULL),
    ('Evelyn Cueva',        'Mesa 8',         'familia-19'),
    ('Miguel',              'Mesa 8',         'familia-19'),
    ('Jairo Cueva',         'Mesa 8',         NULL),
    ('Armando Checa',       'Mesa 8',         'familia-20'),
    ('Cristina Carrasco',   'Mesa 8',         'familia-20'),
    ('Jonathan Aizaga',     'Mesa 8',         NULL),
    ('Franklin Boada',      'Mesa 8',         NULL)
ON CONFLICT DO NOTHING;