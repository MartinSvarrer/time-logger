import { Project } from '../../lib/project/Project';
import { Time } from '../../lib/time/Time';
import axios from 'axios';
import { useQuery } from 'react-query';

export interface ProjectsResponse {
  projects: Project[];
}

export const PROJECTS_API = {
  all: {
    url: 'api/projects',
    queryKey: 'projects',
  },
  details: {
    url: (id: string) => `api/projects/${id}`,
    queryKey: 'projectDetails',
  },
};

export function useProjects() {
  return useQuery(PROJECTS_API.all.queryKey, () =>
    axios
      .get<ProjectsResponse>(PROJECTS_API.all.url)
      .then((response) => response.data)
  );
}

export interface TimeRegistration {
  time: Time<'minutes'>;
  id: string;
  registeredAt: string;
  description: string;
}

export interface ProjectDetailsResponse {
  project: Project;
  registrations: TimeRegistration[];
}

export function useProjectDetails(id?: string) {
  return useQuery(
    PROJECTS_API.details.queryKey,
    () =>
      axios
        .get<ProjectDetailsResponse>(PROJECTS_API.details.url(id ?? ''))
        .then((response) => response.data),
    { enabled: !!id }
  );
}
