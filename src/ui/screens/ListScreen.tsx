import { useState } from 'react';
import { useApp } from '../../state/context';
import { overridesFor, shoppingListFor, storeFor } from '../../state/selectors';
import { CATEGORY_LABELS } from '../../domain/types';
import { formatQty } from '../../domain/scaling';
import { INGREDIENTS_BY_ID } from '../../data';
import { PriceEditor } from '../components/PriceEditor';

export function ListScreen() {
  const { state, dispatch } = useApp();
  const prefs = state.prefs!;
  const list = shoppingListFor(state);
  const overrides = overridesFor(state);
  const [editing, setEditing] = useState<string | null>(null);
  const [showStaples, setShowStaples] = useState(false);
  const store = storeFor(prefs);

  if (!list || (list.items.length === 0 && list.missing.length === 0)) {
    return <><h1>List</h1><p className="muted">Plan a week first and your list will appear here.</p></>;
  }

  const missingCount = list.missing.length;

  return (
    <>
      <h1>Shopping list</h1>
      <p className="muted">{store.name} · sorted by aisle</p>
      <div className="card row between">
        <span>In cart</span>
        <span className="total">${list.inCart.toFixed(2)} <span className="muted small">
          of ${list.total.toFixed(2)} · budget ${prefs.weeklyBudget.toFixed(0)}
          {missingCount > 0 && ` · ${missingCount} item${missingCount === 1 ? '' : 's'} not sold here`}
        </span></span>
      </div>
      {list.groups.map((g) => (
        <section key={g.category}>
          <h2>{CATEGORY_LABELS[g.category]}</h2>
          {g.items.map((it) => {
            const isOverride = overrides[it.ingredientId] !== undefined;
            return (
              <div key={it.ingredientId} className="card">
                <div className="row">
                  <button className={`check ${it.checked ? 'on' : ''}`} aria-pressed={it.checked}
                    aria-label={`${it.checked ? 'Uncheck' : 'Check'} ${it.product.name}`}
                    onClick={() => dispatch({ type: 'TOGGLE_CHECKED', ingredientId: it.ingredientId })}>
                    <span className="check-box">{it.checked ? '✓' : ''}</span>
                  </button>
                  <div className={`grow ${it.checked ? 'strike' : ''}`}>
                    <div>{it.product.name}</div>
                    <div className="muted small">
                      {it.packs} × {it.product.packLabel} · need {formatQty(it.neededQty, INGREDIENTS_BY_ID[it.ingredientId].unit)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div>${it.cost.toFixed(2)}</div>
                    <button className="price-btn small" onClick={() => setEditing(editing === it.ingredientId ? null : it.ingredientId)}>
                      ${it.unitPrice.toFixed(2)} ea{isOverride ? ' (yours)' : it.product.estimated ? ' (est.)' : ''}
                    </button>
                  </div>
                </div>
                {editing === it.ingredientId && (
                  <PriceEditor value={it.unitPrice} isOverride={isOverride}
                    onSave={(price) => { dispatch({ type: 'SET_PRICE_OVERRIDE', profile: store.profile, ingredientId: it.ingredientId, price }); setEditing(null); }}
                    onCancel={() => setEditing(null)} />
                )}
              </div>
            );
          })}
        </section>
      ))}
      {missingCount > 0 && (
        <section className="dim">
          <h2>Not sold at {store.name}</h2>
          <p className="muted small">
            Your meals need {missingCount === 1 ? 'this' : 'these'}, but this store does not carry
            {missingCount === 1 ? ' it' : ' them'}, so {missingCount === 1 ? "it is" : 'they are'} not in the total above.
            Substitute at the store, swap the meal with ↻ on the Plan tab, or shop elsewhere.
          </p>
          <ul className="ingredients" style={{ marginTop: 8 }}>
            {list.missing.map((m) => (
              <li key={m.ingredientId} className="muted">
                <span>{m.name}</span><span>{formatQty(m.neededQty, INGREDIENTS_BY_ID[m.ingredientId].unit)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      {list.staples.length > 0 && (
        <section>
          <button className="btn" onClick={() => setShowStaples(!showStaples)}>
            {showStaples ? 'Hide' : 'Show'} pantry staples ({list.staples.length})
          </button>
          {showStaples && (
            <ul className="ingredients" style={{ marginTop: 8 }}>
              {list.staples.map((s) => (
                <li key={s.ingredientId} className="muted"><span>{s.name}</span><span>{formatQty(s.neededQty, INGREDIENTS_BY_ID[s.ingredientId].unit)}</span></li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
}
