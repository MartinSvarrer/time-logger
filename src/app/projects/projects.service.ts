import axios from 'axios';
import { useQuery } from 'react-query';

export interface Time<Unit extends 'minutes' | 'seconds' | 'hours' | 'days'> {
  value: number;
  unit: Unit;
}

export interface Project {
  id: string;
  name: string;
  deadline: string;
  status: 'open' | 'closed';
  totalTimeSpent: Time<'minutes'>;
}

export interface ProjectsResponse {
  projects: Project[];
}

export interface TimeRegistration {
  timePeriod: Time<'minutes'>;
  id: string;
  registeredAt: string;
  description: string;
}

export interface ProjectDetailsResponse {
  project: Project;
  registrations: TimeRegistration[];
}

export const projectEndpoints = {
  BASE: '/api/v1/projects',
  getProjects: () => projectEndpoints.BASE,
  getProjectDetail: (id: string) => `${projectEndpoints.BASE}/${id}`,
};

export function fetchProjects() {
  return axios.get<ProjectsResponse>(projectEndpoints.getProjects());
}

export function fetchProjectDetails(id: string) {
  return axios.get<ProjectDetailsResponse>(
    projectEndpoints.getProjectDetail(id)
  );
}

export const projectKeys = {
  ALL: 'projects' as const,
  lists: () => [projectKeys.ALL, 'list'] as const,
  list: (filters: string) => [...projectKeys.lists(), { filters }] as const,
  details: () => [projectKeys.ALL, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

export const NO_FILTERS = '';

export function useProjects() {
  return useQuery(projectKeys.list(NO_FILTERS), () =>
    fetchProjects().then((response) => response.data)
  );
}

export function useProjectDetails(id = '') {
  return useQuery(
    projectKeys.detail(id),
    () => fetchProjectDetails(id).then((response) => response.data),
    { enabled: !!id }
  );
}
