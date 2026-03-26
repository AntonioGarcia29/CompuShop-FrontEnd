export function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} CompuShop. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
