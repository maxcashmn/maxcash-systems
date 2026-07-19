// packages/frontend/src/pages/public/Terms.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ROUTES } from '../../core/routing';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const Terms: React.FC = () => {
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
              <span className="text-sm font-medium text-orange-700">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Terms & </span>
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Conditions</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services or applying for a loan.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </motion.div>

        {/* Terms Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Section 1: Introduction */}
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <motion.div
                animate={{
                  opacity: [0, 0.05, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-3xl"
              />
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  1. Introduction
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    Welcome to MaxCash. By accessing or using our services, you agree to be bound by these terms and conditions. 
                    If you do not agree with any part of these terms, please do not use our services.
                  </p>
                  <p>
                    MaxCash provides financial services including lending, digital/telecom services, general trade, 
                    and business consultancy to individuals and businesses in Liberia.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Section 2: Loan Services */}
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  2. Loan Services
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-800">2.1 Loan Application:</strong> All loan applications are subject to review and approval. 
                    We reserve the right to approve or reject any application at our sole discretion.
                  </p>
                  <p>
                    <strong className="text-gray-800">2.2 Loan Amounts:</strong> Loan amounts range from $100 to $50,000 depending on 
                    the type of loan, borrower's creditworthiness, and available collateral.
                  </p>
                  <p>
                    <strong className="text-gray-800">2.3 Interest Rates:</strong> Interest rates are determined based on the loan type, 
                    amount, term, and risk assessment. Rates range from 1% to 20% simple interest.
                  </p>
                  <p>
                    <strong className="text-gray-800">2.4 Repayment:</strong> Loan repayments must be made according to the agreed schedule. 
                    Late payments may result in additional fees and penalties.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Section 3: Eligibility */}
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  3. Eligibility
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-800">3.1 Age Requirement:</strong> Applicants must be at least 18 years old to apply for any loan product.
                  </p>
                  <p>
                    <strong className="text-gray-800">3.2 Identification:</strong> Valid government-issued identification is required for all loan applications.
                  </p>
                  <p>
                    <strong className="text-gray-800">3.3 Residency:</strong> Applicants must be residents of Liberia or have a verifiable presence in the country.
                  </p>
                  <p>
                    <strong className="text-gray-800">3.4 Income:</strong> Applicants must demonstrate the ability to repay the loan through verifiable income or assets.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Section 4: User Obligations */}
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  4. User Obligations
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-800">4.1 Accurate Information:</strong> You agree to provide accurate, current, and complete information during the application process.
                  </p>
                  <p>
                    <strong className="text-gray-800">4.2 Timely Repayment:</strong> You agree to make all loan payments on time and in full according to the agreed schedule.
                  </p>
                  <p>
                    <strong className="text-gray-800">4.3 Communication:</strong> You agree to respond to our communications and provide any additional information requested.
                  </p>
                  <p>
                    <strong className="text-gray-800">4.4 Notification:</strong> You agree to notify us immediately of any changes to your contact information or financial situation.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Section 5: Privacy */}
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🛡️</span>
                  5. Privacy & Data Protection
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-800">5.1 Data Collection:</strong> We collect and process personal data necessary for providing our services, including but not limited to: name, contact details, financial information, and identification documents.
                  </p>
                  <p>
                    <strong className="text-gray-800">5.2 Data Usage:</strong> Your data is used for processing applications, managing loans, and providing customer support. We do not share your data with third parties without your consent, except as required by law.
                  </p>
                  <p>
                    <strong className="text-gray-800">5.3 Data Security:</strong> We implement appropriate security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <p>
                    <strong className="text-gray-800">5.4 Data Retention:</strong> We retain your data for as long as necessary to provide services and comply with legal obligations.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Section 6: Fees & Charges */}
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💳</span>
                  6. Fees & Charges
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-800">6.1 Interest:</strong> Interest is calculated as a percentage of the principal amount at the agreed rate.
                  </p>
                  <p>
                    <strong className="text-gray-800">6.2 Late Payment:</strong> Late payments may incur additional charges as specified in your loan agreement.
                  </p>
                  <p>
                    <strong className="text-gray-800">6.3 Service Fees:</strong> We may charge service fees for processing applications, disbursing loans, and managing accounts.
                  </p>
                  <p>
                    <strong className="text-gray-800">6.4 Disclosure:</strong> All fees and charges will be clearly disclosed in your loan agreement before you accept the loan.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Section 7: Termination */}
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⛔</span>
                  7. Termination
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-800">7.1 Default:</strong> We reserve the right to terminate or suspend services if you fail to meet your obligations or violate these terms.
                  </p>
                  <p>
                    <strong className="text-gray-800">7.2 Notice:</strong> We will provide reasonable notice of termination, except in cases of fraud or illegal activity.
                  </p>
                  <p>
                    <strong className="text-gray-800">7.3 Consequences:</strong> Termination may result in acceleration of loan repayment and additional collection activities.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Section 8: Limitation of Liability */}
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚖️</span>
                  8. Limitation of Liability
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-800">8.1 Disclaimer:</strong> Our services are provided "as is" without warranties of any kind, either express or implied.
                  </p>
                  <p>
                    <strong className="text-gray-800">8.2 Liability:</strong> To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of our services.
                  </p>
                  <p>
                    <strong className="text-gray-800">8.3 Force Majeure:</strong> We are not liable for delays or failures in performance resulting from causes beyond our reasonable control.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Section 9: Governing Law */}
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏛️</span>
                  9. Governing Law
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    These terms and conditions shall be governed by and construed in accordance with the laws of Liberia. 
                    Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Liberia.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Section 10: Contact */}
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📞</span>
                  10. Contact Us
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    If you have any questions about these terms and conditions, please contact us:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-3">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">📍 Address</p>
                      <p className="text-sm text-gray-800">Monrovia, Liberia</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">📞 Phone</p>
                      <p className="text-sm text-gray-800">+231 777 542 605</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">📧 Email</p>
                      <p className="text-sm text-gray-800">maxcashmn@gmail.com</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">🕐 Hours</p>
                      <p className="text-sm text-gray-800">Mon-Fri 8AM-6PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Back to Apply Button */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          <Link to={ROUTES.APPLY}>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50">
              ← Back to Application
            </Button>
          </Link>
          <Link to={ROUTES.HOME}>
            <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};


