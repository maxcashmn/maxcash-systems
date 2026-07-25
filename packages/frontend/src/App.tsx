// packages/frontend/src/App.tsx
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

// Public Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Services } from './pages/public/Services';
import { LoanProducts } from './pages/public/LoanProducts';
import { LoanCalculator } from './pages/public/LoanCalculator';
import { FAQ } from './pages/public/FAQ';
import { Contact } from './pages/public/Contact';
import { Apply } from './pages/public/Apply';
import { Terms } from './pages/public/Terms';        // ✅ Add this
import { Privacy } from './pages/public/Privacy';    // ✅ Add this
import { Cookies } from './pages/public/Cookies';    // ✅ Add this

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { Unauthorized } from './pages/auth/Unauthorized';

// Borrower Pages
import { Dashboard as BorrowerDashboard } from './pages/borrower/Dashboard';
import { LoanApplication } from './pages/borrower/LoanApplication';
import { MyLoans } from './pages/borrower/MyLoans';
import { Profile } from './pages/borrower/Profile';
import { Settings } from './pages/borrower/Settings';
import { Notifications } from './pages/borrower/Notifications';
import { Transactions } from './pages/borrower/Transactions';

// Manager Pages
import { Dashboard as ManagerDashboard } from './pages/manager/Dashboard';
import { ReviewApplications } from './pages/manager/ReviewApplications';
import { Borrowers } from './pages/manager/Borrowers';

// Auditor Pages
import { Dashboard as AuditorDashboard } from './pages/auditor/Dashboard';

// Admin Pages
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';
import { Users } from './pages/admin/Users';
import { Loans as AdminLoans } from './pages/admin/Loans';
import { AuditLogs } from './pages/admin/AuditLogs';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryProvider>
          <ToastProvider>
            <Routes>
              {/* Public Routes - For non-authenticated users */}
              <Route element={<PublicLayout />}>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path={ROUTES.LOAN_PRODUCTS} element={<LoanProducts />} />
                <Route path="/loan-calculator" element={<LoanCalculator />} />
                <Route path={ROUTES.FAQ} element={<FAQ />} />
                <Route path={ROUTES.CONTACT} element={<Contact />} />
                <Route path="/apply" element={<Apply />} />
                <Route path={ROUTES.TERMS} element={<Terms />} />          {/* ✅ Add this */}
                <Route path={ROUTES.PRIVACY} element={<Privacy />} />      {/* ✅ Add this */}
                <Route path={ROUTES.COOKIES} element={<Cookies />} />      {/* ✅ Add this */}
              </Route>

              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
              </Route>

              {/* Protected Routes - Authenticated users with AppLayout */}
              <Route element={<ProtectedRoute allowedRoles={['borrower', 'manager', 'auditor', 'admin']} />}>
                <Route element={<AppLayout />}>
                  {/* Public pages accessible from dashboard */}
                  <Route path={ROUTES.HOME} element={<Home />} />
                  <Route path={ROUTES.ABOUT} element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path={ROUTES.LOAN_PRODUCTS} element={<LoanProducts />} />
                  <Route path="/loan-calculator" element={<LoanCalculator />} />
                  <Route path={ROUTES.FAQ} element={<FAQ />} />
                  <Route path={ROUTES.CONTACT} element={<Contact />} />
                  <Route path="/apply" element={<Apply />} />
                  <Route path={ROUTES.TERMS} element={<Terms />} />
                  <Route path={ROUTES.PRIVACY} element={<Privacy />} />
                  <Route path={ROUTES.COOKIES} element={<Cookies />} />

                  {/* Borrower Routes */}
                  <Route path={ROUTES.DASHBOARD} element={<BorrowerDashboard />} />
                  <Route path="/loan-application" element={<LoanApplication />} />
                  <Route path="/my-loans" element={<MyLoans />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />

                  {/* Manager Routes */}
                  <Route path="/manager/dashboard" element={<ManagerDashboard />} />
                  <Route path="/manager/review" element={<ReviewApplications />} />
                  <Route path="/manager/borrowers" element={<Borrowers />} />

                  {/* Auditor Routes */}
                  <Route path="/auditor/dashboard" element={<AuditorDashboard />} />

                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<Users />} />
                  <Route path="/admin/loans" element={<AdminLoans />} />
                  <Route path="/admin/audit-logs" element={<AuditLogs />} />
                </Route>
              </Route>

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
