// packages/frontend/src/pages/public/Cookies.tsx
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

export const Cookies: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="text-sm font-medium text-orange-700">Cookies</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Cookie </span>
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Policy</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              How we use cookies to improve your experience.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🍪</span>
                  1. What Are Cookies?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                  They are widely used to make websites work more efficiently and provide information to the site owners.
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔧</span>
                  2. How We Use Cookies
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>We use cookies for:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Essential cookies:</strong> Required for the website to function</li>
                    <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                    <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
                    <li><strong>Security cookies:</strong> Help protect your account and data</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚙️</span>
                  3. Managing Cookies
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    You can control and manage cookies in your browser settings:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Chrome: Settings → Privacy → Cookies</li>
                    <li>Firefox: Options → Privacy → Cookies</li>
                    <li>Safari: Preferences → Privacy → Cookies</li>
                    <li>Edge: Settings → Privacy → Cookies</li>
                  </ul>
                  <p className="mt-3">
                    Note that disabling cookies may affect some website functionality.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📞</span>
                  4. Contact Us
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    If you have questions about our cookie policy, please contact us:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-3">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">📞 Phone</p>
                      <p className="text-sm text-gray-800">+231 777 542 605</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">📧 Email</p>
                      <p className="text-sm text-gray-800">maxcashmn@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          <Link to={ROUTES.HOME}>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50">
              ← Return Home
            </Button>
          </Link>
          <Link to={ROUTES.TERMS}>
            <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
              View Terms
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};