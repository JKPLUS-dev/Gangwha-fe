export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8" aria-busy="true" aria-label="불러오는 중">
      <div className="mb-8 h-9 w-48 animate-pulse rounded-lg bg-stone-200" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i}>
            <div className="aspect-square animate-pulse rounded-xl bg-stone-200" />
            <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-stone-200" />
            <div className="mt-2 h-5 w-1/2 animate-pulse rounded bg-stone-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
