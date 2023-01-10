import { projectsHandlers, ProjectsResponseMock } from './projects.mock';
import {
  findAllByRole,
  findByRole,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { server } from '../../mocks/server';
import { renderApp } from '../App.spec.util';
import { APP_ROUTES } from '../AppRoutes';
import {
  LocationDisplay,
  LOCATION_DISPLAY_TEST_ID,
} from '../../lib/router/LocationDisplay';

describe('ProjectsPage', () => {
  it('should show a list of projects in same order as received data', async () => {
    // arrange
    server.use(...projectsHandlers);
    renderApp({ initialPath: APP_ROUTES.projects });

    // act

    // assert
    const tableBody = screen.getAllByRole('rowgroup')[1];
    const rows = await findAllByRole(tableBody, 'row');

    expect(rows).toHaveLength(ProjectsResponseMock.projects.length);

    ProjectsResponseMock.projects.forEach((project, index) => {
      expect(rows[index].textContent?.startsWith(project.name)).toBe(true);
    });
  });

  it('should be able to sort my projects by deadline (closest deadline first)', async () => {
    // arrange
    server.use(...projectsHandlers);
    renderApp({ initialPath: APP_ROUTES.projects });

    // act
    const tableHeader = screen.getAllByRole('rowgroup')[0];
    const deadlineBtn = await findByRole(tableHeader, 'button', {
      name: /deadline/i,
    });

    fireEvent.click(deadlineBtn);

    await waitFor(() =>
      expect(deadlineBtn.hasAttribute('data-active')).toBeTruthy()
    );

    // assert
    const tableBody = screen.getAllByRole('rowgroup')[1];
    const rows = await findAllByRole(tableBody, 'row');

    const closestDeadlineProject = ProjectsResponseMock.projects[1];
    const furthestDeadlineProject = ProjectsResponseMock.projects[2];

    expect(
      rows[0].textContent?.startsWith(closestDeadlineProject.name)
    ).toBeTruthy();
    expect(
      rows[ProjectsResponseMock.projects.length - 1].textContent?.startsWith(
        furthestDeadlineProject.name
      )
    ).toBeTruthy();
  });

  it('should navigate to project overview page when project name is clicked', async () => {
    // arrange
    server.use(...projectsHandlers);
    renderApp({
      initialPath: APP_ROUTES.projects,
      otherChildren: <LocationDisplay />,
    });

    // act
    const firstProject = ProjectsResponseMock.projects[0];

    const tableBody = screen.getAllByRole('rowgroup')[1];
    const firstProjectLinkBtn = await findByRole(tableBody, 'link', {
      name: firstProject.name,
    });

    fireEvent.click(firstProjectLinkBtn);

    // assert
    const locationDisplay = screen.getByTestId(LOCATION_DISPLAY_TEST_ID);

    expect(locationDisplay.textContent).include(firstProject.id);
  });
});
