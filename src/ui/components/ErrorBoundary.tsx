import { Component, type ErrorInfo, type ReactNode } from 'react';
import { STORAGE_KEY } from '../../state/store';

interface Props { children: ReactNode }
interface State { error: Error | null }

/**
 * Last line of defence for an installed PWA: without it, one render-time exception is a
 * permanent white screen with no way back, because the offending state is reloaded from
 * localStorage on every launch. The fallback always offers a way to clear that state.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('MealCart: render failed', error, info.componentStack);
  }

  private reset = (): void => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* private mode: nothing to clear */ }
    location.reload();
  };

  render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <main className="screen no-tabs">
        <h1>Sorry — MealCart hit a snag</h1>
        <p className="muted">
          Something went wrong drawing the app. Resetting clears the plan and preferences saved on
          this device and starts you at setup again.
        </p>
        <pre className="error-detail">{error.message || String(error)}</pre>
        <button className="btn danger block" onClick={this.reset}>Reset all data</button>
        <button className="btn block" style={{ marginTop: 8 }} onClick={() => location.reload()}>Just reload</button>
      </main>
    );
  }
}
