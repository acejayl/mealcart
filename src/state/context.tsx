import { createContext, useContext, useEffect, useReducer, useRef, type Dispatch, type ReactNode } from 'react';
import { loadState, reducer, saveState, type Action, type AppState } from './store';

const Ctx = createContext<{ state: AppState; dispatch: Dispatch<Action> } | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);
  const timer = useRef<number | null>(null);
  // Latest state, kept in sync every render so the pagehide/unmount flush below
  // (registered once, so its closure would otherwise see a stale `state`) can
  // always save the most recent value.
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      saveState(state);
      timer.current = null;
    }, 100);
    // Dependency-change cleanup: just cancel the stale timer, a fresh one is
    // scheduled by the effect that runs next. Debounce is preserved here.
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [state]);

  useEffect(() => {
    const flush = () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
        timer.current = null;
        saveState(stateRef.current);
      }
    };
    // iOS backgrounds/suspends home-screen apps via `pagehide` (not always
    // `beforeunload`), which is exactly when a pending 100ms save is at risk.
    window.addEventListener('pagehide', flush);
    return () => {
      // True unmount only (empty deps): flush any save still pending so the
      // last change is never silently dropped.
      flush();
      window.removeEventListener('pagehide', flush);
    };
  }, []);

  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used inside AppProvider');
  return v;
}
