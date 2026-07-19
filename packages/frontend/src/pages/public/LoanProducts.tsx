import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ROUTES } from '../../core/constants/routes';
import { formatCurrency } from '../../core/utils/formatters';

interface LoanProduct {
  id: string;
  code: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  requirements: string[];
  repaymentPeriod: string;
  icon: string;
  color: string;
  gradient: string;
}

const loanProducts: LoanProduct[] = [
  {
    id: 'nano',
    code: 'MC-NANO',
    name: 'Nano Loan',
    description: 'Quick, accessible loans for everyday needs and small expenses.',
    minAmount: 100,
    maxAmount: 500,
    requirements: [
      'Basic ID verification',
      'Phone number verification',
      'Customer trust assessment',
    ],
    repaymentPeriod: '1 month',
    icon: '🪙',
    color: 'from-green-50 to-emerald-50',
    gradient: 'from-green-400 to-emerald-600',
  },
  {
    id: 'consumer',
    code: 'MC-CONSUMER',
    name: 'Consumer Loan',
    description: 'Flexible consumer financing for personal and household needs.',
    minAmount: 501,
    maxAmount: 2000,
    requirements: [
      'Valid ID',
      'Proof of income or guarantor',
      'Collateral valued at loan amount',
    ],
    repaymentPeriod: '1 month',
    icon: '🛒',
    color: 'from-blue-50 to-indigo-50',
    gradient: 'from-blue-400 to-indigo-600',
  },
  {
    id: 'micro-business',
    code: 'MC-MICRO',
    name: 'Micro Business Loan',
    description: 'Empower your small business with working capital.',
    minAmount: 2001,
    maxAmount: 5000,
    requirements: [
      'Business activity verification',
      'Collateral valued at 2× loan amount',
    ],
    repaymentPeriod: '2 months',
    icon: '🏪',
    color: 'from-yellow-50 to-amber-50',
    gradient: 'from-yellow-400 to-amber-600',
  },
  {
    id: 'sme1',
    code: 'MC-SME1',
    name: 'Small Enterprise Loan',
    description: 'Grow your small enterprise with tailored financing.',
    minAmount: 5001,
    maxAmount: 10000,
    requirements: [
      'Business records',
      'Cash flow review',
      'Collateral valued at 2× loan amount',
    ],
    repaymentPeriod: '3 months',
    icon: '📈',
    color: 'from-purple-50 to-violet-50',
    gradient: 'from-purple-400 to-violet-600',
  },
  {
    id: 'sme2',
    code: 'MC-SME2',
    name: 'SME Growth Loan',
    description: 'Scale your business with substantial growth capital.',
    minAmount: 10001,
    maxAmount: 20000,
    requirements: [
      'Financial statements',
      'Business assessment',
      'Collateral valued at 2× loan amount',
    ],
    repaymentPeriod: '4 months',
    icon: '🚀',
    color: 'from-rose-50 to-pink-50',
    gradient: 'from-rose-400 to-pink-600',
  },
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

export const LoanProducts: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          {/* Decorative background element */}
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
              <span className="text-sm font-medium text-orange-700">Loan Products</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Our </span>
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Loan Products</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From nano loans to SME growth capital — we offer flexible lending
              solutions to help you maximize your cash.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500"
            >
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-sm">💰 Lending</span>
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-sm">📱 Digital & Telecom</span>
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200/50 shadow-sm">📦 General Trade</span>
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-200/50 shadow-sm">📊 Consultancy</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Loan Products Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {loanProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className={`relative overflow-hidden bg-gradient-to-br ${product.color} border-2 border-transparent hover:border-${product.gradient.split(' ')[0].replace('from-', '')}/30 transition-all duration-500 hover:shadow-2xl p-0`}>
                {/* Animated background glow */}
                <motion.div
                  animate={{
                    opacity: [0, 0.1, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${product.gradient} rounded-full blur-3xl`}
                />
                <motion.div
                  animate={{
                    opacity: [0, 0.05, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 + 1 }}
                  className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br ${product.gradient} rounded-full blur-3xl`}
                />

                <div className="relative z-10 p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="text-4xl"
                      >
                        {product.icon}
                      </motion.div>
                      <div>
                        <h3 className={`text-xl font-bold bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}>
                          {product.name}
                        </h3>
                        <span className="text-xs font-mono bg-white/60 backdrop-blur-sm px-2 py-0.5 rounded border border-slate-200/50">
                          {product.code}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-right"
                    >
                      <p className="text-sm font-bold text-gray-900">
                        {formatCurrency(product.minAmount)} – {formatCurrency(product.maxAmount)}
                      </p>
                      <p className="text-xs text-gray-500">Amount Range</p>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Requirements */}
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-700">Requirements:</p>
                    <ul className="mt-1 space-y-0.5">
                      {product.requirements.map((req, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="text-xs text-gray-600 flex items-start gap-1.5 group"
                        >
                          <motion.span
                            whileHover={{ scale: 1.2 }}
                            className={`text-${product.gradient.split(' ')[0].replace('from-', '')} font-bold`}
                          >
                            ✓
                          </motion.span>
                          <span className="group-hover:text-gray-800 transition-colors duration-300">
                            {req}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-200/50">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="text-xs text-gray-500"
                    >
                      📅 Repayment: <span className="font-medium text-gray-700">{product.repaymentPeriod}</span>
                    </motion.span>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to={ROUTES.APPLY}>
                        <Button 
                          size="sm" 
                          className={`bg-gradient-to-r ${product.gradient} text-white hover:shadow-lg transition-all duration-300`}
                        >
                          Apply Now
                        </Button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Animated underline */}
                  <motion.div
                    whileHover={{ width: '100%' }}
                    className={`mt-3 w-16 h-0.5 bg-gradient-to-r ${product.gradient} rounded-full transition-all duration-300`}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-8 md:p-12">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
            />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Need a Customized Solution?
              </h3>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                Contact us for personalized lending and financial services tailored to your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={ROUTES.CONTACT}>
                    <Button 
                      variant="secondary" 
                      size="lg"
                      className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg shadow-black/20 hover:shadow-black/30"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-8 text-center"
        >
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4 text-sm"
          >
            {[
              { icon: '📞', text: '+231 123 456 789' },
              { icon: '📧', text: 'info@maxcash.com' },
              { icon: '📍', text: 'Monrovia, Liberia' },
            ].map((item, index) => (
              <motion.span
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -2 }}
                className="text-gray-500 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/50"
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Card } from '../../components/ui/Card';
// import { Button } from '../../components/ui/Button';
// import { ROUTES } from '../../core/constants/routes';
// import { formatCurrency } from '../../core/utils/formatters';

// interface LoanProduct {
//   id: string;
//   code: string;
//   name: string;
//   description: string;
//   minAmount: number;
//   maxAmount: number;
//   requirements: string[];
//   repaymentPeriod: string;
//   icon: string;
//   color: string;
// }

// const loanProducts: LoanProduct[] = [
//   {
//     id: 'nano',
//     code: 'MC-NANO',
//     name: 'Nano Loan',
//     description: 'Quick, accessible loans for everyday needs and small expenses.',
//     minAmount: 100,
//     maxAmount: 500,
//     requirements: [
//       'Basic ID verification',
//       'Phone number verification',
//       'Customer trust assessment',
//     ],
//     repaymentPeriod: '1 month',
//     icon: '🪙',
//     color: 'from-green-50 to-emerald-50',
//   },
//   {
//     id: 'consumer',
//     code: 'MC-CONSUMER',
//     name: 'Consumer Loan',
//     description: 'Flexible consumer financing for personal and household needs.',
//     minAmount: 501,
//     maxAmount: 2000,
//     requirements: [
//       'Valid ID',
//       'Proof of income or guarantor',
//       'Collateral valued at loan amount',
//     ],
//     repaymentPeriod: '1 month',
//     icon: '🛒',
//     color: 'from-blue-50 to-indigo-50',
//   },
//   {
//     id: 'micro-business',
//     code: 'MC-MICRO',
//     name: 'Micro Business Loan',
//     description: 'Empower your small business with working capital.',
//     minAmount: 2001,
//     maxAmount: 5000,
//     requirements: [
//       'Business activity verification',
//       'Collateral valued at 2× loan amount',
//     ],
//     repaymentPeriod: '2 months',
//     icon: '🏪',
//     color: 'from-yellow-50 to-amber-50',
//   },
//   {
//     id: 'sme1',
//     code: 'MC-SME1',
//     name: 'Small Enterprise Loan',
//     description: 'Grow your small enterprise with tailored financing.',
//     minAmount: 5001,
//     maxAmount: 10000,
//     requirements: [
//       'Business records',
//       'Cash flow review',
//       'Collateral valued at 2× loan amount',
//     ],
//     repaymentPeriod: '3 months',
//     icon: '📈',
//     color: 'from-purple-50 to-violet-50',
//   },
//   {
//     id: 'sme2',
//     code: 'MC-SME2',
//     name: 'SME Growth Loan',
//     description: 'Scale your business with substantial growth capital.',
//     minAmount: 10001,
//     maxAmount: 20000,
//     requirements: [
//       'Financial statements',
//       'Business assessment',
//       'Collateral valued at 2× loan amount',
//     ],
//     repaymentPeriod: '4 months',
//     icon: '🚀',
//     color: 'from-rose-50 to-pink-50',
//   },
// ];

// export const LoanProducts: React.FC = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">
//           Our Loan Products
//         </h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//           From nano loans to SME growth capital — we offer flexible lending
//           solutions to help you maximize your cash.
//         </p>
//         <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
//           <span className="px-3 py-1 bg-gray-100 rounded-full">💰 Lending</span>
//           <span className="px-3 py-1 bg-gray-100 rounded-full">📱 Digital & Telecom</span>
//           <span className="px-3 py-1 bg-gray-100 rounded-full">📦 General Trade</span>
//           <span className="px-3 py-1 bg-gray-100 rounded-full">📊 Consultancy</span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {loanProducts.map((product) => (
//           <Card key={product.id} className={`bg-gradient-to-br ${product.color} hover:shadow-lg transition-shadow duration-200 border-0`}>
//             <div className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center gap-3">
//                   <span className="text-4xl">{product.icon}</span>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
//                     <span className="text-xs font-mono bg-gray-200 px-2 py-0.5 rounded">
//                       {product.code}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-900">
//                     {formatCurrency(product.minAmount)} – {formatCurrency(product.maxAmount)}
//                   </p>
//                   <p className="text-xs text-gray-500">Amount Range</p>
//                 </div>
//               </div>

//               <p className="mt-3 text-sm text-gray-600">{product.description}</p>

//               <div className="mt-3">
//                 <p className="text-xs font-medium text-gray-700">Requirements:</p>
//                 <ul className="mt-1 space-y-0.5">
//                   {product.requirements.map((req, idx) => (
//                     <li key={idx} className="text-xs text-gray-600 flex items-start gap-1.5">
//                       <span className="text-green-500">✓</span>
//                       {req}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="mt-3 flex items-center justify-between">
//                 <span className="text-xs text-gray-500">
//                   📅 Repayment: <span className="font-medium text-gray-700">{product.repaymentPeriod}</span>
//                 </span>
//                 <Link to={ROUTES.APPLY}>
//                   <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
//                     Apply Now
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       <div className="mt-12 text-center">
//         <p className="text-sm text-gray-600">
//           Need a customized solution?{' '}
//           <Link to={ROUTES.CONTACT} className="text-primary-600 hover:underline font-medium">
//             Contact us
//           </Link>{' '}
//           for personalized lending and financial services.
//         </p>
//         <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
//           <span className="text-gray-500">📞 +231 123 456 789</span>
//           <span className="text-gray-500">📧 info@maxcash.com</span>
//           <span className="text-gray-500">📍 Monrovia, Liberia</span>
//         </div>
//       </div>
//     </div>
//   );
// };
