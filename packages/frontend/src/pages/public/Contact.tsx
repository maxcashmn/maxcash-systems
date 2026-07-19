import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../../core/hooks/useToast';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/forms/TextArea';
import { Card } from '../../components/ui/Card';

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

export const Contact: React.FC = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Integrate with EmailJS or backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const whatsappNumber = '231777542605';
  const whatsappMessage = encodeURIComponent('Hello MaxCash! I would like to inquire about your services.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="text-sm font-medium text-orange-700">Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Get In </span>
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Touch</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have questions or need assistance? We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
              <motion.div
                animate={{
                  opacity: [0, 0.05, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-3xl"
              />
              
              <div className="relative z-10 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">✉️</span>
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div variants={fadeInUp}>
                      <Input
                        label="Full Name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div variants={fadeInUp}>
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+231 123 456 789"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeInUp}>
                    <Input
                      label="Subject"
                      name="subject"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeInUp}>
                    <TextArea
                      label="Message"
                      name="message"
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </motion.div>
                  
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      loading={loading} 
                      fullWidth
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </div>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Contact Info Card */}
            <motion.div variants={fadeInUp}>
              <Card className="relative overflow-hidden bg-gradient-to-br from-white to-orange-50/30 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
                <motion.div
                  animate={{
                    opacity: [0, 0.05, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-3xl"
                />
                
                <div className="relative z-10 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📌</span>
                    Contact Information
                  </h3>
                  
                  <div className="space-y-4 text-sm">
                    {[
                      { icon: '📍', label: 'Address', value: 'Monrovia, Liberia' },
                      { icon: '📞', label: 'Phone', value: '+231 777 542 605' },
                      { icon: '📧', label: 'Email', value: 'maxcashmn@gmail.com' },
                      { 
                        icon: '🕐', 
                        label: 'Hours', 
                        value: (
                          <>
                            <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                            <p className="text-gray-900">Sat: 9:00 AM - 2:00 PM</p>
                          </>
                        )
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        whileHover={{ x: 5 }}
                        className="border-b border-slate-100 last:border-0 pb-3 last:pb-0"
                      >
                        <p className="text-gray-500 text-xs font-medium">{item.label}</p>
                        <div className="text-gray-900 font-medium mt-0.5">
                          {item.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.div variants={fadeInUp}>
              <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100/30 border-2 border-emerald-200/50 hover:border-emerald-300/70 transition-all duration-300 hover:shadow-xl">
                <motion.div
                  animate={{
                    opacity: [0, 0.05, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full blur-3xl"
                />
                
                <div className="relative z-10 p-6 text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-5xl mb-3"
                  >
                    💬
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Chat on WhatsApp</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Quick replies. Instant support. We're just a message away.
                  </p>
                  <motion.a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 w-full justify-center"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                    Chat on WhatsApp
                  </motion.a>
                  <p className="text-xs text-gray-400 mt-2">
                    Response time: Usually within minutes
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100/30 border-2 border-blue-200/50 hover:border-blue-300/70 transition-all duration-300 hover:shadow-xl">
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>🔗</span>
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Apply for a Loan', path: '/apply' },
                      { label: 'Loan Calculator', path: '/loan-calculator' },
                      { label: 'FAQ', path: '/faq' },
                      { label: 'Services', path: '/services' },
                    ].map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.path}
                        whileHover={{ x: 5 }}
                        className="block text-sm text-gray-600 hover:text-orange-600 transition-colors duration-300"
                      >
                        → {link.label}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};




// import React, { useState } from 'react';
// import { useToast } from '../../core/hooks/useToast';
// import { Button } from '../../components/ui/Button';
// import { Input } from '../../components/ui/Input';
// import { TextArea } from '../../components/forms/TextArea';
// import { Card } from '../../components/ui/Card';

// export const Contact: React.FC = () => {
//   const toast = useToast();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: '',
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       // TODO: Integrate with EmailJS or backend API
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       toast.success('Message sent successfully! We\'ll get back to you soon.');
//       setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
//     } catch (error) {
//       toast.error('Failed to send message. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="py-12">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
//           <p className="mt-4 text-lg text-gray-600">
//             Have questions or need assistance? We're here to help.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="md:col-span-2">
//             <Card>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <Input
//                     label="Full Name"
//                     placeholder="Your name"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     required
//                   />
//                   <Input
//                     label="Email"
//                     type="email"
//                     placeholder="your@email.com"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <Input
//                   label="Phone Number"
//                   type="tel"
//                   placeholder="+231 123 456 789"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                 />
//                 <Input
//                   label="Subject"
//                   placeholder="What is this about?"
//                   value={formData.subject}
//                   onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//                   required
//                 />
//                 <TextArea
//                   label="Message"
//                   placeholder="Tell us how we can help..."
//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   rows={5}
//                   required
//                 />
//                 <Button type="submit" loading={loading} fullWidth>
//                   Send Message
//                 </Button>
//               </form>
//             </Card>
//           </div>

//           <div>
//             <Card>
//               <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
//               <div className="space-y-4 text-sm">
//                 <div>
//                   <p className="text-gray-500">📍 Address</p>
//                   <p className="text-gray-900">Monrovia, Liberia</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500">📞 Phone</p>
//                   <p className="text-gray-900">+231 777 542 605</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500">📧 Email</p>
//                   <p className="text-gray-900">maxcashmn@gmail.com</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500">🕐 Hours</p>
//                   <p className="text-gray-900">Mon - Fri: 8:00 AM - 6:00 PM</p>
//                   <p className="text-gray-900">Sat: 9:00 AM - 2:00 PM</p>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
