import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';
import SharedProviders from './app/SharedProviders';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const app = (
  <StrictMode>
    <BrowserRouter>
      <SharedProviders>
        <App />
      </SharedProviders>
    </BrowserRouter>
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
