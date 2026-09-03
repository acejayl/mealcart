export type Tab = 'plan' | 'list' | 'settings';
const TABS: { id: Tab; label: string; ico: string }[] = [
  { id: 'plan', label: 'Plan', ico: '📅' }, { id: 'list', label: 'List', ico: '🛒' }, { id: 'settings', label: 'Settings', ico: '⚙️' },
];
export function TabBar({ current, onChange }: { current: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="tabbar" aria-label="Main">
      {TABS.map((t) => (
        <button key={t.id} className={t.id === current ? 'on' : ''} onClick={() => onChange(t.id)} aria-current={t.id === current ? 'page' : undefined}>
          <span className="ico" aria-hidden>{t.ico}</span>{t.label}
        </button>
      ))}
    </nav>
  );
}
