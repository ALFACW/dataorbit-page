// Render del sitio fuera del navegador, al compilar. Lo usa scripts/prerender.mjs
// para dejar el HTML del home ya armado dentro de index.html.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';

export const render = (url) =>
  renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
