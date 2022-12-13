import { Project } from '@time-logger/lib/project/Project';
import axios from 'axios';
import { useQuery } from 'react-query';

export interface ProjectsResponse {
  projects: Project[];
}

export const PROJECTS = {
  url: '/projects',
  queryKey: 'projects',
};

export function useProjects() {
  return useQuery(PROJECTS.queryKey, () =>
    axios.get<ProjectsResponse>(PROJECTS.url).then((response) => response.data)
  );
}
