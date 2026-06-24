import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from './core/providers/QueryProvider';
import { AuthProvider } from './core/providers/AuthProvider';
import { ToastProvider } from './core/providers/ToastProvider';
import { ROUTES } from './core/constants/routes';

// Layouts
import { PublicLayout } from './core/layouts/PublicLayout';

// ============================================
// PHASE 1: PUBLIC PAGES ✅
// ============================================
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Services } from './pages/public/Services';
import { LoanProducts } from './pages/public/LoanProducts';
import { LoanCalculator } from './pages/public/LoanCalculator';
import { FAQ } from './pages/public/FAQ';
import { Contact } from './pages/public/Contact';
import { Apply } from './pages/public/Apply';

// ============================================
// PHASE 2: AUTH PAGES (Coming Soon - Placeholder)
// ============================================
const ComingSoon = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h1>
    <p className="text-gray-600 text-lg">This page is under development.</p>
    <p className="text-gray-500 mt-2">We're working on it!</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryProvider>
          <ToastProvider>
            <Routes>
              {/* ============================================
                  PHASE 1: PUBLIC ROUTES ✅
                  ============================================ */}
              <Route element={<PublicLayout />}>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path={ROUTES.LOAN_PRODUCTS} element={<LoanProducts />} />
                <Route path="/loan-calculator" element={<LoanCalculator />} />
                <Route path={ROUTES.FAQ} element={<FAQ />} />
                <Route path={ROUTES.CONTACT} element={<Contact />} />
                <Route path="/apply" element={<Apply />} />
              </Route>

              {/* ============================================
                  PHASE 2: AUTH ROUTES (Coming Soon)
                  ============================================ */}
              <Route path={ROUTES.LOGIN} element={<ComingSoon />} />
              <Route path={ROUTES.REGISTER} element={<ComingSoon />} />
              <Route path={ROUTES.FORGOT_PASSWORD} element={<ComingSoon />} />
              <Route path={ROUTES.RESET_PASSWORD} element={<ComingSoon />} />
              <Route path={ROUTES.UNAUTHORIZED} element={<ComingSoon />} />

              {/* ============================================
                  PHASE 3-6: PROTECTED ROUTES (Coming Soon)
                  ============================================ */}

              {/* Fallback */}
              <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
          </ToastProvider>
        </QueryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
