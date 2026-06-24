import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from './core/providers/QueryProvider';
import { AuthProvider } from './core/providers/AuthProvider';
import { ToastProvider } from './core/providers/ToastProvider';
import { ProtectedRoute } from './core/routing/ProtectedRoute';
import { ROUTES } from './core/constants/routes';

// Layouts
import { AuthLayout } from './core/layouts/AuthLayout';
import { AppLayout } from './core/layouts/AppLayout';
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
// PHASE 2: AUTH PAGES ✅
// ============================================
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { Unauthorized } from './pages/auth/Unauthorized';

// ============================================
// PHASE 3-6: PROTECTED PAGES (Coming Soon)
// ============================================
// import { Dashboard as BorrowerDashboard } from './pages/borrower/Dashboard';
// import { Dashboard as ManagerDashboard } from './pages/manager/Dashboard';
// import { Dashboard as AuditorDashboard } from './pages/auditor/Dashboard';
// import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';

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
                  PHASE 2: AUTH ROUTES ✅
                  ============================================ */}
              <Route element={<AuthLayout />}>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
              </Route>

              {/* ============================================
                  PHASE 3-6: PROTECTED ROUTES (Coming Soon)
                  ============================================ */}
              {/* 
              <Route element={<ProtectedRoute allowedRoles={['borrower']} />}>
                <Route element={<AppLayout />}>
                  <Route path={ROUTES.DASHBOARD} element={<BorrowerDashboard />} />
                  <Route path="/loan-application" element={<LoanApplication />} />
                  <Route path="/my-loans" element={<MyLoans />} />
                  <Route path="/my-loans/:id" element={<LoanDetails />} />
                  <Route path="/repayment-schedule" element={<RepaymentSchedule />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path={ROUTES.PROFILE} element={<Profile />} />
                  <Route path={ROUTES.SETTINGS} element={<Settings />} />
                  <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
                </Route>
              </Route>
              */}

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
