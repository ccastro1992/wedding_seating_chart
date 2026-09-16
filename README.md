# 💍 Asignación de Mesas para Boda — Next.js & Supabase

Aplicación web interactiva y elegante diseñada para que los invitados a la recepción de boda puedan consultar fácil y rápidamente el número o nombre de la mesa que tienen asignada al ingresar su nombre o apellido.

El diseño sigue una línea sobria, editorial y responsiva inspirada en invitaciones de boda de alta gama: paleta en blanco puro y tonos oro envejecido, detalles ornamentales florales y tipografía serif clásica (*Cormorant Garamond*), sans-serif (*Montserrat*) y cursiva caligráfica (*Great Vibes*).

---

## ✨ Características Principales

- **🔍 Búsqueda Insensible a Tildes, Mayúsculas y Ñ**:
  Algoritmo de búsqueda que convierte la consulta a expresiones regulares POSIX (`imatch` / `~*` en PostgreSQL) y normalizador de texto (`normalizeText`), permitiendo que búsquedas como `"calderon"`, `"SOFIA"` o `"nunez"` encuentren correctamente a `"Juan Calderón"`, `"Sofía Castro"` o `"Iñaki Núñez"`.

- **🗄️ Estructura Simplificada de Base de Datos**:
  Integración directa con Supabase sobre la tabla `invitados` optimizada únicamente con los campos indispensables: `id` (uuid), `nombre` (text) y `mesa` (text).

- **📱 Experiencia de Usuario Adaptativa y Fluida**:
  - **Tarjeta de Resultado**: Muestra de forma limpia el nombre del invitado y su mesa asignada en tipografía serif destacada.
  - **Lista de Coincidencias Estandarizada**: Si existen múltiples personas con el mismo apellido o nombre similar, despliega un listado ordenado alineado a la izquierda con avatar monograma para elegir el nombre exacto.
  - **Estado "No Encontrado" Amable**: Mensaje de apoyo orientando al invitado a revisar la ortografía o solicitar apoyo al personal de protocolo en la entrada del salón.

- **⚡ Modo Demostración Inteligente (Zero-Config)**:
  Si el archivo `.env.local` no cuenta con las llaves activas de Supabase, la aplicación activa un catálogo de datos de prueba automáticamente, permitiendo visualizar la interfaz de inmediato.

- **⚙️ Configuración Centralizada**:
  Archivo `src/lib/config.ts` como fuente única de verdad para los datos del evento (nombres de los novios, fecha, lugar y logo).

---

## 🛠️ Tecnologías Empleadas

| Tecnología | Descripción |
| :--- | :--- |
| **[Next.js 14/16](https://nextjs.org/)** | Framework de React utilizando App Router para rutas y renderizado optimizado. |
| **[TypeScript](https://www.typescriptlang.org/)** | Tipado estático estricto para mayor seguridad en el desarrollo. |
| **[Tailwind CSS](https://tailwindcss.com/)** | Framework de CSS utilitario para diseño responsivo y maquetación personalizada. |
| **[Supabase](https://supabase.com/)** | Backend como servicio (BaaS) con PostgreSQL, RLS y soporte de búsquedas insensibles. |
| **[Lucide React](https://lucide.dev/)** | Colección de iconos vectoriales elegantes y ligeros (`Search`, `Utensils`, `Heart`, etc.). |
| **[Google Fonts](https://fonts.google.com/)** | Carga optimizada de *Cormorant Garamond*, *Montserrat* y *Great Vibes* vía `next/font`. |

---

## 📁 Estructura del Proyecto

```
rsvp_page/
├── public/
│   └── img/
│       └── logo.png              # Logo floral del monograma K & C
├── supabase/
│   └── schema.sql                # Script SQL DDL (creación de tabla, extensión unaccent, RPC e inserts)
├── src/
│   ├── app/
│   │   ├── globals.css           # Estilos globales, paleta de colores y variables de fuentes
│   │   ├── layout.tsx            # Configuración de fuentes y metadata
│   │   └── page.tsx              # Página principal que orquesta los componentes
│   ├── components/
│   │   ├── Header.tsx            # Logo floral, datos del evento y separadores ornamentales
│   │   ├── SearchGuest.tsx       # Barra de búsqueda redondeada con alineación corregida
│   │   ├── GuestResults.tsx      # Contenedor unificado para tarjeta, lista de opciones o no encontrado
│   │   └── DemoBanner.tsx        # Indicador informativo cuando se ejecutan datos de demostración
│   ├── lib/
│   │   ├── config.ts             # Fuente de verdad para datos del evento (Nombres, Fecha, Lugar)
│   │   └── supabase.ts           # Cliente Supabase, normalizador de acentos y función searchGuests
│   └── types/
│       └── invitado.ts           # Definición de la interfaz TypeScript Invitado
├── .env.local                    # Variables de entorno locales (Placeholders Supabase)
├── .env.example                  # Plantilla de variables de entorno
├── next.config.mjs               # Configuración de Next.js
├── tailwind.config.ts            # Configuración de colores y fuentes de Tailwind
├── tsconfig.json                 # Configuración de TypeScript
└── package.json                  # Dependencias del proyecto
```

---

## 🚀 Instalación y Uso Local

### 1. Requisitos Previos
Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y `npm`.

### 2. Clona e Instala las Dependencias
```bash
git clone <URL_DEL_REPOSITORIO>
cd rsvp_page
npm install
```

### 3. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
Abre en tu navegador la dirección [http://localhost:3000](http://localhost:3000).

### 4. Compilar para Producción
```bash
npm run build
npm run start
```

---

## 🗄️ Configuración de Base de Datos (Supabase)

1. Crea un proyecto en [Supabase](https://supabase.com/).
2. Dirígete a la sección **SQL Editor** en el panel de Supabase.
3. Copia y ejecuta el contenido del archivo [`supabase/schema.sql`](./supabase/schema.sql).
4. Agrega tus credenciales en el archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

---

## 💌 Licencia

Desarrollado para la recepción de boda de Kari & Cris. Uso libre para adaptación en eventos privados.

