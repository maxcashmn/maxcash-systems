import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
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

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Home: React.FC = () => {
  const { user } = useAuth();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

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

  const getDashboardLabel = () => {
    if (!user) return 'Dashboard';
    return user.role.charAt(0).toUpperCase() + user.role.slice(1) + ' Dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Dashboard Return Button for authenticated users */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#0a1929] via-[#0d2137] to-[#0a1929] border-b border-[#1a3159]/50 px-4 py-2 sticky top-0 z-50 backdrop-blur-sm shadow-xl"
        >
          <div className="max-w-7xl mx-auto flex justify-end">
            <Link
              to={getDashboardRoute()}
              className="group relative flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <svg className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="relative z-10">Return to {getDashboardLabel()}</span>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-emerald-50/50 py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-orange-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-orange-200/50">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-orange-700">Welcome to MaxCash</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">We </span>
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Maximize</span>
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"> Your Cash</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-lg">
                Empowering individuals and businesses with smart lending, digital services, and trade solutions.
                At MaxCash, we help you grow.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {user ? (
                  <Link to={getDashboardRoute()}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50">
                        Go to Dashboard
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <Link to={ROUTES.LOGIN}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50">
                        Get Started
                      </Button>
                    </motion.div>
                  </Link>
                )}
                <Link to="/services">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400">
                      Our Services
                    </Button>
                  </motion.div>
                </Link>
              </div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center gap-6"
              >
                <div className="flex -space-x-2">
                  {['😊', '😍', '🤩', '😎'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 300 }}
                      className="w-10 h-10 rounded-full bg-white border-2 border-orange-200 flex items-center justify-center text-lg shadow-lg"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Trusted by 100+ clients</p>
                  <p className="text-xs text-gray-500">⭐ 4.9/5 average rating</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-20 h-20 bg-orange-200 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-20 h-20 bg-emerald-200 rounded-full blur-2xl"
                />
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-7xl mb-6"
                  >
                    🚀
                  </motion.div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Financial Growth Starts Here
                  </h3>
                  <p className="text-gray-600 mt-3">
                    From lending to digital services, we've got you covered with comprehensive solutions.
                  </p>
                  <div className="mt-6 flex gap-3 flex-wrap">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">✅ Fast Approval</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">🔒 Secure</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">💯 Reliable</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={ref} className="py-16 bg-gradient-to-r from-white via-slate-50 to-white border-y border-slate-200/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400/5 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative inline-block">
                  <motion.div
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-2xl"
                  />
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-slate-100/50">
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 300 }}
                      className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-orange-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-orange-200/50">
              <span className="text-sm font-medium text-orange-700">Our Services</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              What We Do
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions to maximize your cash potential
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card hover className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-transparent hover:border-orange-200/30 transition-all duration-500 hover:shadow-2xl text-center">
                  <motion.div
                    animate={{
                      opacity: [0, 0.1, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-3xl"
                  />
                  
                  <div className="relative z-10 text-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="text-5xl mb-4 inline-block"
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {service.description}
                    </p>
                    <motion.div
                      whileHover={{ width: 32 }}
                      className="mt-4 w-12 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto transition-all duration-300"
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700">
          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
          
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full"
          />
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-20 w-6 h-6 bg-white/20 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 w-8 h-8 bg-white/10 rounded-full"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="inline-block p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20"
            >
              <span className="text-4xl">💪</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Maximize Your Cash?
            </h2>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied clients who trust MaxCash for their financial and business needs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {user ? (
                <Link to={getDashboardRoute()}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg shadow-black/20 hover:shadow-black/30"
                    >
                      Go to Dashboard
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <Link to={ROUTES.REGISTER}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg shadow-black/20 hover:shadow-black/30"
                    >
                      Get Started Now
                    </Button>
                  </motion.div>
                </Link>
              )}
              <Link to="/services">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 hover:border-white/50"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Link>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mt-8 flex flex-wrap justify-center gap-6 text-white/70 text-sm"
            >
              {['No Hidden Fees', 'Secure Transactions', '24/7 Support', 'Fast Approval'].map((text, i) => (
                <motion.span
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center gap-2"
                >
                  <span className="text-green-300">✓</span> {text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};




// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../core/hooks/useAuth';
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
//     icon: '📊',
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
//   const { user } = useAuth();

//   // Get the correct dashboard route based on user role
//   const getDashboardRoute = () => {
//     if (!user) return ROUTES.LOGIN;
//     switch (user.role) {
//       case 'admin':
//         return ROUTES.ADMIN_DASHBOARD;
//       case 'manager':
//         return ROUTES.MANAGER_DASHBOARD;
//       case 'auditor':
//         return ROUTES.AUDITOR_DASHBOARD;
//       default:
//         return ROUTES.DASHBOARD;
//     }
//   };

//   // Get the correct dashboard label based on user role
//   const getDashboardLabel = () => {
//     if (!user) return 'Dashboard';
//     return user.role.charAt(0).toUpperCase() + user.role.slice(1) + ' Dashboard';
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Dashboard Return Button for authenticated users */}
//       {user && (
//         <div className="bg-[#0a1929] border-b border-[#1a3159] px-4 py-2 sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto flex justify-end">
//             <Link
//               to={getDashboardRoute()}
//               className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//               </svg>
//               Return to {getDashboardLabel()}
//             </Link>
//           </div>
//         </div>
//       )}

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
//                 {user ? (
//                   <Link to={getDashboardRoute()}>
//                     <Button size="lg">Go to Dashboard</Button>
//                   </Link>
//                 ) : (
//                   <Link to={ROUTES.LOGIN}>
//                     <Button size="lg">Get Started</Button>
//                   </Link>
//                 )}
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
//           {user ? (
//             <Link to={getDashboardRoute()}>
//               <Button variant="secondary" size="lg" className="mt-6 bg-white text-primary-600 hover:bg-gray-100">
//                 Go to Dashboard
//               </Button>
//             </Link>
//           ) : (
//             <Link to={ROUTES.REGISTER}>
//               <Button variant="secondary" size="lg" className="mt-6 bg-white text-primary-600 hover:bg-gray-100">
//                 Get Started Now
//               </Button>
//             </Link>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

