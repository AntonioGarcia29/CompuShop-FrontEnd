## ADDED Requirements

### Requirement: Navbar muestra logo y navegación principal
El componente Navbar SHALL renderizar el texto "CompuShop" como logo enlazado a la página de inicio (`/`), y SHALL mostrar links de navegación a Home (`/`), Products (`/products`) y Categories (`/categories`).

#### Scenario: Renderizado inicial en desktop
- **WHEN** el usuario carga cualquier página en viewport >= 768px
- **THEN** el navbar muestra "CompuShop" a la izquierda, los links Home, Products y Categories visibles en el centro/izquierda, y el ícono de carrito a la derecha

#### Scenario: Click en logo navega al home
- **WHEN** el usuario hace click en "CompuShop"
- **THEN** la aplicación navega a `/`

### Requirement: Navbar aplica diseño oscuro
El componente SHALL usar fondo `#0F172A` (bg-slate-900) con texto blanco como esquema de colores principal.

#### Scenario: Estilos oscuros aplicados
- **WHEN** el navbar se renderiza
- **THEN** el fondo del header es `#0F172A` y el texto es blanco

### Requirement: Navbar indica la ruta activa
El componente SHALL resaltar visualmente el link correspondiente a la ruta actual usando `usePathname` de Next.js.

#### Scenario: Ruta activa resaltada
- **WHEN** el usuario está en `/products`
- **THEN** el link "Products" tiene un estilo diferenciado (font-bold o underline) respecto a los demás links

#### Scenario: Cambio de ruta actualiza indicador
- **WHEN** el usuario navega de `/products` a `/categories`
- **THEN** "Products" pierde el estilo activo y "Categories" lo obtiene

### Requirement: Navbar muestra ícono de carrito con contador
El componente SHALL mostrar un ícono de carrito de compras con un badge numérico que indica la cantidad de items. El contador se recibe via prop `cartCount`.

#### Scenario: Carrito con items
- **WHEN** `cartCount` es 3
- **THEN** el badge muestra "3" sobre el ícono de carrito

#### Scenario: Carrito vacío
- **WHEN** `cartCount` es 0
- **THEN** el badge NO se muestra (solo el ícono)

### Requirement: Navbar es responsive con menú hamburguesa
El componente SHALL mostrar un botón de menú hamburguesa en viewports < 768px que alterna la visibilidad de los links de navegación.

#### Scenario: Vista móvil oculta links
- **WHEN** el viewport es < 768px
- **THEN** los links de navegación están ocultos y se muestra el botón hamburguesa

#### Scenario: Toggle del menú móvil
- **WHEN** el usuario hace click en el botón hamburguesa
- **THEN** se despliega un panel con los links Home, Products, Categories

#### Scenario: Cerrar menú al navegar
- **WHEN** el menú móvil está abierto y el usuario hace click en un link
- **THEN** el menú se cierra automáticamente

### Requirement: Navbar cierra menú móvil al cambiar de ruta
El componente SHALL cerrar automáticamente el menú móvil cuando la ruta cambia, usando un efecto que observa `usePathname`.

#### Scenario: Navegación cierra menú
- **WHEN** el menú móvil está abierto y la ruta cambia
- **THEN** el estado `isMenuOpen` se establece en `false` y el panel se oculta
