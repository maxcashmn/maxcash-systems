import { Hono } from 'hono';
import authRoutes from './auth';
import usersRoutes from './users';
import walletsRoutes from './wallets';
import transfersRoutes from './transfers';
import transactionsRoutes from './transactions';
import loansRoutes from './loans';
import reportsRoutes from './reports';
import notificationsRoutes from './notifications';
import adminRoutes from './admin';

const v1Routes = new Hono();

// Mount all routes
v1Routes.route('/auth', authRoutes);
v1Routes.route('/users', usersRoutes);
v1Routes.route('/wallets', walletsRoutes);
v1Routes.route('/transfers', transfersRoutes);
v1Routes.route('/transactions', transactionsRoutes);
v1Routes.route('/loans', loansRoutes);
v1Routes.route('/reports', reportsRoutes);
v1Routes.route('/notifications', notificationsRoutes);
v1Routes.route('/admin', adminRoutes);

export default v1Routes;
