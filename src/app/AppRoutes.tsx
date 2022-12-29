export const APP_ROUTES = {
  root: '/',
  projects: '/projects',
  projectOverview: (id = ':id') => `/projects/${id}`,
  fallback: '*',
};