// // packages/frontend/src/pages/public/Terms.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Card } from '../../components/ui/Card';
// import { Button } from '../../components/ui/Button';

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.05,
//     },
//   },
// };

// export const Terms: React.FC = () => {
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
//               <span className="text-sm font-medium text-orange-700">Legal</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold">
//               <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Terms & </span>
//               <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Conditions</span>
//             </h1>
//             <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               Please read these terms carefully before using our services or applying for a loan.
//             </p>
//             <p className="mt-2 text-sm text-gray-500">
//               Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//             </p>
//           </div>
//         </motion.div>

//         {/* Terms Content */}
//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           animate="visible"
//           className="space-y-6"
//         >
//           {/* Section 1: Introduction */}
//           <motion.div variants={fadeInUp}>
//             <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
//               <motion.div
//                 animate={{
//                   opacity: [0, 0.05, 0],
//                 }}
//                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-3xl"
//               />
//               <div className="relative z-10 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="text-2xl">📋</span>
//                   1. Introduction
//                 </h2>
//                 <div className="space-y-3 text-gray-600 leading-relaxed">
//                   <p>
//                     Welcome to MaxCash. By accessing or using our services, you agree to be bound by these terms and conditions. 
//                     If you do not agree with any part of these terms, please do not use our services.
//                   </p>
//                   <p>
//                     MaxCash provides financial services including lending, digital/telecom services, general trade, 
//                     and business consultancy to individuals and businesses in Liberia.
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* Section 2: Loan Services */}
//           <motion.div variants={fadeInUp}>
//             <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
//               <div className="relative z-10 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="text-2xl">💰</span>
//                   2. Loan Services
//                 </h2>
//                 <div className="space-y-3 text-gray-600 leading-relaxed">
//                   <p>
//                     <strong className="text-gray-800">2.1 Loan Application:</strong> All loan applications are subject to review and approval. 
//                     We reserve the right to approve or reject any application at our sole discretion.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">2.2 Loan Amounts:</strong> Loan amounts range from $100 to $50,000 depending on 
//                     the type of loan, borrower's creditworthiness, and available collateral.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">2.3 Interest Rates:</strong> Interest rates are determined based on the loan type, 
//                     amount, term, and risk assessment. Rates range from 1% to 20% simple interest.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">2.4 Repayment:</strong> Loan repayments must be made according to the agreed schedule. 
//                     Late payments may result in additional fees and penalties.
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* Section 3: Eligibility */}
//           <motion.div variants={fadeInUp}>
//             <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
//               <div className="relative z-10 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="text-2xl">✅</span>
//                   3. Eligibility
//                 </h2>
//                 <div className="space-y-3 text-gray-600 leading-relaxed">
//                   <p>
//                     <strong className="text-gray-800">3.1 Age Requirement:</strong> Applicants must be at least 18 years old to apply for any loan product.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">3.2 Identification:</strong> Valid government-issued identification is required for all loan applications.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">3.3 Residency:</strong> Applicants must be residents of Liberia or have a verifiable presence in the country.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">3.4 Income:</strong> Applicants must demonstrate the ability to repay the loan through verifiable income or assets.
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* Section 4: User Obligations */}
//           <motion.div variants={fadeInUp}>
//             <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
//               <div className="relative z-10 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="text-2xl">🔒</span>
//                   4. User Obligations
//                 </h2>
//                 <div className="space-y-3 text-gray-600 leading-relaxed">
//                   <p>
//                     <strong className="text-gray-800">4.1 Accurate Information:</strong> You agree to provide accurate, current, and complete information during the application process.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">4.2 Timely Repayment:</strong> You agree to make all loan payments on time and in full according to the agreed schedule.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">4.3 Communication:</strong> You agree to respond to our communications and provide any additional information requested.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">4.4 Notification:</strong> You agree to notify us immediately of any changes to your contact information or financial situation.
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* Section 5: Privacy */}
//           <motion.div variants={fadeInUp}>
//             <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
//               <div className="relative z-10 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="text-2xl">🛡️</span>
//                   5. Privacy & Data Protection
//                 </h2>
//                 <div className="space-y-3 text-gray-600 leading-relaxed">
//                   <p>
//                     <strong className="text-gray-800">5.1 Data Collection:</strong> We collect and process personal data necessary for providing our services, including but not limited to: name, contact details, financial information, and identification documents.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">5.2 Data Usage:</strong> Your data is used for processing applications, managing loans, and providing customer support. We do not share your data with third parties without your consent, except as required by law.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">5.3 Data Security:</strong> We implement appropriate security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">5.4 Data Retention:</strong> We retain your data for as long as necessary to provide services and comply with legal obligations.
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* Section 6: Fees & Charges */}
//           <motion.div variants={fadeInUp}>
//             <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
//               <div className="relative z-10 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="text-2xl">💳</span>
//                   6. Fees & Charges
//                 </h2>
//                 <div className="space-y-3 text-gray-600 leading-relaxed">
//                   <p>
//                     <strong className="text-gray-800">6.1 Interest:</strong> Interest is calculated as a percentage of the principal amount at the agreed rate.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">6.2 Late Payment:</strong> Late payments may incur additional charges as specified in your loan agreement.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">6.3 Service Fees:</strong> We may charge service fees for processing applications, disbursing loans, and managing accounts.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">6.4 Disclosure:</strong> All fees and charges will be clearly disclosed in your loan agreement before you accept the loan.
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* Section 7: Termination */}
//           <motion.div variants={fadeInUp}>
//             <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
//               <div className="relative z-10 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="text-2xl">⛔</span>
//                   7. Termination
//                 </h2>
//                 <div className="space-y-3 text-gray-600 leading-relaxed">
//                   <p>
//                     <strong className="text-gray-800">7.1 Default:</strong> We reserve the right to terminate or suspend services if you fail to meet your obligations or violate these terms.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">7.2 Notice:</strong> We will provide reasonable notice of termination, except in cases of fraud or illegal activity.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">7.3 Consequences:</strong> Termination may result in acceleration of loan repayment and additional collection activities.
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* Section 8: Limitation of Liability */}
//           <motion.div variants={fadeInUp}>
//             <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
//               <div className="relative z-10 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="text-2xl">⚖️</span>
//                   8. Limitation of Liability
//                 </h2>
//                 <div className="space-y-3 text-gray-600 leading-relaxed">
//                   <p>
//                     <strong className="text-gray-800">8.1 Disclaimer:</strong> Our services are provided "as is" without warranties of any kind, either express or implied.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">8.2 Liability:</strong> To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of our services.
//                   </p>
//                   <p>
//                     <strong className="text-gray-800">8.3 Force Majeure:</strong> We are not liable for delays or failures in performance resulting from causes beyond our reasonable control.
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* Section 9: Governing Law */}
//           <motion.div variants={fadeInUp}>
//             <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
//               <div className="relative z-10 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="text-2xl">🏛️</span>
//                   9. Governing Law
//                 </h2>
//                 <div className="space-y-3 text-gray-600 leading-relaxed">
//                   <p>
//                     These terms and conditions shall be governed by and construed in accordance with the laws of Liberia. 
//                     Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Liberia.
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* Section 10: Contact */}
//           <motion.div variants={fadeInUp}>
//             <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
//               <div className="relative z-10 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="text-2xl">📞</span>
//                   10. Contact Us
//                 </h2>
//                 <div className="space-y-3 text-gray-600 leading-relaxed">
//                   <p>
//                     If you have any questions about these terms and conditions, please contact us:
//                   </p>
//                   <div className="grid sm:grid-cols-2 gap-3 mt-3">
//                     <div className="bg-slate-50 p-3 rounded-lg">
//                       <p className="text-xs text-gray-500">📍 Address</p>
//                       <p className="text-sm text-gray-800">Monrovia, Liberia</p>
//                     </div>
//                     <div className="bg-slate-50 p-3 rounded-lg">
//                       <p className="text-xs text-gray-500">📞 Phone</p>
//                       <p className="text-sm text-gray-800">+231 777 542 605</p>
//                     </div>
//                     <div className="bg-slate-50 p-3 rounded-lg">
//                       <p className="text-xs text-gray-500">📧 Email</p>
//                       <p className="text-sm text-gray-800">maxcashmn@gmail.com</p>
//                     </div>
//                     <div className="bg-slate-50 p-3 rounded-lg">
//                       <p className="text-xs text-gray-500">🕐 Hours</p>
//                       <p className="text-sm text-gray-800">Mon-Fri 8AM-6PM</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>
//         </motion.div>

//         {/* Back to Apply Button */}
//         <motion.div
//           variants={fadeInUp}
//           initial="hidden"
//           animate="visible"
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-8 flex flex-wrap gap-4 justify-center"
//         >
//           <Link to="/apply">
//             <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50">
//               ← Back to Application
//             </Button>
//           </Link>
//           <Link to="/">
//             <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
//               Return Home
//             </Button>
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// };