// packages/frontend/src/pages/public/Apply.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Add this import
import { motion } from 'framer-motion';
import { LoanApplicationForm } from '../../components/forms/LoanApplicationForm';
import { ROUTES } from '../../core/routing';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Apply: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"
          />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-orange-200/50">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-orange-700">Apply Now</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Start Your </span>
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Application</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Start maximizing your cash with MaxCash services. Fill out the form below and our team will get back to you within 24 hours.
            </p>
            
            {/* Quick info badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-slate-200/50">
                ⚡ Fast Approval
              </span>
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-slate-200/50">
                💰 Loans up to $50,000
              </span>
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-slate-200/50">
                📱 24/7 Support
              </span>
            </div>
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <LoanApplicationForm />
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: '🔒', label: 'Secure & Private' },
            { icon: '⚡', label: 'Fast Processing' },
            { icon: '💯', label: '100% Transparent' },
            { icon: '📞', label: 'Free Support' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200/50 hover:border-orange-200/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="text-xs font-medium text-gray-700">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Terms Link */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            By applying, you agree to our{' '}
            <Link to={ROUTES.TERMS} className="text-orange-500 hover:text-orange-600 hover:underline font-medium">
              Terms & Conditions
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};


// // packages/frontend/src/pages/public/Apply.tsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { LoanApplicationForm } from '../../components/forms/LoanApplicationForm';
// import { ROUTES } from '../../core/routing';

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// export const Apply: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Hero Section */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-10 relative"
//         >
//           <motion.div
//             animate={{
//               scale: [1, 1.1, 1],
//               opacity: [0.1, 0.2, 0.1],
//             }}
//             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"
//           />
          
//           <div className="relative z-10">
//             <div className="inline-flex items-center gap-2 bg-orange-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-orange-200/50">
//               <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
//               <span className="text-sm font-medium text-orange-700">Apply Now</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold">
//               <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Start Your </span>
//               <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Application</span>
//             </h1>
//             <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               Start maximizing your cash with MaxCash services. Fill out the form below and our team will get back to you within 24 hours.
//             </p>
            
//             {/* Quick info badges */}
//             <div className="mt-6 flex flex-wrap justify-center gap-3">
//               <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-slate-200/50">
//                 ⚡ Fast Approval
//               </span>
//               <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-slate-200/50">
//                 💰 Loans up to $50,000
//               </span>
//               <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-slate-200/50">
//                 📱 24/7 Support
//               </span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Application Form */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <LoanApplicationForm />
//         </motion.div>

//         {/* Trust Indicators */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
//         >
//           {[
//             { icon: '🔒', label: 'Secure & Private' },
//             { icon: '⚡', label: 'Fast Processing' },
//             { icon: '💯', label: '100% Transparent' },
//             { icon: '📞', label: 'Free Support' },
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ y: -5, scale: 1.02 }}
//               transition={{ type: 'spring', stiffness: 300 }}
//               className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200/50 hover:border-orange-200/50 hover:shadow-lg transition-all duration-300"
//             >
//               <div className="text-2xl mb-1">{item.icon}</div>
//               <p className="text-xs font-medium text-gray-700">{item.label}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Terms Link */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           className="mt-8 text-center"
//         >
//           <p className="text-sm text-gray-500">
//             By applying, you agree to our{' '}
//             <Link to={ROUTES.TERMS} className="text-orange-500 hover:text-orange-600 hover:underline font-medium">
//               Terms & Conditions
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };



// // packages/frontend/src/pages/public/Apply.tsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { LoanApplicationForm } from '../../components/forms/LoanApplicationForm';
// import { ROUTES } from '../../core/routing';

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// export const Apply: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Hero Section */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-10 relative"
//         >
//           <motion.div
//             animate={{
//               scale: [1, 1.1, 1],
//               opacity: [0.1, 0.2, 0.1],
//             }}
//             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"
//           />
          
//           <div className="relative z-10">
//             <div className="inline-flex items-center gap-2 bg-orange-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-orange-200/50">
//               <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
//               <span className="text-sm font-medium text-orange-700">Apply Now</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold">
//               <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Start Your </span>
//               <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Application</span>
//             </h1>
//             <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               Start maximizing your cash with MaxCash services. Fill out the form below and our team will get back to you within 24 hours.
//             </p>
            
//             {/* Quick info badges */}
//             <div className="mt-6 flex flex-wrap justify-center gap-3">
//               <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-slate-200/50">
//                 ⚡ Fast Approval
//               </span>
//               <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-slate-200/50">
//                 💰 Loans up to $50,000
//               </span>
//               <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-slate-200/50">
//                 📱 24/7 Support
//               </span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Application Form */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <LoanApplicationForm />
//         </motion.div>

//         {/* Trust Indicators */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
//         >
//           {[
//             { icon: '🔒', label: 'Secure & Private' },
//             { icon: '⚡', label: 'Fast Processing' },
//             { icon: '💯', label: '100% Transparent' },
//             { icon: '📞', label: 'Free Support' },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200/50 hover:border-orange-200/50 transition-all duration-300 hover:shadow-lg"
//             >
//               <div className="text-2xl mb-1">{item.icon}</div>
//               <p className="text-xs font-medium text-gray-700">{item.label}</p>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };


// // packages/frontend/src/pages/public/Apply.tsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { LoanApplicationForm } from '../../components/forms/LoanApplicationForm';

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// export const Apply: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Hero Section */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-10 relative"
//         >
//           <motion.div
//             animate={{
//               scale: [1, 1.1, 1],
//               opacity: [0.1, 0.2, 0.1],
//             }}
//             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"
//           />
          
//           <div className="relative z-10">
//             <div className="inline-flex items-center gap-2 bg-orange-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-orange-200/50">
//               <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
//               <span className="text-sm font-medium text-orange-700">Apply Now</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold">
//               <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Start Your </span>
//               <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Application</span>
//             </h1>
//             <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               Start maximizing your cash with MaxCash services. Fill out the form below and our team will get back to you within 24 hours.
//             </p>
            
//             {/* Quick info badges */}
//             <div className="mt-6 flex flex-wrap justify-center gap-3">
//               <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-slate-200/50">
//                 ⚡ Fast Approval
//               </span>
//               <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-slate-200/50">
//                 💰 Loans up to $50,000
//               </span>
//               <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-slate-200/50">
//                 📱 24/7 Support
//               </span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Application Form */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <LoanApplicationForm />
//         </motion.div>

//         {/* Trust Indicators */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
//         >
//           {[
//             { icon: '🔒', label: 'Secure & Private' },
//             { icon: '⚡', label: 'Fast Processing' },
//             { icon: '💯', label: '100% Transparent' },
//             { icon: '📞', label: 'Free Support' },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200/50 hover:border-orange-200/50 transition-all duration-300 hover:shadow-lg"
//             >
//               <div className="text-2xl mb-1">{item.icon}</div>
//               <p className="text-xs font-medium text-gray-700">{item.label}</p>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };




// import React from 'react';
// import { LoanApplicationForm } from '../../components/loan/LoanApplicationForm';

// export const Apply: React.FC = () => {
//   return (
//     <div className="py-12">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900">Apply Now</h1>
//           <p className="mt-2 text-lg text-gray-600">
//             Start maximizing your cash with MaxCash services.
//           </p>
//         </div>
//         <LoanApplicationForm />
//       </div>
//     </div>
//   );
// };
