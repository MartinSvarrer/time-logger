import { projectsHandlers } from 'app/projects/projects.mock';
import { setupWorker } from 'msw';

export const browserMockServer = setupWorker(...projectsHandlers);
