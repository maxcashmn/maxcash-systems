import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../core/hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ROUTES } from '../../core/constants/routes';

const services = [
  {
    icon: '💰',
    title: 'Lending & Credit',
    description: 'Short-term micro-loans, credit facilities, and professional money lending services for individuals and small businesses.',
  },
  {
    icon: '📱',
    title: 'Digital & Telecom',
    description: 'Authorized agent for Lonestar MTN and Orange Money, plus airtime, data bundles, SIM cards, and mobile accessories.',
  },
  {
    icon: '📦',
    title: 'General Trade',
    description: 'Importation, distribution, and sale of general merchandise and related products.',
  },
  {
    icon: '📊',
    title: 'Business Consultancy',
    description: 'Professional business consultancy and support services for your business growth.',
  },
];

const stats = [
  { value: '100+', label: 'Happy Clients' },
  { value: '$100K+', label: 'Funds Disbursed' },
  { value: '99%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Customer Support' },
];

export const Home: React.FC = () => {
  const { user } = useAuth();

  // Get the correct dashboard route based on user role
  const getDashboardRoute = () => {
    if (!user) return ROUTES.LOGIN;
    switch (user.role) {
      case 'admin':
        return ROUTES.ADMIN_DASHBOARD;
      case 'manager':
        return ROUTES.MANAGER_DASHBOARD;
      case 'auditor':
        return ROUTES.AUDITOR_DASHBOARD;
      default:
        return ROUTES.DASHBOARD;
    }
  };

  // Get the correct dashboard label based on user role
  const getDashboardLabel = () => {
    if (!user) return 'Dashboard';
    return user.role.charAt(0).toUpperCase() + user.role.slice(1) + ' Dashboard';
  };

  return (
    <div className="min-h-screen">
      {/* Dashboard Return Button for authenticated users */}
      {user && (
        <div className="bg-[#0a1929] border-b border-[#1a3159] px-4 py-2 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-end">
            <Link
              to={getDashboardRoute()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return to {getDashboardLabel()}
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                We <span className="text-primary-600">Maximize</span> Your Cash
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Empowering individuals and businesses with smart lending, digital services, and trade solutions.
                At MaxCash, we help you grow.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {user ? (
                  <Link to={getDashboardRoute()}>
                    <Button size="lg">Go to Dashboard</Button>
                  </Link>
                ) : (
                  <Link to={ROUTES.LOGIN}>
                    <Button size="lg">Get Started</Button>
                  </Link>
                )}
                <Link to="/services">
                  <Button variant="outline" size="lg">Our Services</Button>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-6xl mb-4">🚀</div>
                <p className="text-lg font-medium text-gray-900">Financial Growth Starts Here</p>
                <p className="text-sm text-gray-500 mt-2">
                  From lending to digital services, we've got you covered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What We Do</h2>
            <p className="mt-2 text-gray-600">Comprehensive solutions to maximize your cash potential</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} hover className="text-center">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Maximize Your Cash?</h2>
          <p className="mt-3 text-primary-100 text-lg">
            Join thousands of satisfied clients who trust MaxCash for their financial and business needs.
          </p>
          {user ? (
            <Link to={getDashboardRoute()}>
              <Button variant="secondary" size="lg" className="mt-6 bg-white text-primary-600 hover:bg-gray-100">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link to={ROUTES.REGISTER}>
              <Button variant="secondary" size="lg" className="mt-6 bg-white text-primary-600 hover:bg-gray-100">
                Get Started Now
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '../../components/ui/Button';
// import { Card } from '../../components/ui/Card';
// import { ROUTES } from '../../core/constants/routes';

// const services = [
//   {
//     icon: '💰',
//     title: 'Lending & Credit',
//     description: 'Short-term micro-loans, credit facilities, and professional money lending services for individuals and small businesses.',
//   },
//   {
//     icon: '📱',
//     title: 'Digital & Telecom',
//     description: 'Authorized agent for Lonestar MTN and Orange Money, plus airtime, data bundles, SIM cards, and mobile accessories.',
//   },
//   {
//     icon: '📦',
//     title: 'General Trade',
//     description: 'Importation, distribution, and sale of general merchandise and related products.',
//   },
//   {
//     icon: '��',
//     title: 'Business Consultancy',
//     description: 'Professional business consultancy and support services for your business growth.',
//   },
// ];

// const stats = [
//   { value: '100+', label: 'Happy Clients' },
//   { value: '$100K+', label: 'Funds Disbursed' },
//   { value: '99%', label: 'Satisfaction Rate' },
//   { value: '24/7', label: 'Customer Support' },
// ];

// export const Home: React.FC = () => {
//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//                 We <span className="text-primary-600">Maximize</span> Your Cash
//               </h1>
//               <p className="mt-4 text-lg text-gray-600">
//                 Empowering individuals and businesses with smart lending, digital services, and trade solutions.
//                 At MaxCash, we help you grow.
//               </p>
//               <div className="mt-8 flex flex-wrap gap-4">
//                 <Link to={ROUTES.LOGIN}>
//                   <Button size="lg">Get Started</Button>
//                 </Link>
//                 <Link to="/services">
//                   <Button variant="outline" size="lg">Our Services</Button>
//                 </Link>
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//                 <div className="text-6xl mb-4">🚀</div>
//                 <p className="text-lg font-medium text-gray-900">Financial Growth Starts Here</p>
//                 <p className="text-sm text-gray-500 mt-2">
//                   From lending to digital services, we've got you covered.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-12 bg-white border-t border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             {stats.map((stat, index) => (
//               <div key={index}>
//                 <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
//                 <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900">What We Do</h2>
//             <p className="mt-2 text-gray-600">Comprehensive solutions to maximize your cash potential</p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {services.map((service, index) => (
//               <Card key={index} hover className="text-center">
//                 <div className="text-4xl mb-3">{service.icon}</div>
//                 <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
//                 <p className="mt-2 text-sm text-gray-600">{service.description}</p>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-primary-600">
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-white">Ready to Maximize Your Cash?</h2>
//           <p className="mt-3 text-primary-100 text-lg">
//             Join thousands of satisfied clients who trust MaxCash for their financial and business needs.
//           </p>
//           <Link to={ROUTES.REGISTER}>
//             <Button variant="secondary" size="lg" className="mt-6 bg-white text-primary-600 hover:bg-gray-100">
//               Get Started Now
//             </Button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };
