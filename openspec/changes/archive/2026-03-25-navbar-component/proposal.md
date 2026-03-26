## Why

El proyecto CompuShop necesita un componente de navegación principal que permita a los usuarios moverse entre las secciones clave del e-commerce (Home, Products, Categories) y acceder al carrito de compras. Actualmente el navbar existente es un placeholder básico sin diseño oscuro, sin responsividad móvil, ni contador de carrito.

## What Changes

- Reemplazar el componente `src/components/layout/navbar.tsx` con un Navbar completo y responsive
- Agregar diseño oscuro con fondo `#0F172A` (slate-900) y texto blanco
- Incluir logo "CompuShop" alineado a la izquierda
- Links de navegación: Home, Products, Categories con indicador de ruta activa
- Ícono de carrito con badge contador a la derecha
- Menú hamburguesa para dispositivos móviles con panel desplegable
- Componente Client Component (`"use client"`) para manejar estado del menú móvil

## Capabilities

### New Capabilities
- `navbar-responsive`: Componente Navbar responsive con menú hamburguesa, navegación activa, ícono de carrito con contador, y diseño oscuro usando Tailwind CSS

### Modified Capabilities

## Impact

- `src/components/layout/navbar.tsx` — reescritura completa del componente
- Dependencia en `next/link` y `next/navigation` (usePathname) de Next.js
- Dependencia en `react` (useState) para toggle del menú móvil
- No requiere dependencias externas adicionales (íconos implementados con SVG inline)
