import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import SharedProviders from './SharedProviders';
import { render } from '@testing-library/react';

export interface RenderAppProps {
  otherChildren?: ReactNode;
  initialPath: string;
}

export const renderApp = ({ initialPath, otherChildren }: RenderAppProps) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <SharedProviders>
        <App />
        {otherChildren}
      </SharedProviders>
    </MemoryRouter>
  );
