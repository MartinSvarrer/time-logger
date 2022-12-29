import ProjectsPage from './ProjectsPage';
import { projectsHandlers, ProjectsResponseMock } from './projects.mock';
import {
  findAllByRole,
  findByRole,
  renderWithProviders,
  screen,
  fireEvent,
  waitFor,
} from 'test/test-utils';
import { server } from '../../mocks/server';

describe('ProjectsPage', () => {
  it('should show a list of projects in same order as received data', async () => {
    // arrange
    server.use(...projectsHandlers);
    renderWithProviders(<ProjectsPage />);

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
    renderWithProviders(<ProjectsPage />);

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
});
