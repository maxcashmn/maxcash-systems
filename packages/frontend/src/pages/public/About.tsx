import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';

const values = [
  {
    icon: '🤝',
    title: 'Trust & Integrity',
    description: 'We operate with honesty and transparency in all our dealings.',
  },
  {
    icon: '💡',
    title: 'Innovation',
    description: 'We embrace technology to deliver better financial solutions.',
  },
  {
    icon: '📈',
    title: 'Growth',
    description: 'We are committed to helping our clients and community grow.',
  },
  {
    icon: '🤲',
    title: 'Accessibility',
    description: 'We make financial services accessible to everyone.',
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

export const About: React.FC = () => {
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
              <span className="text-sm font-medium text-orange-700">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">About </span>
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">MaxCash</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We maximize your cash through smart lending, digital services, and business solutions.
            </p>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-orange-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <motion.div
                animate={{
                  opacity: [0, 0.1, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-3xl"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🎯</span>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Our Mission
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To provide accessible financial services, digital solutions, and business support
                  that empower individuals and small businesses to achieve their goals.
                </p>
                <motion.div
                  whileHover={{ width: 32 }}
                  className="mt-4 w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-300"
                />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/50 border-2 border-emerald-100/30 hover:border-emerald-200/50 transition-all duration-300 hover:shadow-xl">
              <motion.div
                animate={{
                  opacity: [0, 0.1, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full blur-3xl"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">👁️</span>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                    Our Vision
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading financial and business services provider in Liberia,
                  known for innovation, trust, and impact.
                </p>
                <motion.div
                  whileHover={{ width: 32 }}
                  className="mt-4 w-16 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-300"
                />
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-orange-200/50">
              <span className="text-sm font-medium text-orange-700">Core Values</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              What Drives Us
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do at MaxCash
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card hover className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-transparent hover:border-orange-200/30 transition-all duration-500 hover:shadow-2xl text-center h-full">
                  <motion.div
                    animate={{
                      opacity: [0, 0.1, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-3xl"
                  />
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="text-5xl mb-4 inline-block"
                    >
                      {value.icon}
                    </motion.div>
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                      {value.title}
                    </h4>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {value.description}
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
        </motion.div>

        {/* Services Overview */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.7 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-emerald-50/30 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
            <motion.div
              animate={{
                opacity: [0, 0.05, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-emerald-400 rounded-full blur-3xl"
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📋</span>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent">
                  What We Offer
                </h3>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: '💰', title: 'Lending', desc: 'Micro-loans, credit facilities' },
                  { icon: '📱', title: 'Telecom', desc: 'Airtime, data, mobile money' },
                  { icon: '📦', title: 'Trade', desc: 'Importation, distribution' },
                  { icon: '📊', title: 'Consultancy', desc: 'Business support services' },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="group p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200/50 hover:border-orange-200/50 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <motion.span
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl"
                      >
                        {service.icon}
                      </motion.span>
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                          {service.title}
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 text-center"
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
                Ready to Grow with MaxCash?
              </h3>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied clients who trust us for their financial and business needs.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-black/30"
                >
                  Get in Touch
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};



// import React from 'react';
// import { Card } from '../../components/ui/Card';

// const values = [
//   {
//     icon: '🤝',
//     title: 'Trust & Integrity',
//     description: 'We operate with honesty and transparency in all our dealings.',
//   },
//   {
//     icon: '💡',
//     title: 'Innovation',
//     description: 'We embrace technology to deliver better financial solutions.',
//   },
//   {
//     icon: '📈',
//     title: 'Growth',
//     description: 'We are committed to helping our clients and community grow.',
//   },
//   {
//     icon: '🤲',
//     title: 'Accessibility',
//     description: 'We make financial services accessible to everyone.',
//   },
// ];

// export const About: React.FC = () => {
//   return (
//     <div className="py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Mission Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900">About MaxCash</h1>
//           <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
//             We maximize your cash through smart lending, digital services, and business solutions.
//           </p>
//         </div>

//         {/* Mission & Vision */}
//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           <Card>
//             <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
//             <p className="mt-2 text-gray-600">
//               To provide accessible financial services, digital solutions, and business support
//               that empower individuals and small businesses to achieve their goals.
//             </p>
//           </Card>
//           <Card>
//             <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
//             <p className="mt-2 text-gray-600">
//               To be the leading financial and business services provider in Liberia,
//               known for innovation, trust, and impact.
//             </p>
//           </Card>
//         </div>

//         {/* Values */}
//         <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Core Values</h2>
//         <div className="grid md:grid-cols-4 gap-6 mb-12">
//           {values.map((value, index) => (
//             <Card key={index} hover className="text-center">
//               <div className="text-4xl mb-2">{value.icon}</div>
//               <h4 className="font-semibold text-gray-900">{value.title}</h4>
//               <p className="mt-1 text-sm text-gray-600">{value.description}</p>
//             </Card>
//           ))}
//         </div>

//         {/* Services Overview */}
//         <Card>
//           <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Offer</h3>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <p className="font-medium text-gray-900">💰 Lending</p>
//               <p className="text-sm text-gray-600">Micro-loans, credit facilities</p>
//             </div>
//             <div>
//               <p className="font-medium text-gray-900">📱 Telecom</p>
//               <p className="text-sm text-gray-600">Airtime, data, mobile money</p>
//             </div>
//             <div>
//               <p className="font-medium text-gray-900">📦 Trade</p>
//               <p className="text-sm text-gray-600">Importation, distribution</p>
//             </div>
//             <div>
//               <p className="font-medium text-gray-900">📊 Consultancy</p>
//               <p className="text-sm text-gray-600">Business support services</p>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };
