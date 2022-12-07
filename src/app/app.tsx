import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { APP_ROUTES } from './AppRoutes';
import PageNotFoundPage from './page-not-found/PageNotFoundPage';
import ProjectOverviewPage from './project-overview/ProjectOverviewPage';
import ProjectsPage from './projects/ProjectsPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={APP_ROUTES.root}
          element={<Navigate to={APP_ROUTES.projects} replace />}
        />
        <Route path={APP_ROUTES.projects} element={<ProjectsPage />} />
        <Route
          path={APP_ROUTES.projectOverview}
          element={<ProjectOverviewPage />}
        />
        <Route path={APP_ROUTES.fallback} element={<PageNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
