import { Hono } from 'hono';

import {
  loginValidator,
  registerValidator,
  refreshTokenValidator,
  updatePasswordValidator,
  verifyEmailValidator,
  resendVerificationValidator,
} from '../../validators';

import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  changePassword,
  verifyEmail,
  resendVerificationEmail,
} from '../../services/authService';

import { authMiddleware } from '../../middleware/auth';

import type { Bindings } from '../../types';

const authRoutes = new Hono<{ Bindings: Bindings }>();


// ===============================
// Register
// ===============================
authRoutes.post('/register', async (c) => {

  const env = c.env;

  const body = await c.req.json();

  const data =
    registerValidator.parse(body);


  const result =
    await registerUser(
      env,
      {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        role: data.role,
      }
    );


  return c.json(
    {
      success: true,
      message:
        'Registration successful. Please verify your email.',
      data: result,
    },
    201
  );
});



// ===============================
// Verify Email
// ===============================
authRoutes.post('/verify-email', async (c) => {

  const env = c.env;

  const body =
    await c.req.json();


  const data =
    verifyEmailValidator.parse(body);


  const result =
    await verifyEmail(
      env,
      data.token
    );


  return c.json({
    success: true,
    message:
      'Email verified successfully.',
    data: result,
  });

});



// ===============================
// Resend Verification
// ===============================
authRoutes.post(
  '/resend-verification',
  async (c) => {

    const env = c.env;

    const body =
      await c.req.json();


    const data =
      resendVerificationValidator.parse(body);


    await resendVerificationEmail(
      env,
      data.email
    );


    return c.json({
      success: true,
      message:
        'Verification email sent successfully.',
    });

  }
);



// ===============================
// Login
// ===============================
authRoutes.post('/login', async (c) => {

  const body =
    await c.req.json();


  const data =
    loginValidator.parse(body);


  const result =
    await loginUser(
      data.email,
      data.password,
      c.env
    );


  return c.json({
    success: true,
    message:
      'Login successful.',
    data: result,
  });

});



// ===============================
// Refresh Token
// ===============================
authRoutes.post(
  '/refresh-token',
  async (c) => {

    const body =
      await c.req.json();


    const data =
      refreshTokenValidator.parse(body);


    const result =
      await refreshToken(
        data.refreshToken,
        c.env
      );


    return c.json({
      success: true,
      data: result,
    });

  }
);



// ===============================
// Logout
// ===============================
authRoutes.post(
  '/logout',
  authMiddleware,
  async (c) => {


    const user =
      c.get('user');


    await logoutUser(
      user.sub
    );


    return c.json({
      success: true,
      message:
        'Logged out successfully.',
    });

  }
);



// ===============================
// Change Password
// ===============================
authRoutes.post(
  '/change-password',
  authMiddleware,
  async (c) => {


    const user =
      c.get('user');


    const body =
      await c.req.json();


    const data =
      updatePasswordValidator.parse(body);


    await changePassword(
      user.sub,
      data.currentPassword,
      data.newPassword
    );


    return c.json({
      success: true,
      message:
        'Password updated successfully.',
    });

  }
);



export default authRoutes;