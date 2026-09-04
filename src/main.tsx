import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './ui/App';
import { AppProvider } from './state/context';
import { ErrorBoundary } from './ui/components/ErrorBoundary';
import './ui/theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Outside the provider so a throw while restoring saved state is caught too. */}
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
