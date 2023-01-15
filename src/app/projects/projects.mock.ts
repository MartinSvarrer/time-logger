import { rest } from 'msw';
import { MS_PER_DAY, relativeDate } from '../../lib/datetime';
import {
  Project,
  ProjectDetailsResponse,
  projectEndpoints,
  ProjectsResponse,
  TimeRegistration,
} from './projects.service';

export const mockProjectOpenNoTime: Project = {
  id: 'prj12',
  name: 'Economlux',
  status: 'open',
  // TODO: Generate these mock dates, relatively from execution time, to make tests stable and independent of when they are executed
  deadline: '2023-01-23T18:00:00Z',
  totalTimeSpent: { unit: 'minutes', value: 0 },
};

export const mockProjectClosedModerateTime: Project = {
  id: 'prj62',
  name: 'Bond Economic',
  status: 'closed',
  deadline: relativeDate(-25).toISOString(),
  totalTimeSpent: { unit: 'minutes', value: 750 },
};

export const mockProjectOpenPlentyTime: Project = {
  id: 'prj23',
  name: 'Launch Finans',
  status: 'open',
  deadline: relativeDate(62).toISOString(),
  totalTimeSpent: { unit: 'minutes', value: 11520 },
};

export const mockProjectOpenLittleTime: Project = {
  id: 'prj42',
  name: 'Fast Marketing',
  status: 'open',
  deadline: relativeDate(45).toISOString(),
  totalTimeSpent: { unit: 'minutes', value: 210 },
};

export const mockProjectsMixedResponse: ProjectsResponse = {
  projects: [
    mockProjectOpenNoTime,
    mockProjectClosedModerateTime,
    mockProjectOpenPlentyTime,
    mockProjectOpenLittleTime,
  ],
};

export const projectsHandlers = [
  rest.get(projectEndpoints.getProjects(), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<ProjectsResponse>(mockProjectsMixedResponse)
    );
  }),

  rest.get(projectEndpoints.getProjectDetail(':id'), (req, res, ctx) => {
    const { id } = req.params;

    const project = mockProjectsMixedResponse.projects.find(
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
        registeredAt: relativeDate(-1 * index).toISOString(),
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
