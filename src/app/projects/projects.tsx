import { Project } from '@time-logger/lib/project/Project';
import { Time } from '@time-logger/lib/time/Time';
import axios from 'axios';
import { useQuery } from 'react-query';

export interface ProjectsResponse {
  projects: Project[];
}

export const PROJECTS = {
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
  return useQuery(PROJECTS.all.queryKey, () =>
    axios
      .get<ProjectsResponse>(PROJECTS.all.url)
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
    PROJECTS.details.queryKey,
    () =>
      axios
        .get<ProjectDetailsResponse>(PROJECTS.details.url(id ?? ''))
        .then((response) => response.data),
    { enabled: !!id }
  );
}
