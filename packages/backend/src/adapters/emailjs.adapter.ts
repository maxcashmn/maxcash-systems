interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions): Promise<any> {
  console.log('Sending email:', options);
  return {
    success: true,
    message: 'Email sent successfully',
    to: options.to,
    subject: options.subject,
  };
}

export async function sendWelcomeEmail(email: string, name: string): Promise<any> {
  const html = `
    <h1>Welcome to MaxCash!</h1>
    <p>Hello ${name},</p>
    <p>Welcome to MaxCash! We're excited to have you on board.</p>
    <p>Your account has been successfully created.</p>
    <p>If you have any questions, feel free to contact our support team.</p>
  `;
  
  return sendEmail({
    to: email,
    subject: 'Welcome to MaxCash!',
    html,
    text: `Welcome to MaxCash! Hello ${name}, Your account has been successfully created.`,
  });
}

export async function sendLoanApprovedEmail(
  email: string,
  name: string,
  loanAmount: number,
  loanId: string
): Promise<any> {
  const html = `
    <h1>Loan Approved! 🎉</h1>
    <p>Hello ${name},</p>
    <p>Congratulations! Your loan of $${loanAmount} has been approved.</p>
    <p>Loan ID: ${loanId}</p>
    <p>The funds will be disbursed to your account shortly.</p>
  `;
  
  return sendEmail({
    to: email,
    subject: 'Loan Approved - MaxCash',
    html,
    text: `Loan Approved! Hello ${name}, Your loan of $${loanAmount} has been approved.`,
  });
}
