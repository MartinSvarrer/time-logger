import axios, { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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

export interface TimeRegistrationPayload {
  description: string;
  timeSpent: Time<'minutes'>;
}

export interface TimeRegistrationResponse {
  timeRegistration: TimeRegistration;
}

export const projectEndpoints = {
  BASE: '/api/v1/projects',
  getProjects: () => projectEndpoints.BASE,
  getProjectDetail: (id: string) => `${projectEndpoints.BASE}/${id}`,
  postTimeRegistration: (projectId: string) =>
    `${projectEndpoints.getProjectDetail(projectId)}/time`,
};

export function fetchProjects() {
  return axios.get<ProjectsResponse>(projectEndpoints.getProjects());
}

export function fetchProjectDetails(id: string) {
  return axios.get<ProjectDetailsResponse>(
    projectEndpoints.getProjectDetail(id)
  );
}

export interface AddTimeRegistrationProps {
  projectId: string;
  description: string;
  timeSpentMinutes: number;
}

export function addTimeRegistration({
  projectId,
  description,
  timeSpentMinutes,
}: AddTimeRegistrationProps) {
  return axios.post<
    TimeRegistrationResponse,
    AxiosResponse<TimeRegistrationResponse>,
    TimeRegistrationPayload
  >(projectEndpoints.postTimeRegistration(projectId), {
    description,
    timeSpent: {
      unit: 'minutes',
      value: timeSpentMinutes,
    },
  });
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

export function useAddTimeRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: AddTimeRegistrationProps) => addTimeRegistration(props),
    onSuccess(data, variables) {
      queryClient.invalidateQueries(projectKeys.detail(variables.projectId));
    },
  });
}
