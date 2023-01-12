import { server } from '../../mocks/server';
import { findAllByRole, screen } from '@testing-library/react';

import { ProjectsResponseMock } from './projects.mock';
import { ProjectDetailsResponse, projectEndpoints } from './projects.service';
import { rest } from 'msw';
import { appRoutes } from '../AppRoutes';
import { renderApp } from '../App.spec.util';

describe('ProjectDetailsPage', () => {
  it('should show a list of time registrations based on current :id parameter', async () => {
    // arrange
    const mockProject = ProjectsResponseMock.projects[0];
    const mockProjectDetails: ProjectDetailsResponse = {
      project: mockProject,
      registrations: [
        {
          description: 'A description',
          id: 'reg1',
          registeredAt: '2023-01-09T22:18:53.308Z',
          timePeriod: { unit: 'minutes', value: 90 },
        },
        {
          description: 'Another description',
          id: 'reg2',
          registeredAt: '2023-01-07T20:10:10.100Z',
          timePeriod: { unit: 'minutes', value: 60 },
        },
      ],
    };

    server.use(
      rest.get(projectEndpoints.getProjectDetail(':id'), (req, res, ctx) => {
        return res(ctx.json(mockProjectDetails));
      })
    );

    renderApp({ initialPath: appRoutes.projectDetails(mockProject.id) });

    // act

    // assert
    const tableBody = await screen.findByTestId('timeRegistrations');
    const rows = await findAllByRole(tableBody, 'row');

    expect(rows).toHaveLength(mockProjectDetails.registrations.length);
  });
});
