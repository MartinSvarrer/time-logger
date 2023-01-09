export const APP_ROUTES = {
  root: '/',
  projects: '/projects',
  projectDetails: (id = ':id') => `/projects/${id}`,
  fallback: '*',
};
