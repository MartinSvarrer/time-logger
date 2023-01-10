import { projectsHandlers } from '../app/projects/projects.mock';
import { RequestHandler } from 'msw';

export const handlers: Array<RequestHandler> = [...projectsHandlers];
