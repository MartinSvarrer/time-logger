import ProjectsPage from './ProjectsPage';
import { projectsHandlers, ProjectsResponseMock } from './projects.mock';
import { findAllByRole, renderWithProviders, screen } from 'test/test-utils';
import { server } from '../../mocks/server';

describe('ProjectsPage', () => {
  it('should show a list of projects', async () => {
    // arrange
    server.use(...projectsHandlers);

    // act
    renderWithProviders(<ProjectsPage />);

    // assert
    const tableBody = screen.getAllByRole('rowgroup')[1];
    const rows = await findAllByRole(tableBody, 'row');

    expect(rows).toHaveLength(ProjectsResponseMock.projects.length);
  });

  it.todo('should be able to sort my projects by deadline');
});
