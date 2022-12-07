import { render } from '@testing-library/react';

import ProjectOverviewPage from './ProjectOverviewPage';

describe('ProjectOverviewPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProjectOverviewPage />);
    expect(baseElement).toBeTruthy();
  });
});
