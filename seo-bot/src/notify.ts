/** Email delivery through Gmail SMTP using a Gmail App Password (not the account password). */
import nodemailer from 'nodemailer';

export interface Email { to: string[]; subject: string; html: string; text: string }

export async function sendGmail(user: string, appPassword: string, email: Email): Promise<void> {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass: appPassword.replace(/\s+/g, '') }, // Google shows the app password with spaces
  });
  await transport.sendMail({ from: `MeritCyc SEO Bot <${user}>`, ...email });
}

/** "a@x.com, b@y.com" → ["a@x.com", "b@y.com"] */
export const parseRecipients = (s: string) => s.split(/[,;\s]+/).map((x) => x.trim()).filter(Boolean);
