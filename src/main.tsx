// Ensure window.fetch is writable and cannot throw 'Cannot set property fetch of #<Window> which has only a getter'
try {
  const origFetch = window.fetch;
  let fetchRef = typeof origFetch === 'function' ? origFetch.bind(window) : origFetch;
  Object.defineProperty(window, 'fetch', {
    configurable: true,
    enumerable: true,
    get() {
      return fetchRef;
    },
    set(v) {
      fetchRef = v;
    },
  });
} catch (_) {
  // Ignore if already patched or immutable
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
