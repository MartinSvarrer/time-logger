import { renderWithProviders } from 'test/test-utils';

import App from './App';

describe('App', () => {
  it('should render default', () => {
    const { baseElement } = renderWithProviders(<App />);

    expect(baseElement).toBeTruthy();
  });
});
