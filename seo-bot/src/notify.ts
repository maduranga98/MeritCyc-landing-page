/** Telegram delivery. Create a bot with @BotFather; get your chat id from @userinfobot. */
export async function sendTelegram(token: string, chatId: string, html: string): Promise<void> {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: html, parse_mode: 'HTML', link_preview_options: { is_disabled: true } }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`);
}
