import { Link } from 'react-router-dom';
import { ROUTES } from '../../core/constants/routes';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: '📘', label: 'Facebook', className: 'bg-[#1877f2] hover:bg-[#1877f2]/80 hover:shadow-blue-500/20' },
    { icon: '🐦', label: 'Twitter', className: 'bg-black hover:bg-black/80 hover:shadow-gray-500/20' },
    { icon: '📷', label: 'Instagram', className: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] hover:from-[#f09433]/80 hover:via-[#e6683c]/80 hover:to-[#dc2743]/80 hover:shadow-pink-500/20' },
    { icon: '💼', label: 'LinkedIn', className: 'bg-[#0a66c2] hover:bg-[#0a66c2]/80 hover:shadow-blue-500/20' },
  ];

  return (
    <footer className="bg-[#0a1929] text-gray-300 mt-auto relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(59,130,246,0.15)_0%,_transparent_60%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(59,130,246,0.08)_0%,_transparent_50%)] animate-pulse-slow delay-1000"></div>
      </div>

      {/* Top Border */}
      <div className="relative h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-shimmer bg-[length:200%_100%]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
            <Link to="/" className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-300 inline-block">
              MaxCash
            </Link>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              We maximize your cash through smart lending, digital services, and business solutions.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg ${social.className}`}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider relative">
              Services
              <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-orange-400 rounded-full"></span>
            </h4>
            <ul className="space-y-2.5 pt-2">
              {['Lending', 'Digital & Telecom', 'General Trade', 'Consultancy'].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-4"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider relative">
              Quick Links
              <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-orange-400 rounded-full"></span>
            </h4>
            <ul className="space-y-2.5 pt-2">
              {[
                { label: 'About', path: ROUTES.ABOUT },
                { label: 'FAQ', path: ROUTES.FAQ },
                { label: 'Contact', path: ROUTES.CONTACT },
                { label: 'Apply', path: '/apply' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-4"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider relative">
              Contact
              <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-orange-400 rounded-full"></span>
            </h4>
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">📞</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">+231 123 456 789</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">📧</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">info@maxcash.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">📍</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Monrovia, Liberia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#1a3159]/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">
              &copy; {currentYear} MaxCash. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link to="#" className="hover:text-white transition-colors duration-300 hover:scale-105 transform">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors duration-300 hover:scale-105 transform">Terms of Service</Link>
              <Link to="#" className="hover:text-white transition-colors duration-300 hover:scale-105 transform">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};