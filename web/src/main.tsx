import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './i18n';
import './theme/theme.css';

// HashRouter is used so the app works on any static host (GitHub Pages,
// Netlify, etc.) without server-side route rewrites.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </HashRouter>
  </React.StrictMode>,
);
