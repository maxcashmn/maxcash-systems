interface WhatsAppMessageOptions {
  to: string;
  message: string;
  template?: {
    name: string;
    parameters: Record<string, string>;
  };
}

export async function sendWhatsAppMessage(
  options: WhatsAppMessageOptions
): Promise<any> {
  console.log('Sending WhatsApp message:', options);
  return {
    success: true,
    message: 'WhatsApp message sent successfully',
    to: options.to,
  };
}

export async function sendWhatsAppWelcome(to: string, name: string): Promise<any> {
  return sendWhatsAppMessage({
    to,
    message: `Welcome to MaxCash! Hello ${name}, we're excited to have you on board.`,
    template: {
      name: 'welcome_message',
      parameters: {
        name: name,
      },
    },
  });
}

export async function sendWhatsAppLoanApproved(
  to: string,
  name: string,
  amount: number
): Promise<any> {
  return sendWhatsAppMessage({
    to,
    message: `Congratulations ${name}! Your loan of $${amount} has been approved.`,
    template: {
      name: 'loan_approved',
      parameters: {
        name: name,
        amount: amount.toString(),
      },
    },
  });
}
