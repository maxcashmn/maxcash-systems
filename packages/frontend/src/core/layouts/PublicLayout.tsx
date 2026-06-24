import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const navItems = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'About', path: ROUTES.ABOUT },
  { label: 'Services', path: '/services' },
  { label: 'Loan Products', path: ROUTES.LOAN_PRODUCTS },
  { label: 'Loan Calculator', path: '/loan-calculator' },
  { label: 'FAQ', path: ROUTES.FAQ },
  { label: 'Contact', path: ROUTES.CONTACT },
];

export const PublicLayout = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to={ROUTES.HOME} className="text-xl font-bold text-primary-600 flex items-center gap-2">
              <span>💰</span> MaxCash
            </Link>

            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm transition-colors ${
                    isActive(item.path)
                      ? 'text-primary-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/apply" className="btn-primary text-sm px-4 py-2">
                Apply Now
              </Link>
              <Link to="/login" className="btn-secondary text-sm px-4 py-2">
                Login
              </Link>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/apply"
                className="block px-3 py-2 rounded-lg text-sm bg-primary-600 text-white text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply Now
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-lg text-sm border border-gray-300 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 bg-gray-50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid sm:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">MaxCash</h4>
              <p className="text-sm text-gray-500">We maximize your cash.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Services</h4>
              <ul className="text-sm text-gray-500 space-y-1">
                <li><Link to="/services">Lending</Link></li>
                <li><Link to="/services">Digital & Telecom</Link></li>
                <li><Link to="/services">General Trade</Link></li>
                <li><Link to="/services">Consultancy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Quick Links</h4>
              <ul className="text-sm text-gray-500 space-y-1">
                <li><Link to={ROUTES.ABOUT}>About</Link></li>
                <li><Link to={ROUTES.FAQ}>FAQ</Link></li>
                <li><Link to={ROUTES.CONTACT}>Contact</Link></li>
                <li><Link to="/apply">Apply</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>📞 +231 123 456 789</li>
                <li>📧 info@maxcash.com</li>
                <li>📍 Monrovia, Liberia</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MaxCash. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
