import type { ReactNode } from 'react';
import type { Preferences } from '../../domain/types';
import {
  ALLERGENS, ALLERGEN_LABELS, APPLIANCES, APPLIANCE_LABELS, DIETS, DIET_LABELS, MEAL_TYPES, MEAL_LABELS,
} from '../../domain/types';
import { DEFAULT_STAPLE_IDS, INGREDIENTS, STORES } from '../../data';

export type SectionProps = { value: Preferences; onChange: (next: Preferences) => void };

export const DEFAULT_PREFS: Preferences = {
  storeId: 'qfc', weeklyBudget: 150, householdSize: 2, diet: 'none', excludedAllergens: [],
  appliances: ['stovetop', 'oven', 'microwave'], mealsToPlan: ['breakfast', 'lunch', 'dinner'],
  stapleIds: [...DEFAULT_STAPLE_IDS],
};

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return <button type="button" className={`chip ${on ? 'on' : ''}`} aria-pressed={on} onClick={onClick}>{children}</button>;
}

export function StoreSection({ value, onChange }: SectionProps) {
  return (
    <div className="field">
      <label>Where are you shopping this week?</label>
      <div className="chips">
        {STORES.map((s) => <Chip key={s.id} on={value.storeId === s.id} onClick={() => onChange({ ...value, storeId: s.id })}>{s.name}</Chip>)}
      </div>
    </div>
  );
}

export function BudgetSection({ value, onChange }: SectionProps) {
  return (
    <>
      <div className="field">
        <label htmlFor="budget">Weekly grocery budget ($)</label>
        <input id="budget" type="number" inputMode="decimal" min={0} step={5} value={value.weeklyBudget}
          onChange={(e) => onChange({ ...value, weeklyBudget: Math.max(0, Number(e.target.value) || 0) })} />
      </div>
      <div className="field">
        <label htmlFor="household">People eating</label>
        <input id="household" type="number" inputMode="numeric" min={1} max={12} value={value.householdSize}
          onChange={(e) => onChange({ ...value, householdSize: Math.min(12, Math.max(1, Math.round(Number(e.target.value) || 1))) })} />
      </div>
    </>
  );
}

export function DietSection({ value, onChange }: SectionProps) {
  return (
    <>
      <div className="field">
        <label>Diet</label>
        <div className="chips">
          {DIETS.map((d) => <Chip key={d} on={value.diet === d} onClick={() => onChange({ ...value, diet: d })}>{DIET_LABELS[d]}</Chip>)}
        </div>
      </div>
      <div className="field">
        <label>Never include</label>
        <div className="chips">
          {ALLERGENS.map((a) => (
            <Chip key={a} on={value.excludedAllergens.includes(a)} onClick={() => onChange({ ...value, excludedAllergens: toggle(value.excludedAllergens, a) })}>
              {ALLERGEN_LABELS[a]}
            </Chip>
          ))}
        </div>
      </div>
    </>
  );
}

export function AppliancesSection({ value, onChange }: SectionProps) {
  return (
    <>
      <div className="field">
        <label>Appliances you own</label>
        <div className="chips">
          {APPLIANCES.map((a) => (
            <Chip key={a} on={value.appliances.includes(a)} onClick={() => onChange({ ...value, appliances: toggle(value.appliances, a) })}>
              {APPLIANCE_LABELS[a]}
            </Chip>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Meals to plan</label>
        <div className="chips">
          {MEAL_TYPES.map((m) => (
            <Chip key={m} on={value.mealsToPlan.includes(m)} onClick={() => {
              const next = toggle(value.mealsToPlan, m);
              if (next.length > 0) onChange({ ...value, mealsToPlan: next });
            }}>
              {MEAL_LABELS[m]}
            </Chip>
          ))}
        </div>
        <p className="muted small">At least one meal must stay selected.</p>
      </div>
    </>
  );
}

const STAPLE_CATEGORIES = new Set(['grains', 'pantry', 'condiments', 'spices', 'canned']);

export function StaplesSection({ value, onChange }: SectionProps) {
  const candidates = INGREDIENTS.filter((i) => i.defaultStaple || STAPLE_CATEGORIES.has(i.category));
  return (
    <div className="field">
      <label>Always in your pantry</label>
      <p className="muted small">Checked items are left off the shopping list and not priced.</p>
      <div className="chips">
        {candidates.map((i) => (
          <Chip key={i.id} on={value.stapleIds.includes(i.id)} onClick={() => onChange({ ...value, stapleIds: toggle(value.stapleIds, i.id) })}>
            {i.name}
          </Chip>
        ))}
      </div>
    </div>
  );
}
