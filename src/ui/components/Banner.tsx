import type { ReactNode } from 'react';
export function Banner({ tone, children }: { tone: 'warn' | 'info'; children: ReactNode }) {
  return <div className={`banner ${tone}`} role={tone === 'warn' ? 'alert' : 'status'}>{children}</div>;
}
