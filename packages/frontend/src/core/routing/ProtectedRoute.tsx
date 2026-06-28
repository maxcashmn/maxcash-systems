import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from './routes';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  console.log('🟢 ProtectedRoute rendering');
  const { isAuthenticated, user, isLoading } = useAuth();
  console.log('🔍 ProtectedRoute - isAuthenticated:', isAuthenticated, 'user:', user, 'isLoading:', isLoading);

  if (isLoading) {
    console.log('⏳ ProtectedRoute - loading...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('🔒 ProtectedRoute - not authenticated, redirecting to login');
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    console.log('🚫 ProtectedRoute - unauthorized role:', user.role);
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  console.log('✅ ProtectedRoute - authenticated, rendering Outlet');
  return <Outlet />;
};
