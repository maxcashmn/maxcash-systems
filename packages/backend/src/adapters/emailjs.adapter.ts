// src/adapters/emailjs.adapter.ts

import { getEmailConfig } from '../config/email';

export interface EmailPayload {
  templateId?: string;
  params: Record<string, unknown>;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

const EMAILJS_ENDPOINT =
  'https://api.emailjs.com/api/v1.0/email/send';


function validateEmailConfig(
  config: ReturnType<typeof getEmailConfig>
) {
  const required = [
    'serviceId',
    'templateId',
    'publicKey',
    'privateKey',
  ] as const;

  for (const key of required) {
    if (!config[key]) {
      throw new Error(
        `Missing EmailJS configuration: ${key}`
      );
    }
  }
}


export async function sendEmail(
  payload: EmailPayload
): Promise<EmailResponse> {

  const config = getEmailConfig();

  validateEmailConfig(config);

  const response = await fetch(
    EMAILJS_ENDPOINT,
    {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id:
          payload.templateId ??
          config.templateId,

        user_id: config.publicKey,

        accessToken:
          config.privateKey,

        template_params:{
          ...payload.params,

          from_email:
            config.fromEmail,

          from_name:
            config.fromName,
        },
      }),
    }
  );


  if (!response.ok) {
    throw new Error(
      'Email delivery failed'
    );
  }


  return {
    success:true,
    message:'Email sent successfully',
  };
}


// // src/adapters/emailjs.adapter.ts

// import { getEmailConfig } from '../config/email';

// export interface EmailPayload {
//   templateId?: string;
//   params: Record<string, unknown>;
// }

// export interface EmailResponse {
//   success: boolean;
//   message: string;
// }

// interface EmailJSError {
//   status?: number;
//   message?: string;
// }

// const EMAILJS_ENDPOINT =
//   'https://api.emailjs.com/api/v1.0/email/send';

// function validateEmailConfig(
//   config: ReturnType<typeof getEmailConfig>
// ): void {
//   const requiredKeys = [
//     'serviceId',
//     'templateId',
//     'publicKey',
//     'privateKey',
//   ] as const;

//   for (const key of requiredKeys) {
//     if (!config[key]) {
//       throw new Error(
//         `Missing EmailJS configuration: ${key}`
//       );
//     }
//   }
// }

// export async function sendEmail(
//   payload: EmailPayload
// ): Promise<EmailResponse> {
//   const config = getEmailConfig();

//   validateEmailConfig(config);

//   const controller = new AbortController();

//   const timeout = setTimeout(
//     () => controller.abort(),
//     10000
//   );

//   try {
//     const response = await fetch(
//       EMAILJS_ENDPOINT,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           service_id: config.serviceId,
//           template_id:
//             payload.templateId ??
//             config.templateId,

//           user_id: config.publicKey,

//           accessToken:
//             config.privateKey,

//           template_params: {
//             ...payload.params,
//             from_email:
//               config.fromEmail,
//             from_name:
//               config.fromName,
//           },
//         }),

//         signal: controller.signal,
//       }
//     );

//     if (!response.ok) {
//       const error: EmailJSError = {
//         status: response.status,
//         message:
//           await response.text(),
//       };

//       console.error(
//         'EmailJS delivery failed:',
//         error
//       );

//       throw new Error(
//         'Email delivery failed'
//       );
//     }

//     return {
//       success: true,
//       message:
//         'Email sent successfully',
//     };
//   } finally {
//     clearTimeout(timeout);
//   }
// }


// export async function sendWelcomeEmail(
//   email: string,
//   name: string
// ): Promise<EmailResponse> {
//   return sendEmail({
//     templateId:
//       'welcome_message',

//     params: {
//       email,
//       name,
//     },
//   });
// }


// export async function sendLoanApprovedEmail(
//   email: string,
//   name: string,
//   amount: number,
//   loanId: string
// ): Promise<EmailResponse> {
//   return sendEmail({
//     templateId:
//       'loan_approved',

//     params: {
//       email,
//       name,
//       amount,
//       loanId,
//     },
//   });
// }



// // src/adapters/emailjs.adapter.ts

// import { getEmailConfig } from '../config/email';

// export interface EmailPayload {
//   templateId?: string;
//   params: Record<string, unknown>;
// }

// export interface EmailResponse {
//   success: boolean;
//   message: string;
// }

// interface EmailJSError {
//   status?: number;
//   message?: string;
// }

// const EMAILJS_ENDPOINT =
//   'https://api.emailjs.com/api/v1.0/email/send';

// function validateEmailConfig(
//   config: ReturnType<typeof getEmailConfig>
// ): void {
//   const requiredKeys = [
//     'serviceId',
//     'templateId',
//     'publicKey',
//     'privateKey',
//   ] as const;

//   for (const key of requiredKeys) {
//     if (!config[key]) {
//       throw new Error(
//         `Missing EmailJS configuration: ${key}`
//       );
//     }
//   }
// }

// /**
//  * Sends an email through EmailJS.
//  */
// export async function sendEmail(
//   env: Record<string, string | undefined>,
//   payload: EmailPayload
// ): Promise<EmailResponse> {
//   const config = getEmailConfig(env);

//   validateEmailConfig(config);

//   const controller = new AbortController();

//   const timeout = setTimeout(() => {
//     controller.abort();
//   }, 10000);

