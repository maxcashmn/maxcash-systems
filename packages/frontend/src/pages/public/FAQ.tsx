import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/Card';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'General',
    question: 'What is MaxCash?',
    answer: 'MaxCash is a financial and business services company that provides lending, digital/telecom services, general trade, and business consultancy to help individuals and businesses maximize their cash potential.',
  },
  {
    category: 'General',
    question: 'Who can use MaxCash services?',
    answer: 'We serve both individuals and small businesses. Whether you need a loan, telecom services, or business consultancy, we have solutions for you.',
  },
  {
    category: 'Lending',
    question: 'What types of loans do you offer?',
    answer: 'We offer short-term micro-loans, business credit facilities, and professional money lending services. Loan amounts range from $50 to $5,000 depending on your needs and eligibility.',
  },
  {
    category: 'Lending',
    question: 'How do I apply for a loan?',
    answer: 'You can apply online through our application portal, or visit our office. The process is quick and straightforward.',
  },
  {
    category: 'Digital',
    question: 'What digital services do you offer?',
    answer: 'We are authorized agents for Lonestar MTN and Orange Money. We offer mobile money services, airtime, data bundles, SIM cards, and mobile accessories.',
  },
  {
    category: 'Digital',
    question: 'Do you sell airtime and data bundles?',
    answer: 'Yes! We offer both retail and wholesale airtime, scratch cards, and data bundles for all major networks.',
  },
  {
    category: 'Trade',
    question: 'What kind of merchandise do you trade?',
    answer: 'We import, distribute, and sell general merchandise including electronics, household goods, and business supplies.',
  },
  {
    category: 'Consultancy',
    question: 'What business consultancy services do you offer?',
    answer: 'We provide business planning, financial advisory, market analysis, operational support, and growth strategy services to help your business succeed.',
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
      staggerChildren: 0.05,
    },
  },
};

const categoryColors: Record<string, string> = {
  General: 'from-blue-400 to-blue-600',
  Lending: 'from-orange-400 to-orange-600',
  Digital: 'from-purple-400 to-purple-600',
  Trade: 'from-emerald-400 to-emerald-600',
  Consultancy: 'from-rose-400 to-rose-600',
};

