import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/App';
import AppProviders from './app/AppProviders';
import { browserMockServer } from './mocks/browser';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const app = (
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);

if (import.meta.env.DEV) {
  browserMockServer.start().then(() => root.render(app));
} else {
  root.render(app);
}
