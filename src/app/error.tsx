"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Algo salio mal</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-foreground px-6 py-3 text-background transition-colors hover:opacity-80"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
