import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../core/constants/routes';
import { Button } from '../../components/ui/Button';

export const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-4xl font-bold text-gray-900">Access Denied</h1>
        <p className="mt-4 text-lg text-gray-600">
          You don't have permission to access this page.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Please contact your administrator if you believe this is a mistake.
        </p>
        <div className="mt-8 space-x-4">
          <Link to={ROUTES.HOME}>
            <Button variant="primary">Go Home</Button>
          </Link>
          <Link to={ROUTES.LOGIN}>
            <Button variant="secondary">Back to Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
