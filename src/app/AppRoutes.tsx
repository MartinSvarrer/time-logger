import { Routes, Route, Navigate } from 'react-router-dom';
import PageNotFoundPage from './page-not-found/PageNotFoundPage';
import ProjectDetailsPage from './projects/ProjectDetailsPage';
import ProjectsPage from './projects/ProjectsPage';

export const APP_ROUTES = {
  root: '/',
  projects: '/projects',
  projectDetails: (id: string) => `/projects/${id}`,
  fallback: '*',
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path={APP_ROUTES.root}
        element={<Navigate to={APP_ROUTES.projects} replace />}
      />
      <Route path={APP_ROUTES.projects} element={<ProjectsPage />} />
      <Route
        path={APP_ROUTES.projectDetails(':id')}
        element={<ProjectDetailsPage />}
      />
      <Route path={APP_ROUTES.fallback} element={<PageNotFoundPage />} />
    </Routes>
  );
}
