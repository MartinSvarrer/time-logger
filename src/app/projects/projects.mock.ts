import { rest } from 'msw';
import { MS_PER_DAY } from '../../lib/time';
import {
  ProjectDetailsResponse,
  projectEndpoints,
  ProjectsResponse,
  TimeRegistration,
} from './projects.service';

export const ProjectsResponseMock: ProjectsResponse = {
  projects: [
    {
      id: 'prj12',
      name: 'Economlux',
      status: 'open',
      deadline: '2023-01-23T18:00:00Z',
      totalTimeSpent: { unit: 'minutes', value: 0 },
    },
    {
      id: 'prj62',
      name: 'Bond Economic',
      status: 'closed',
      deadline: '2022-11-23T18:00:00Z',
      totalTimeSpent: { unit: 'minutes', value: 750 },
    },
    {
      id: 'prj23',
      name: 'Launch Finans',
      status: 'open',
      deadline: '2023-03-03T12:00:00Z',
      totalTimeSpent: { unit: 'minutes', value: 11520 },
    },
    {
      id: 'prj42',
      name: 'Fast Marketing',
      status: 'open',
      deadline: '2023-02-15T00:00:00Z',
      totalTimeSpent: { unit: 'minutes', value: 210 },
    },
  ],
};

export const projectsHandlers = [
  rest.get(projectEndpoints.getProjects(), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<ProjectsResponse>(ProjectsResponseMock)
    );
  }),

  rest.get(projectEndpoints.getProjectDetail(':id'), (req, res, ctx) => {
    const { id } = req.params;

    const project = ProjectsResponseMock.projects.find(
      (project) => project.id === id
    );

    if (!project) {
      return res(ctx.status(404, 'Project not found'));
    }

    // Generate some time registrations
    const MINIMUM_TIME_MINUTES = 30;

    const registrations = Array.from<unknown, TimeRegistration>(
      { length: 20 },
      (_, index) => ({
        id: 'reg' + index,
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea sapiente magnam recusandae blanditiis similique illo provident officia repudiandae quis nemo dolorum error reprehenderit ut, perferendis animi, temporibus beatae nulla. Praesentium.',
        registeredAt: new Date(Date.now() - MS_PER_DAY * index).toISOString(),
        timePeriod: {
          value: Math.round(Math.random() * 10) * MINIMUM_TIME_MINUTES,
          unit: 'minutes',
        },
      })
    );

    return res(
      ctx.status(200),
      ctx.json<ProjectDetailsResponse>({
        project,
        registrations,
      })
    );
  }),
];
