/** Email delivery via Resend (https://resend.com) — one REST call, no SDK. */
export interface Email { from: string; to: string[]; subject: string; html: string; text: string }

export async function sendEmail(apiKey: string, email: Email): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify(email),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

/** "a@x.com, b@y.com" → ["a@x.com", "b@y.com"] */
export const parseRecipients = (s: string) => s.split(/[,;\s]+/).map((x) => x.trim()).filter(Boolean);
