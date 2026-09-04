import { useState } from 'react';

export function PriceEditor({ value, isOverride, onSave, onCancel }: {
  value: number; isOverride: boolean; onSave: (price: number | null) => void; onCancel: () => void;
}) {
  const [text, setText] = useState(value.toFixed(2));
  const parsed = Number(text);
  const valid = text.trim() !== '' && Number.isFinite(parsed) && parsed >= 0 && /^\d+(\.\d{0,2})?$/.test(text.trim());
  return (
    <div className="row" style={{ marginTop: 6 }}>
      <input aria-label="Price per pack" inputMode="decimal" value={text} onChange={(e) => setText(e.target.value)}
        style={{ width: 90, padding: 8, borderRadius: 8, border: '1px solid var(--line)' }} />
      <button className="btn" disabled={!valid} onClick={() => onSave(Math.round(parsed * 100) / 100)}>Save</button>
      {isOverride && <button className="btn" onClick={() => onSave(null)}>Reset</button>}
      <button className="btn" onClick={onCancel}>Cancel</button>
      {!valid && <span className="muted small">Enter a price like 4.99</span>}
    </div>
  );
}
