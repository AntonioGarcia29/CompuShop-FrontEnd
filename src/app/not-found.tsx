import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Pagina no encontrada
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-foreground px-6 py-3 text-background transition-colors hover:opacity-80"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
