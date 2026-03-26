## 1. Estructura base del componente

- [x] 1.1 Reescribir `src/components/layout/navbar.tsx` como Client Component con `"use client"`, imports de `useState` de React, `Link` de next/link y `usePathname` de next/navigation
- [x] 1.2 Definir la interfaz de props `NavbarProps` con `cartCount?: number`
- [x] 1.3 Crear la estructura HTML semántica: `<header>` con `<nav>` conteniendo logo, links y carrito

## 2. Diseño oscuro y logo

- [x] 2.1 Aplicar estilos de fondo `bg-[#0F172A]` y texto `text-white` al header
- [x] 2.2 Implementar logo "CompuShop" como `<Link href="/">` con estilo `text-xl font-bold`

## 3. Navegación desktop con ruta activa

- [x] 3.1 Crear array de links de navegación (`/`, `/products`, `/categories`) con sus labels
- [x] 3.2 Renderizar links con `next/link` ocultos en móvil (`hidden md:flex`)
- [x] 3.3 Implementar detección de ruta activa con `usePathname()` y aplicar estilo diferenciado (font-bold/underline) al link activo

## 4. Ícono de carrito con contador

- [x] 4.1 Crear SVG inline del ícono de carrito de compras (ShoppingCart)
- [x] 4.2 Implementar badge con `cartCount` que se muestra condicionalmente (solo cuando > 0)
- [x] 4.3 Envolver el ícono en `<Link href="/cart">`

## 5. Menú hamburguesa responsive

- [x] 5.1 Crear SVG inline para íconos de menú (hamburguesa) y cerrar (X)
- [x] 5.2 Agregar estado `isMenuOpen` con `useState(false)` y botón toggle visible solo en móvil (`md:hidden`)
- [x] 5.3 Implementar panel desplegable móvil con los links de navegación, visible condicionalmente según `isMenuOpen`
- [x] 5.4 Agregar `useEffect` que cierre el menú (`setIsMenuOpen(false)`) cuando `pathname` cambie

## 6. Verificación

- [x] 6.1 Verificar que el proyecto compila sin errores con `next build`
- [x] 6.2 Verificar que el layout `(shop)` importa correctamente el Navbar actualizado
