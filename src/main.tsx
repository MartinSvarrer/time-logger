import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/App';
import AppProviders from './app/AppProviders';

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
  // Dynamic require to not include msw in production bundle
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  import('./mocks/browser')
    .then(({ browser }) => browser.start())
    .then(() => root.render(app));
} else {
  root.render(app);
}
