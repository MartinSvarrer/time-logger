import { screen } from '@testing-library/react';

import {
  LocationDisplay,
  LOCATION_DISPLAY_TEST_ID,
} from '../lib/LocationDisplay';
import { appRoutes } from './AppRoutes';
import { renderApp } from './App.spec.util';

import * as ProjectsPageModule from './projects/ProjectsPage';

vi.spyOn(ProjectsPageModule, 'default').mockImplementation(() => (
  <div>Projects page mock</div>
));

describe('App', () => {
  it('should redirect from root to /projects', () => {
    // arrange
    renderApp({
      otherChildren: <LocationDisplay />,
      initialPath: appRoutes.root,
    });

    // act
    // redirect should happen automatically

    // assert
    const locationDisplay = screen.getByTestId(LOCATION_DISPLAY_TEST_ID);

    expect(locationDisplay.textContent).toBe(appRoutes.projects);
  });

  it('should fallback to 404 page unknown paths', () => {
    // arrange
    renderApp({
      initialPath: '/unknown/test/path',
    });

    // act

    // assert
    expect(screen.getByText(/404/)).toBeTruthy();
  });
});
