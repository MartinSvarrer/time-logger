import { Routes, Route, Navigate } from 'react-router-dom';
import PageNotFoundPage from './page-not-found/PageNotFoundPage';
import ProjectDetailsPage from './projects/ProjectDetailsPage';
import ProjectsPage from './projects/ProjectsPage';

export const appRoutes = {
  root: '/',
  projects: '/projects',
  projectDetails: (id: string) => `/projects/${id}`,
  fallback: '*',
};

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          path={appRoutes.root}
          element={<Navigate to={appRoutes.projects} replace />}
        />
      </Routes>
      <Routes>
        <Route path={appRoutes.projects} element={<ProjectsPage />} />
        <Route
          path={appRoutes.projectDetails(':id')}
          element={<ProjectDetailsPage />}
        />
        <Route path={appRoutes.fallback} element={<PageNotFoundPage />} />
      </Routes>
    </>
  );
}
