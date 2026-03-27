export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header skeleton */}
      <div className="h-9 w-48 animate-pulse rounded bg-slate-700" />
      <div className="mt-2 h-5 w-72 animate-pulse rounded bg-slate-700" />

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {/* Sidebar skeleton */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <div className="h-6 w-32 animate-pulse rounded bg-slate-700" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-5 w-full animate-pulse rounded bg-slate-700"
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Product grid skeleton */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-700 bg-slate-800/50 p-4"
              >
                <div className="aspect-square animate-pulse rounded-md bg-slate-700" />
                <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-slate-700" />
                <div className="mt-2 h-3 w-1/4 animate-pulse rounded bg-slate-700" />
                <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-slate-700" />
                <div className="mt-3 h-9 w-full animate-pulse rounded-md bg-slate-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