//   try {
//     const response = await fetch(
//       EMAILJS_ENDPOINT,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           service_id: config.serviceId,
//           template_id:
//             payload.templateId ?? config.templateId,
//           user_id: config.publicKey,
//           accessToken: config.privateKey,
//           template_params: {
//             ...payload.params,
//             from_email: config.fromEmail,
//             from_name: config.fromName,
//           },
//         }),
//         signal: controller.signal,
//       }
//     );

//     if (!response.ok) {
//       const error: EmailJSError = {
//         status: response.status,
//         message: await response.text(),
//       };

//       console.error(
//         'EmailJS delivery failed:',
//         error
//       );

//       throw new Error('Email delivery failed');
//     }

//     return {
//       success: true,
//       message: 'Email sent successfully',
//     };
//   } catch (error) {
//     if (
//       error instanceof DOMException &&
//       error.name === 'AbortError'
//     ) {
//       throw new Error(
//         'Email delivery timeout'
//       );
//     }

//     throw error;
//   } finally {
//     clearTimeout(timeout);
//   }
// }

// /**
//  * Convenience wrapper for welcome emails.
//  */
// export async function sendWelcomeEmail(
//   env: Record<string, string | undefined>,
//   params: Record<string, unknown>
// ): Promise<EmailResponse> {
//   return sendEmail(env, {
//     params,
//   });
// }

// /**
//  * Convenience wrapper for loan approval emails.
//  */
// export async function sendLoanApprovedEmail(
//   env: Record<string, string | undefined>,
//   params: Record<string, unknown>
// ): Promise<EmailResponse> {
//   return sendEmail(env, {
//     params,
//   });
// }




// import { getEmailConfig } from '../config/email';

// export interface EmailPayload {
//   templateId?: string;
//   params: Record<string, unknown>;
// }

// export interface EmailResponse {
//   success: boolean;
//   message: string;
// }

// interface EmailJSError {
//   status?: number;
//   message?: string;
// }

// const EMAILJS_ENDPOINT =
//   'https://api.emailjs.com/api/v1.0/email/send';


// function validateEmailConfig(
//   config: ReturnType<typeof getEmailConfig>
// ) {
//   const requiredKeys = [
//     'serviceId',
//     'templateId',
//     'publicKey',
//     'privateKey',
//   ] as const;

//   for (const key of requiredKeys) {
//     if (!config[key]) {
//       throw new Error(
//         `Missing EmailJS configuration: ${key}`
//       );
//     }
//   }
// }


// /**
//  * EmailJS Adapter
//  *
//  * Responsible only for
//  * communicating with EmailJS API.
//  */
// export async function sendEmail(
//   env: Record<string, string | undefined>,
//   payload: EmailPayload
// ): Promise<EmailResponse> {
//   const config = getEmailConfig(env);

//   validateEmailConfig(config);

//   const controller = new AbortController();

//   const timeout = setTimeout(
//     () => controller.abort(),
//     10000
//   );

//   try {
//     const response = await fetch(
//       EMAILJS_ENDPOINT,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           service_id: config.serviceId,
//           template_id:
//             payload.templateId ?? config.templateId,
//           user_id: config.publicKey,
//           accessToken: config.privateKey,
//           template_params: {
//             ...payload.params,
//             from_email: config.fromEmail,
//             from_name: config.fromName,
//           },
//         }),
//         signal: controller.signal,
//       }
//     );

//     if (!response.ok) {
//       const error: EmailJSError = {
//         status: response.status,
//         message: await response.text(),
//       };

//       console.error(
//         'EmailJS delivery failed:',
//         error
//       );

//       throw new Error(
//         'Email delivery failed'
//       );
//     }

//     return {
//       success: true,
//       message: 'Email sent successfully',
//     };
//   } catch (error) {
//     if (
//       error instanceof DOMException &&
//       error.name === 'AbortError'
//     ) {
//       throw new Error(
//         'Email delivery timeout'
//       );
//     }

//     throw error;
//   } finally {
//     clearTimeout(timeout);
//   }
// }



// interface EmailOptions {
//   to: string;
//   subject: string;
//   html: string;
//   text?: string;
//   from?: string;
//   replyTo?: string;
// }

// export async function sendEmail(options: EmailOptions): Promise<any> {
//   console.log('Sending email:', options);
//   return {
//     success: true,
//     message: 'Email sent successfully',
//     to: options.to,
//     subject: options.subject,
//   };
// }

// export async function sendWelcomeEmail(email: string, name: string): Promise<any> {
//   const html = `
//     <h1>Welcome to MaxCash!</h1>
//     <p>Hello ${name},</p>
//     <p>Welcome to MaxCash! We're excited to have you on board.</p>
//     <p>Your account has been successfully created.</p>
//     <p>If you have any questions, feel free to contact our support team.</p>
//   `;
  
//   return sendEmail({
//     to: email,
//     subject: 'Welcome to MaxCash!',
//     html,
//     text: `Welcome to MaxCash! Hello ${name}, Your account has been successfully created.`,
//   });
// }

// export async function sendLoanApprovedEmail(
//   email: string,
//   name: string,
//   loanAmount: number,
//   loanId: string
// ): Promise<any> {
//   const html = `
//     <h1>Loan Approved! 🎉</h1>
//     <p>Hello ${name},</p>
//     <p>Congratulations! Your loan of $${loanAmount} has been approved.</p>
//     <p>Loan ID: ${loanId}</p>
//     <p>The funds will be disbursed to your account shortly.</p>
//   `;
  
//   return sendEmail({
//     to: email,
//     subject: 'Loan Approved - MaxCash',
//     html,
//     text: `Loan Approved! Hello ${name}, Your loan of $${loanAmount} has been approved.`,
//   });
// }
