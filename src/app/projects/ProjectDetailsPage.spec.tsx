import { render } from '@testing-library/react';

import ProjectDetailsPage from './ProjectDetailsPage';

describe('ProjectDetailsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProjectDetailsPage />);
    expect(baseElement).toBeTruthy();
  });
});
