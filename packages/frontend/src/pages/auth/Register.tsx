import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/hooks/useAuth';
import { useToast } from '../../core/hooks/useToast';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/forms/Select';
import { ROUTES } from '../../core/constants/routes';

// Available roles for registration
const ROLES = [
  { value: 'borrower', label: 'Borrower - Apply for loans and manage your finances' },
  { value: 'manager', label: 'Manager - Review and approve loan applications' },
  { value: 'auditor', label: 'Auditor - Monitor and audit loan activities' },
  { value: 'admin', label: 'Admin - Full system administration' },
];

export const Register: React.FC = () => {
  const { register } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'borrower', // Default role
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const result = await register(registerData);
      if (result.success) {
        toast.success(`Registration successful! Welcome to MaxCash as a ${formData.role}.`);
        // Navigation is handled by useAuth.register() based on role
      } else {
        toast.error(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            {/* Phone Number */}
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1234567890"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />

            {/* Role Selection */}
            <Select
              label="Role"
              options={ROLES}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              className="w-full"
            />

            {/* Password Fields */}
            <Input
              label="Password"
              type="password"
              placeholder="Min 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            {/* Role Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
              <p className="font-medium">💡 About your role:</p>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• <strong>Borrower</strong>: Apply for loans and track your finances</li>
                <li>• <strong>Manager</strong>: Review and approve loan applications</li>
                <li>• <strong>Auditor</strong>: Monitor and audit all loan activities</li>
                <li>• <strong>Admin</strong>: Full system administration and user management</li>
              </ul>
            </div>
          </div>

          <Button type="submit" loading={loading} fullWidth>
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../core/hooks/useAuth';
// import { useToast } from '../../core/hooks/useToast';
// import { Button } from '../../components/ui/Button';
// import { Input } from '../../components/ui/Input';
// import { ROUTES } from '../../core/constants/routes';

// export const Register: React.FC = () => {
//   const navigate = useNavigate();
//   const { register } = useAuth();
//   const toast = useToast();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       return;
//     }

//     setLoading(true);

//     try {
//       const { confirmPassword, ...registerData } = formData;
//       const result = await register(registerData);
//       if (result.success) {
//         toast.success('Registration successful! Welcome to MaxCash.');
//         navigate('/dashboard');
//       } else {
//         toast.error(result.error || 'Registration failed. Please try again.');
//       }
//     } catch (error) {
//       toast.error('An unexpected error occurred.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//             Create your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link to={ROUTES.LOGIN} className="font-medium text-primary-600 hover:text-primary-500">
//               Sign in
//             </Link>
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="First Name"
//                 placeholder="John"
//                 value={formData.firstName}
//                 onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                 required
//               />
//               <Input
//                 label="Last Name"
//                 placeholder="Doe"
//                 value={formData.lastName}
//                 onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                 required
//               />
//             </div>
//             <Input
//               label="Email"
//               type="email"
//               placeholder="john@example.com"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               required
//             />
//             <Input
//               label="Phone Number"
//               type="tel"
//               placeholder="+1234567890"
//               value={formData.phoneNumber}
//               onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//             />
//             <Input
//               label="Password"
//               type="password"
//               placeholder="Min 8 characters"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               required
//             />
//             <Input
//               label="Confirm Password"
//               type="password"
//               placeholder="Confirm your password"
//               value={formData.confirmPassword}
//               onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//               required
//             />
//           </div>

//           <Button type="submit" loading={loading} fullWidth>
//             Create Account
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };
