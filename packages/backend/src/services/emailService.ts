// src/services/emailService.ts

import {
  sendEmail,
  type EmailResponse,
} from '../adapters/emailjs.adapter';

type Env = Record<string, string | undefined>;

const getFrontendUrl = (
  env: Env
): string =>
  env.FRONTEND_URL ??
  'http://localhost:5173';

interface VerificationEmailData {
  email: string;
  name: string;
  token: string;
}

interface WelcomeEmailData {
  email: string;
  name: string;
}

interface PasswordResetEmailData {
  email: string;
  token: string;
}

interface LoanApprovedEmailData {
  email: string;
  name: string;
  amount: number;
  loanId: string;
}

interface OTPEmailData {
  email: string;
  otp: string;
}

export const emailService = {

  async sendVerificationEmail(
    env: Env,
    data: VerificationEmailData
  ): Promise<EmailResponse> {

    const verificationUrl =
      `${getFrontendUrl(env)}/verify-email?token=${data.token}`;

    return sendEmail({
      templateId: 'verify_email',

      params: {
        to_email: data.email,
        user_name: data.name,
        verification_url: verificationUrl,
        subject: 'Verify your MaxCash account',
      },
    });
  },


  async sendWelcomeEmail(
    _env: Env,
    data: WelcomeEmailData
  ): Promise<EmailResponse> {

    return sendEmail({
      templateId: 'welcome_message',

      params: {
        to_email: data.email,
        user_name: data.name,
        subject: 'Welcome to MaxCash',
      },
    });
  },


  async sendPasswordResetEmail(
    env: Env,
    data: PasswordResetEmailData
  ): Promise<EmailResponse> {

    const resetUrl =
      `${getFrontendUrl(env)}/reset-password?token=${data.token}`;

    return sendEmail({
      templateId: 'password_reset',

      params: {
        to_email: data.email,
        reset_url: resetUrl,
        subject: 'Reset your MaxCash password',
      },
    });
  },


  async sendLoanApprovedEmail(
    _env: Env,
    data: LoanApprovedEmailData
  ): Promise<EmailResponse> {

    return sendEmail({
      templateId: 'loan_approved',

      params: {
        to_email: data.email,
        user_name: data.name,
        loan_amount: data.amount,
        loan_id: data.loanId,
        subject: 'Your MaxCash loan was approved',
      },
    });
  },


  async sendOTPEmail(
    _env: Env,
    data: OTPEmailData
  ): Promise<EmailResponse> {

    return sendEmail({
      templateId: 'otp_verification',

      params: {
        to_email: data.email,
        otp_code: data.otp,
        subject: 'Your MaxCash OTP Code',
      },
    });
  },

};


// // src/services/emailService.ts

// import {
//   sendEmail,
//   type EmailResponse,
// } from '../adapters/emailjs.adapter';

// type Env = Record<string, string | undefined>;

// const getFrontendUrl = (
//   env: Env
// ): string => {
//   return (
//     env.FRONTEND_URL ??
//     'http://localhost:5173'
//   );
// };


// // ===============================
// // Email Data Types
// // ===============================

// interface VerificationEmailData {
//   email: string;
//   name: string;
//   token: string;
// }

// interface WelcomeEmailData {
//   email: string;
//   name: string;
// }

// interface PasswordResetEmailData {
//   email: string;
//   token: string;
// }

// interface LoanApprovedEmailData {
//   email: string;
//   name: string;
//   amount: number;
//   loanId: string;
// }

// interface OTPEmailData {
//   email: string;
//   otp: string;
// }


// // ===============================
// // Email Service
// // ===============================

// export const emailService = {

//   async sendVerificationEmail(
//     env: Env,
//     data: VerificationEmailData
//   ): Promise<EmailResponse> {

//     const verificationUrl =
//       `${getFrontendUrl(env)}/verify-email?token=${data.token}`;

//     return sendEmail({
//       templateId:
//         'verify_email',

//       params: {
//         to_email:
//           data.email,

//         user_name:
//           data.name,

//         verification_url:
//           verificationUrl,

//         subject:
//           'Verify your MaxCash account',
//       },
//     });
//   },


//   async sendWelcomeEmail(
//     env: Env,
//     data: WelcomeEmailData
//   ): Promise<EmailResponse> {

//     return sendEmail({
//       templateId:
//         'welcome_message',

//       params: {
//         to_email:
//           data.email,

//         user_name:
//           data.name,

//         subject:
//           'Welcome to MaxCash',
//       },
//     });
//   },


//   async sendPasswordResetEmail(
//     env: Env,
//     data: PasswordResetEmailData
//   ): Promise<EmailResponse> {

//     const resetUrl =
//       `${getFrontendUrl(env)}/reset-password?token=${data.token}`;

//     return sendEmail({
//       templateId:
//         'password_reset',

//       params: {
//         to_email:
//           data.email,

//         reset_url:
//           resetUrl,

//         subject:
//           'Reset your MaxCash password',
//       },
//     });
//   },


//   async sendLoanApprovedEmail(
//     env: Env,
//     data: LoanApprovedEmailData
//   ): Promise<EmailResponse> {

//     return sendEmail({
//       templateId:
//         'loan_approved',

//       params: {
//         to_email:
//           data.email,

//         user_name:
//           data.name,

//         loan_amount:
//           data.amount,

//         loan_id:
//           data.loanId,

//         subject:
//           'Your MaxCash loan was approved',
//       },
//     });
//   },


//   async sendOTPEmail(
//     env: Env,
//     data: OTPEmailData
//   ): Promise<EmailResponse> {

//     return sendEmail({
//       templateId:
//         'otp_verification',

//       params: {
//         to_email:
//           data.email,

//         otp_code:
//           data.otp,

//         subject:
//           'Your MaxCash OTP Code',
//       },
//     });
//   },

// };