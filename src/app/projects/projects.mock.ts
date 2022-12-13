import { rest } from 'msw';
import { PROJECTS, ProjectsResponse } from './projects';

export const ProjectsResponseMock: ProjectsResponse = {
  projects: [
    {
      id: 'prj12',
      name: 'Economlux',
      status: 'open',
      deadline: '2023-01-23T18:00:00Z',
      timeSpent: { unit: 'minutes', value: 0 },
    },
    {
      id: 'prj62',
      name: 'Bond Economic',
      status: 'closed',
      deadline: '2022-11-23T18:00:00Z',
      timeSpent: { unit: 'minutes', value: 750 },
    },
    {
      id: 'prj23',
      name: 'Launch Finans',
      status: 'open',
      deadline: '2023-03-03T12:00:00Z',
      timeSpent: { unit: 'minutes', value: 11520 },
    },
    {
      id: 'prj42',
      name: 'Fast Marketing',
      status: 'open',
      deadline: '2023-02-15T00:00:00Z',
      timeSpent: { unit: 'minutes', value: 210 },
    },
  ],
};

export const projectsHandlers = [
  rest.get<ProjectsResponse>(PROJECTS.queryKey, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(ProjectsResponseMock));
  }),
];
