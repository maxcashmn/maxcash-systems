// packages/frontend/src/core/routing/index.ts
export * from './routes';
export * from './ProtectedRoute';
export * from './RoleBasedRoute';

// Only export ROUTES from the routes file
export { ROUTES } from './routes';
export type { Route } from './routes';