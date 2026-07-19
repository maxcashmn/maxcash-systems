import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const services = [
  {
    id: 'lending',
    icon: '💰',
    title: 'Lending & Credit Services',
    description: 'Short-term micro-loans, credit facilities, and professional money lending for individuals and small businesses.',
    features: [
      'Micro-loans up to $5,000',
      'Business credit facilities',
      'Fast approval process',
      'Flexible repayment terms',
      'Risk management and debt recovery',
    ],
    gradient: 'from-orange-400 to-orange-600',
    bgGradient: 'from-orange-50 to-orange-100/30',
    iconBg: 'bg-orange-100',
  },
  {
    id: 'digital',
    icon: '📱',
    title: 'Digital & Telecom Services',
    description: 'Authorized agent for Lonestar MTN and Orange Money, plus retail and wholesale of telecom products.',
    features: [
      'Mobile money services (Lonestar MTN & Orange Money)',
      'Airtime and scratch cards',
      'Data bundles',
      'SIM cards',
      'Mobile hardware and accessories',
    ],
    gradient: 'from-blue-400 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100/30',
    iconBg: 'bg-blue-100',
  },
  {
    id: 'trade',
    icon: '📦',
    title: 'General Trade',
    description: 'Importation, distribution, and sale of general merchandise to meet your business needs.',
    features: [
      'Importation of goods',
      'Distribution services',
      'Retail and wholesale',
      'Quality merchandise',
      'Competitive pricing',
    ],
    gradient: 'from-purple-400 to-purple-600',
    bgGradient: 'from-purple-50 to-purple-100/30',
    iconBg: 'bg-purple-100',
  },
  {
    id: 'consultancy',
    icon: '📊',
    title: 'Business Consultancy',
    description: 'Professional business consultancy and support services to help your business thrive.',
    features: [
      'Business planning',
      'Financial advisory',
      'Market analysis',
      'Operational support',
      'Growth strategies',
    ],
    gradient: 'from-emerald-400 to-emerald-600',
    bgGradient: 'from-emerald-50 to-emerald-100/30',
    iconBg: 'bg-emerald-100',
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
      staggerChildren: 0.15,
    },
  },
};

export const Services: React.FC = () => {
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
              <span className="text-sm font-medium text-orange-700">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Our </span>
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Services</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions designed to maximize your cash and support your growth.
            </p>
          </div>
        </motion.div>

        {/* Services List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className={`relative overflow-hidden bg-gradient-to-br ${service.bgGradient} border-2 border-transparent hover:border-${service.gradient.split(' ')[1].replace('from-', '')}/30 transition-all duration-500 hover:shadow-2xl p-8`}>
                {/* Animated background glow */}
                <motion.div
                  animate={{
                    opacity: [0, 0.1, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl`}
                />
                <motion.div
                  animate={{
                    opacity: [0, 0.05, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 + 1 }}
                  className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl`}
                />

                <div className="relative z-10 flex flex-col md:flex-row gap-6">
                  {/* Icon with animation */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`text-5xl flex-shrink-0 w-20 h-20 rounded-2xl ${service.iconBg} flex items-center justify-center shadow-lg`}
                  >
                    {service.icon}
                  </motion.div>

                  <div className="flex-1">
                    <h2 className={`text-2xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      {service.title}
                    </h2>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features Grid */}
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="mt-4 grid sm:grid-cols-2 gap-2"
                    >
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          variants={fadeInUp}
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2 text-sm text-gray-700 list-none group"
                        >
                          <motion.span
                            whileHover={{ scale: 1.2 }}
                            className={`text-${service.gradient.split(' ')[0].replace('from-', '')} font-bold`}
                          >
                            ✓
                          </motion.span>
                          <span className="group-hover:text-gray-900 transition-colors duration-300">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </motion.div>

                    {/* Animated underline */}
                    <motion.div
                      whileHover={{ width: 32 }}
                      className={`mt-4 w-16 h-1 bg-gradient-to-r ${service.gradient} rounded-full transition-all duration-300`}
                    />
                  </div>
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
          className="text-center mt-16"
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
                Ready to Get Started?
              </h3>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                Apply now and let us help you maximize your cash potential.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link to="/apply">
                  <Button 
                    size="lg" 
                    className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg shadow-black/20 hover:shadow-black/30"
                  >
                    <span className="flex items-center gap-2">
                      Apply Now
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '4+', label: 'Services', icon: '🚀' },
            { value: '100+', label: 'Happy Clients', icon: '😊' },
            { value: '99%', label: 'Satisfaction', icon: '⭐' },
            { value: '24/7', label: 'Support', icon: '🛡️' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100/50 hover:shadow-xl hover:border-orange-200/50 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-3xl mb-2"
              >
                {stat.icon}
              </motion.div>
              <p className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};




// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Card } from '../../components/ui/Card';
// import { Button } from '../../components/ui/Button';

// const services = [
//   {
//     id: 'lending',
//     icon: '💰',
//     title: 'Lending & Credit Services',
//     description: 'Short-term micro-loans, credit facilities, and professional money lending for individuals and small businesses.',
//     features: [
//       'Micro-loans up to $5,000',
//       'Business credit facilities',
//       'Fast approval process',
//       'Flexible repayment terms',
//       'Risk management and debt recovery',
//     ],
//   },
//   {
//     id: 'digital',
//     icon: '📱',
//     title: 'Digital & Telecom Services',
//     description: 'Authorized agent for Lonestar MTN and Orange Money, plus retail and wholesale of telecom products.',
//     features: [
//       'Mobile money services (Lonestar MTN & Orange Money)',
//       'Airtime and scratch cards',
//       'Data bundles',
//       'SIM cards',
//       'Mobile hardware and accessories',
//     ],
//   },
//   {
//     id: 'trade',
//     icon: '📦',
//     title: 'General Trade',
//     description: 'Importation, distribution, and sale of general merchandise to meet your business needs.',
//     features: [
//       'Importation of goods',
//       'Distribution services',
//       'Retail and wholesale',
//       'Quality merchandise',
//       'Competitive pricing',
//     ],
//   },
//   {
//     id: 'consultancy',
//     icon: '📊',
//     title: 'Business Consultancy',
//     description: 'Professional business consultancy and support services to help your business thrive.',
//     features: [
//       'Business planning',
//       'Financial advisory',
//       'Market analysis',
//       'Operational support',
//       'Growth strategies',
//     ],
//   },
// ];

// export const Services: React.FC = () => {
//   return (
//     <div className="py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
//           <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
//             Comprehensive solutions designed to maximize your cash and support your growth.
//           </p>
//         </div>

//         <div className="space-y-8">
//           {services.map((service) => (
//             <Card key={service.id} className="p-8">
//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="text-5xl flex-shrink-0">{service.icon}</div>
//                 <div className="flex-1">
//                   <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
//                   <p className="mt-2 text-gray-600">{service.description}</p>
//                   <ul className="mt-4 grid sm:grid-cols-2 gap-2">
//                     {service.features.map((feature, index) => (
//                       <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
//                         <span className="text-primary-500">✓</span>
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Link to="/apply">
//             <Button size="lg">Apply Now</Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
