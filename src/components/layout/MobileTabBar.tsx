const TABS = [
  { label: "홈", href: "/" },
  { label: "카테고리", href: "/products" },
  { label: "검색", href: "/search" },
  { label: "찜", href: "/wishlist" },
  { label: "MY", href: "/my" },
];

export function MobileTabBar() {
  return (
    <nav aria-label="하단 메뉴" className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white md:hidden">
      <ul className="grid grid-cols-5">
        {TABS.map((t, i) => (
          <li key={t.label}>
            <a href={t.href} aria-current={i === 0 ? "page" : undefined} className={`flex h-14 items-center justify-center text-sm font-medium ${i === 0 ? "text-brand" : "text-stone-600"}`}>{t.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