const categoryBgColors: Record<string, string> = {
  General: 'bg-blue-50 text-blue-700 border-blue-200',
  Lending: 'bg-orange-50 text-orange-700 border-orange-200',
  Digital: 'bg-purple-50 text-purple-700 border-purple-200',
  Trade: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Consultancy: 'bg-rose-50 text-rose-700 border-rose-200',
};

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(faqs.map(f => f.category))];
  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(f => f.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 relative"
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
              <span className="text-sm font-medium text-orange-700">FAQ</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Frequently Asked </span>
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Questions</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our services.
            </p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-100 border border-slate-200/50 hover:border-orange-200'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-1 text-xs opacity-70">
                  ({faqs.filter(f => f.category === category).length})
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={`${faq.question}-${selectedCategory}`}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-slate-200/50 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
                  <motion.div
                    animate={{
                      opacity: [0, 0.05, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${categoryColors[faq.category] || 'from-orange-400 to-orange-600'} rounded-full blur-3xl`}
                  />
                  
                  <div className="relative z-10">
                    <motion.button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left p-4 focus:outline-none group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <span className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                            {faq.question}
                          </span>
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ 
                              opacity: activeIndex === index ? 1 : 0,
                              width: activeIndex === index ? '100%' : 0
                            }}
                            className={`h-0.5 bg-gradient-to-r ${categoryColors[faq.category] || 'from-orange-400 to-orange-600'} rounded-full mt-1`}
                          />
                        </div>
                        <motion.span
                          animate={{ rotate: activeIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-colors duration-300 ${
                            activeIndex === index
                              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                              : 'bg-gray-100 text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-600'
                          }`}
                        >
                          {activeIndex === index ? '−' : '+'}
                        </motion.span>
                      </div>
                    </motion.button>

                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            <motion.p
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="text-gray-600 leading-relaxed"
                            >
                              {faq.answer}
                            </motion.p>
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="mt-3"
                            >
                              <span className={`text-xs px-3 py-1 rounded-full border ${categoryBgColors[faq.category] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                                {faq.category}
                              </span>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500">No FAQs found for this category</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
            >
              View all FAQs
            </button>
          </motion.div>
        )}

        {/* Still Have Questions */}
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
                Still Have Questions?
              </h3>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? We're here to help.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-black/30"
                  >
                    Contact Us
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


// import React, { useState } from 'react';
// import { Card } from '../../components/ui/Card';

// interface FAQItem {
//   question: string;
//   answer: string;
//   category: string;
// }

// const faqs: FAQItem[] = [
//   {
//     category: 'General',
//     question: 'What is MaxCash?',
//     answer: 'MaxCash is a financial and business services company that provides lending, digital/telecom services, general trade, and business consultancy to help individuals and businesses maximize their cash potential.',
//   },
//   {
//     category: 'General',
//     question: 'Who can use MaxCash services?',
//     answer: 'We serve both individuals and small businesses. Whether you need a loan, telecom services, or business consultancy, we have solutions for you.',
//   },
//   {
//     category: 'Lending',
//     question: 'What types of loans do you offer?',
//     answer: 'We offer short-term micro-loans, business credit facilities, and professional money lending services. Loan amounts range from $50 to $5,000 depending on your needs and eligibility.',
//   },
//   {
//     category: 'Lending',
//     question: 'How do I apply for a loan?',
//     answer: 'You can apply online through our application portal, or visit our office. The process is quick and straightforward.',
//   },
//   {
//     category: 'Digital',
//     question: 'What digital services do you offer?',
//     answer: 'We are authorized agents for Lonestar MTN and Orange Money. We offer mobile money services, airtime, data bundles, SIM cards, and mobile accessories.',
//   },
//   {
//     category: 'Digital',
//     question: 'Do you sell airtime and data bundles?',
//     answer: 'Yes! We offer both retail and wholesale airtime, scratch cards, and data bundles for all major networks.',
//   },
//   {
//     category: 'Trade',
//     question: 'What kind of merchandise do you trade?',
//     answer: 'We import, distribute, and sell general merchandise including electronics, household goods, and business supplies.',
//   },
//   {
//     category: 'Consultancy',
//     question: 'What business consultancy services do you offer?',
//     answer: 'We provide business planning, financial advisory, market analysis, operational support, and growth strategy services to help your business succeed.',
//   },
// ];

// export const FAQ: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');

//   const categories = ['All', ...new Set(faqs.map(f => f.category))];
//   const filteredFaqs = selectedCategory === 'All' 
//     ? faqs 
//     : faqs.filter(f => f.category === selectedCategory);

//   return (
//     <div className="py-12">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
//           <p className="mt-4 text-lg text-gray-600">
//             Find answers to common questions about our services.
//           </p>
//         </div>

//         {/* Category Filter */}
//         <div className="flex flex-wrap gap-2 justify-center mb-8">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                 selectedCategory === category
//                   ? 'bg-primary-600 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* FAQ List */}
//         <div className="space-y-4">
//           {filteredFaqs.map((faq, index) => (
//             <Card key={index} className="overflow-hidden">
//               <button
//                 onClick={() => setActiveIndex(activeIndex === index ? null : index)}
//                 className="w-full text-left p-4 focus:outline-none"
//               >
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium text-gray-900">{faq.question}</span>
//                   <span className="text-gray-400">
//                     {activeIndex === index ? '−' : '+'}
//                   </span>
//                 </div>
//               </button>
//               {activeIndex === index && (
//                 <div className="px-4 pb-4 text-gray-600">
//                   {faq.answer}
//                   <div className="mt-2">
//                     <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
//                       {faq.category}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
