// packages/frontend/src/components/layout/Footer.tsx
import { Link } from 'react-router-dom';
import { ROUTES } from '../../core/constants/routes'; // ✅ Import from constants, not routing

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: '📘', 
      label: 'Facebook', 
      url: 'https://facebook.com/maxcash',
      className: 'bg-[#1877f2] hover:bg-[#1877f2]/80 hover:shadow-blue-500/20' 
    },
    { 
      icon: '🐦', 
      label: 'Twitter', 
      url: 'https://twitter.com/maxcash',
      className: 'bg-black hover:bg-black/80 hover:shadow-gray-500/20' 
    },
    { 
      icon: '📷', 
      label: 'Instagram', 
      url: 'https://instagram.com/maxcash',
      className: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] hover:from-[#f09433]/80 hover:via-[#e6683c]/80 hover:to-[#dc2743]/80 hover:shadow-pink-500/20' 
    },
    { 
      icon: '💼', 
      label: 'LinkedIn', 
      url: 'https://linkedin.com/company/maxcash',
      className: 'bg-[#0a66c2] hover:bg-[#0a66c2]/80 hover:shadow-blue-500/20' 
    },
  ];

  const services = [
    { label: 'Lending', path: '/services#lending' },
    { label: 'Digital & Telecom', path: '/services#digital' },
    { label: 'General Trade', path: '/services#trade' },
    { label: 'Consultancy', path: '/services#consultancy' },
  ];

  const quickLinks = [
    { label: 'About', path: ROUTES.ABOUT },
    { label: 'FAQ', path: ROUTES.FAQ },
    { label: 'Contact', path: ROUTES.CONTACT },
    { label: 'Apply', path: ROUTES.APPLY },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: ROUTES.PRIVACY },  // ✅ Now works
    { label: 'Terms of Service', path: ROUTES.TERMS },  // ✅ Now works
    { label: 'Cookies', path: ROUTES.COOKIES },         // ✅ Now works
  ];

  const contactInfo = {
    phone: '+231 777 542 605',
    email: 'maxcashmn@gmail.com',
    address: 'Monrovia, Liberia',
  };

  return (
    <footer className="bg-[#0a1929] text-gray-300 flex-shrink-0 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(59,130,246,0.15)_0%,_transparent_60%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(59,130,246,0.08)_0%,_transparent_50%)] animate-pulse-slow delay-1000"></div>
      </div>

      {/* Top Border */}
      <div className="relative h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-shimmer bg-[length:200%_100%]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="space-y-2">
            <Link to={ROUTES.HOME} className="text-xl font-bold text-white hover:text-orange-400 transition-colors inline-block">
              MaxCash
            </Link>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              We maximize your cash.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg ${social.className}`}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider relative">
              Services
              <span className="absolute bottom-[-6px] left-0 w-6 h-0.5 bg-orange-400 rounded-full"></span>
            </h4>
            <ul className="space-y-1.5 pt-2">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.path}
                    className="text-xs text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-3"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider relative">
              Quick Links
              <span className="absolute bottom-[-6px] left-0 w-6 h-0.5 bg-orange-400 rounded-full"></span>
            </h4>
            <ul className="space-y-1.5 pt-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-xs text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-3"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider relative">
              Contact
              <span className="absolute bottom-[-6px] left-0 w-6 h-0.5 bg-orange-400 rounded-full"></span>
            </h4>
            <ul className="space-y-1.5 pt-2">
              <li className="flex items-start gap-2 text-xs text-gray-400 hover:text-white transition-colors duration-300 group">
                <span className="text-sm group-hover:scale-110 transition-transform duration-300">📞</span>
                <a 
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="group-hover:translate-x-1 transition-transform duration-300 hover:text-white"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-gray-400 hover:text-white transition-colors duration-300 group">
                <span className="text-sm group-hover:scale-110 transition-transform duration-300">📧</span>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="group-hover:translate-x-1 transition-transform duration-300 hover:text-white"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-gray-400 hover:text-white transition-colors duration-300 group">
                <span className="text-sm group-hover:scale-110 transition-transform duration-300">📍</span>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group-hover:translate-x-1 transition-transform duration-300 hover:text-white"
                >
                  {contactInfo.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 pt-3 border-t border-[#1a3159]/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300">
              &copy; {currentYear} MaxCash. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="hover:text-white transition-colors duration-300 hover:scale-105 transform"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


// import { Link } from 'react-router-dom';
// import { ROUTES } from '../../core/constants/routes';

// export const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const socialLinks = [
//     { 
//       icon: '📘', 
//       label: 'Facebook', 
//       url: 'https://facebook.com/maxcash',
//       className: 'bg-[#1877f2] hover:bg-[#1877f2]/80 hover:shadow-blue-500/20' 
//     },
//     { 
//       icon: '🐦', 
//       label: 'Twitter', 
//       url: 'https://twitter.com/maxcash',
//       className: 'bg-black hover:bg-black/80 hover:shadow-gray-500/20' 
//     },
//     { 
//       icon: '📷', 
//       label: 'Instagram', 
//       url: 'https://instagram.com/maxcash',
//       className: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] hover:from-[#f09433]/80 hover:via-[#e6683c]/80 hover:to-[#dc2743]/80 hover:shadow-pink-500/20' 
//     },
//     { 
//       icon: '💼', 
//       label: 'LinkedIn', 
//       url: 'https://linkedin.com/company/maxcash',
//       className: 'bg-[#0a66c2] hover:bg-[#0a66c2]/80 hover:shadow-blue-500/20' 
//     },
//   ];

//   const services = [
//     { label: 'Lending', path: '/services#lending' },
//     { label: 'Digital & Telecom', path: '/services#digital' },
//     { label: 'General Trade', path: '/services#trade' },
//     { label: 'Consultancy', path: '/services#consultancy' },
//   ];

//   const quickLinks = [
//     { label: 'About', path: ROUTES.ABOUT },
//     { label: 'FAQ', path: ROUTES.FAQ },
//     { label: 'Contact', path: ROUTES.CONTACT },
//     { label: 'Apply', path: ROUTES.APPLY },
//   ];

//   const legalLinks = [
//     { label: 'Privacy Policy', path: '/privacy' },
//     { label: 'Terms of Service', path: '/terms' },
//     { label: 'Cookies', path: '/cookies' },
//   ];

//   const contactInfo = {
//     phone: '+231 123 456 789',
//     email: 'info@maxcash.com',
//     address: 'Monrovia, Liberia',
//   };

//   return (
//     <footer className="bg-[#0a1929] text-gray-300 flex-shrink-0 relative overflow-hidden">
//       {/* Animated Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(59,130,246,0.15)_0%,_transparent_60%)] animate-pulse-slow"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(59,130,246,0.08)_0%,_transparent_50%)] animate-pulse-slow delay-1000"></div>
//       </div>

//       {/* Top Border */}
//       <div className="relative h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-shimmer bg-[length:200%_100%]"></div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {/* Brand Section */}
//           <div className="space-y-2">
//             <Link to="/" className="text-xl font-bold text-white hover:text-orange-400 transition-colors inline-block">
//               MaxCash
//             </Link>
//             <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
//               We maximize your cash.
//             </p>
//             <div className="flex gap-2">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={social.label}
//                   className={`w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg ${social.className}`}
//                 >
//                   <span className="text-sm">{social.icon}</span>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Services */}
//           <div className="space-y-2">
//             <h4 className="text-xs font-semibold text-white uppercase tracking-wider relative">
//               Services
//               <span className="absolute bottom-[-6px] left-0 w-6 h-0.5 bg-orange-400 rounded-full"></span>
//             </h4>
//             <ul className="space-y-1.5 pt-2">
//               {services.map((service) => (
//                 <li key={service.label}>
//                   <Link
//                     to={service.path}
//                     className="text-xs text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
//                   >
//                     <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-3"></span>
//                     <span className="group-hover:translate-x-1 transition-transform duration-300">{service.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-2">
//             <h4 className="text-xs font-semibold text-white uppercase tracking-wider relative">
//               Quick Links
//               <span className="absolute bottom-[-6px] left-0 w-6 h-0.5 bg-orange-400 rounded-full"></span>
//             </h4>
//             <ul className="space-y-1.5 pt-2">
//               {quickLinks.map((link) => (
//                 <li key={link.label}>
//                   <Link
//                     to={link.path}
//                     className="text-xs text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
//                   >
//                     <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-3"></span>
//                     <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div className="space-y-2">
//             <h4 className="text-xs font-semibold text-white uppercase tracking-wider relative">
//               Contact
//               <span className="absolute bottom-[-6px] left-0 w-6 h-0.5 bg-orange-400 rounded-full"></span>
//             </h4>
//             <ul className="space-y-1.5 pt-2">
//               <li className="flex items-start gap-2 text-xs text-gray-400 hover:text-white transition-colors duration-300 group">
//                 <span className="text-sm group-hover:scale-110 transition-transform duration-300">📞</span>
//                 <a 
//                   href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
//                   className="group-hover:translate-x-1 transition-transform duration-300 hover:text-white"
//                 >
//                   {contactInfo.phone}
//                 </a>
//               </li>
//               <li className="flex items-start gap-2 text-xs text-gray-400 hover:text-white transition-colors duration-300 group">
//                 <span className="text-sm group-hover:scale-110 transition-transform duration-300">📧</span>
//                 <a 
//                   href={`mailto:${contactInfo.email}`}
//                   className="group-hover:translate-x-1 transition-transform duration-300 hover:text-white"
//                 >
//                   {contactInfo.email}
//                 </a>
//               </li>
//               <li className="flex items-start gap-2 text-xs text-gray-400 hover:text-white transition-colors duration-300 group">
//                 <span className="text-sm group-hover:scale-110 transition-transform duration-300">📍</span>
//                 <a 
//                   href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="group-hover:translate-x-1 transition-transform duration-300 hover:text-white"
//                 >
//                   {contactInfo.address}
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-4 pt-3 border-t border-[#1a3159]/50">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
//             <p className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300">
//               &copy; {currentYear} MaxCash. All rights reserved.
//             </p>
//             <div className="flex items-center gap-4 text-xs text-gray-500">
//               {legalLinks.map((link) => (
//                 <Link
//                   key={link.label}
//                   to={link.path}
//                   className="hover:text-white transition-colors duration-300 hover:scale-105 transform"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };


// import { Link } from 'react-router-dom';
// import { ROUTES } from '../../core/constants/routes';

// export const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const socialLinks = [
//     { 
//       icon: '📘', 
//       label: 'Facebook', 
//       url: 'https://facebook.com/maxcash',
//       className: 'bg-[#1877f2] hover:bg-[#1877f2]/80 hover:shadow-blue-500/20' 
//     },
//     { 
//       icon: '🐦', 
//       label: 'Twitter', 
//       url: 'https://twitter.com/maxcash',
//       className: 'bg-black hover:bg-black/80 hover:shadow-gray-500/20' 
//     },
//     { 
//       icon: '📷', 
//       label: 'Instagram', 
//       url: 'https://instagram.com/maxcash',
//       className: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] hover:from-[#f09433]/80 hover:via-[#e6683c]/80 hover:to-[#dc2743]/80 hover:shadow-pink-500/20' 
//     },
//     { 
//       icon: '💼', 
//       label: 'LinkedIn', 
//       url: 'https://linkedin.com/company/maxcash',
//       className: 'bg-[#0a66c2] hover:bg-[#0a66c2]/80 hover:shadow-blue-500/20' 
//     },
//   ];

//   const services = [
//     { label: 'Lending', path: '/services#lending' },
//     { label: 'Digital & Telecom', path: '/services#digital' },
//     { label: 'General Trade', path: '/services#trade' },
//     { label: 'Consultancy', path: '/services#consultancy' },
//   ];

//   const quickLinks = [
//     { label: 'About', path: ROUTES.ABOUT },
//     { label: 'FAQ', path: ROUTES.FAQ },
//     { label: 'Contact', path: ROUTES.CONTACT },
//     { label: 'Apply', path: ROUTES.APPLY },
//   ];

//   const legalLinks = [
//     { label: 'Privacy Policy', path: '/privacy' },
//     { label: 'Terms of Service', path: '/terms' },
//     { label: 'Cookies', path: '/cookies' },
//   ];

//   const contactInfo = {
//     phone: '+231 123 456 789',
//     email: 'info@maxcash.com',
//     address: 'Monrovia, Liberia',
//   };

//   return (
//     <footer className="bg-[#0a1929] text-gray-300 mt-auto relative overflow-hidden flex-shrink-0">
//       {/* Animated Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(59,130,246,0.15)_0%,_transparent_60%)] animate-pulse-slow"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(59,130,246,0.08)_0%,_transparent_50%)] animate-pulse-slow delay-1000"></div>
//       </div>

//       {/* Top Border */}
//       <div className="relative h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-shimmer bg-[length:200%_100%]"></div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Brand Section */}
//           <div className="space-y-4">
//             <Link to="/" className="text-2xl font-bold text-white hover:text-orange-400 transition-colors inline-block">
//               MaxCash
//             </Link>
//             <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
//               We maximize your cash through smart lending, digital services, and business solutions.
//             </p>
//             <div className="flex gap-3">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={social.label}
//                   className={`w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg ${social.className}`}
//                 >
//                   <span className="text-lg">{social.icon}</span>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Services */}
//           <div className="space-y-4">
//             <h4 className="text-sm font-semibold text-white uppercase tracking-wider relative">
//               Services
//               <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-orange-400 rounded-full"></span>
//             </h4>
//             <ul className="space-y-2.5 pt-2">
//               {services.map((service) => (
//                 <li key={service.label}>
//                   <Link
//                     to={service.path}
//                     className="text-sm text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
//                   >
//                     <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-4"></span>
//                     <span className="group-hover:translate-x-1 transition-transform duration-300">{service.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h4 className="text-sm font-semibold text-white uppercase tracking-wider relative">
//               Quick Links
//               <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-orange-400 rounded-full"></span>
//             </h4>
//             <ul className="space-y-2.5 pt-2">
//               {quickLinks.map((link) => (
//                 <li key={link.label}>
//                   <Link
//                     to={link.path}
//                     className="text-sm text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
//                   >
//                     <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-4"></span>
//                     <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div className="space-y-4">
//             <h4 className="text-sm font-semibold text-white uppercase tracking-wider relative">
//               Contact
//               <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-orange-400 rounded-full"></span>
//             </h4>
//             <ul className="space-y-3 pt-2">
//               <li className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
//                 <span className="text-lg group-hover:scale-110 transition-transform duration-300">📞</span>
//                 <a 
//                   href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
//                   className="group-hover:translate-x-1 transition-transform duration-300 hover:text-white"
//                 >
//                   {contactInfo.phone}
//                 </a>
//               </li>
//               <li className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
//                 <span className="text-lg group-hover:scale-110 transition-transform duration-300">📧</span>
//                 <a 
//                   href={`mailto:${contactInfo.email}`}
//                   className="group-hover:translate-x-1 transition-transform duration-300 hover:text-white"
//                 >
//                   {contactInfo.email}
//                 </a>
//               </li>
//               <li className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
//                 <span className="text-lg group-hover:scale-110 transition-transform duration-300">📍</span>
//                 <a 
//                   href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="group-hover:translate-x-1 transition-transform duration-300 hover:text-white"
//                 >
//                   {contactInfo.address}
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-8 pt-6 border-t border-[#1a3159]/50">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <p className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">
//               &copy; {currentYear} MaxCash. All rights reserved.
//             </p>
//             <div className="flex items-center gap-6 text-xs text-gray-500">
//               {legalLinks.map((link) => (
//                 <Link
//                   key={link.label}
//                   to={link.path}
//                   className="hover:text-white transition-colors duration-300 hover:scale-105 transform"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };
