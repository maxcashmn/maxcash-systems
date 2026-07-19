// packages/frontend/src/pages/public/ApplicationSuccess.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const ApplicationSuccess: React.FC = () => {
  const location = useLocation();
  const { reference, applicationId } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/50 border-2 border-emerald-200/50 hover:border-emerald-300/70 transition-all duration-300 hover:shadow-xl text-center p-8">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Application Submitted!
            </h1>
            
            {reference && (
              <div className="mb-4 p-3 bg-emerald-100/50 rounded-lg border border-emerald-200">
                <p className="text-sm text-gray-600">Application Reference</p>
                <p className="text-lg font-mono font-bold text-emerald-700">{reference}</p>
              </div>
            )}
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for applying with MaxCash. Our team will review your application 
              and contact you within 24 hours.
            </p>

            <div className="space-y-4 text-left bg-emerald-50/50 p-4 rounded-lg border border-emerald-200/50 mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">📋 What happens next?</span>
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">1.</span>
                  <span>Our team will review your application</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">2.</span>
                  <span>We'll contact you for any additional information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">3.</span>
                  <span>You'll receive a decision within 24-48 hours</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                  Return Home
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                  View Services
                </Button>
              </Link>
              {applicationId && (
                <Link to={`/loan-status/${applicationId}`}>
                  <Button variant="outline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50">
                    Check Status
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};



// // packages/frontend/src/pages/public/ApplicationSuccess.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Button } from '../../components/ui/Button';
// import { Card } from '../../components/ui/Card';

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// export const ApplicationSuccess: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           transition={{ duration: 0.8 }}
//         >
//           <Card className="relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/50 border-2 border-emerald-200/50 hover:border-emerald-300/70 transition-all duration-300 hover:shadow-xl text-center p-8">
//             <motion.div
//               animate={{
//                 scale: [1, 1.1, 1],
//               }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//               className="text-6xl mb-4"
//             >
//               🎉
//             </motion.div>
            
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">
//               Application Submitted!
//             </h1>
            
//             <p className="text-gray-600 mb-6 leading-relaxed">
//               Thank you for applying with MaxCash. Our team will review your application 
//               and contact you within 24 hours.
//             </p>

//             <div className="space-y-4 text-left bg-emerald-50/50 p-4 rounded-lg border border-emerald-200/50 mb-6">
//               <p className="text-sm text-gray-700">
//                 <span className="font-semibold">📋 What happens next?</span>
//               </p>
//               <ul className="space-y-2 text-sm text-gray-600">
//                 <li className="flex items-start gap-2">
//                   <span className="text-emerald-500">1.</span>
//                   <span>Our team will review your application</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-emerald-500">2.</span>
//                   <span>We'll contact you for any additional information</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-emerald-500">3.</span>
//                   <span>You'll receive a decision within 24-48 hours</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="flex flex-wrap gap-4 justify-center">
//               <Link to="/">
//                 <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
//                   Return Home
//                 </Button>
//               </Link>
//               <Link to="/services">
//                 <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
//                   View Services
//                 </Button>
//               </Link>
//             </div>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// };