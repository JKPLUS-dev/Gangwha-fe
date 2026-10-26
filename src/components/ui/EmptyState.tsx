import Link from "next/link";

export function EmptyState({ icon, title, desc, href, cta }: { icon: string; title: string; desc?: string; href?: string; cta?: string }) {
  return (
    <div className="rounded-2xl bg-stone-50 px-6 py-16 text-center">
      <p aria-hidden className="text-5xl">{icon}</p>
      <p className="mt-4 text-lg font-bold text-stone-900">{title}</p>
      {desc && <p className="mt-1 text-base text-stone-600">{desc}</p>}
      {href && cta && (
        <Link href={href} className="mt-6 inline-flex h-12 items-center rounded-lg bg-brand px-6 font-bold text-white hover:opacity-90">{cta}</Link>
      )}
    </div>
  );
}
