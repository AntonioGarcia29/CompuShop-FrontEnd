## Context

CompuShop es un e-commerce de computadoras con Next.js 16 App Router y Tailwind CSS 4. Actualmente existe un `src/components/layout/navbar.tsx` placeholder sin interactividad ni diseño final. El componente es importado desde los layouts de los route groups `(shop)` y `(account)`.

## Goals / Non-Goals

**Goals:**
- Navbar responsive con diseño oscuro (#0F172A) consistente en todas las páginas
- Navegación clara entre Home, Products y Categories con indicador de ruta activa
- Ícono de carrito con badge contador visible
- Menú hamburguesa funcional en pantallas móviles (<768px)
- Componente auto-contenido sin dependencias externas de íconos

**Non-Goals:**
- Integración con estado global del carrito (el contador se recibe por props)
- Dropdown de categorías o mega-menú
- Barra de búsqueda integrada en el navbar
- Autenticación/usuario en el navbar (se agregará después)

## Decisions

### 1. Client Component con `"use client"`
El navbar necesita `useState` para el toggle del menú móvil y `usePathname` para detectar la ruta activa. Ambos requieren que sea un Client Component.

**Alternativa descartada**: Server Component con menú CSS-only — limita la accesibilidad y el control del estado del menú.

### 2. SVG inline para íconos
Se usarán SVGs inline para el ícono de carrito (ShoppingCart) y el menú hamburguesa (Menu/X) en lugar de una librería de íconos como lucide-react o heroicons.

**Razón**: Evita agregar dependencias externas para solo 3 íconos. Se pueden migrar a una librería después si el proyecto crece.

### 3. Tailwind CSS puro para responsividad
Se usará el breakpoint `md:` (768px) de Tailwind para alternar entre menú hamburguesa y navegación horizontal. El menú móvil será un panel que se despliega debajo del header.

### 4. Props para el contador del carrito
El componente recibirá `cartCount` como prop en lugar de acceder directamente al estado del carrito. Esto mantiene el componente desacoplado y testeable.

**Alternativa descartada**: useContext/store directo — acoplamiento innecesario en esta etapa.

## Risks / Trade-offs

- **[SVGs inline aumentan tamaño del bundle]** → Mitigación: Solo 3 íconos pequeños (~200 bytes cada uno), impacto negligible
- **[Menú móvil sin animación de entrada/salida]** → Mitigación: Se puede agregar transición CSS después sin cambiar la estructura
- **[No hay click-outside para cerrar menú]** → Mitigación: El menú se cierra al navegar (usePathname change); click-outside se puede agregar como mejora futura
