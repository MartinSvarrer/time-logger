import { render } from '@testing-library/react';

import ProjectsPage from './ProjectsPage';

describe('ProjectsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProjectsPage />);
    expect(baseElement).toBeTruthy();
  });
});
