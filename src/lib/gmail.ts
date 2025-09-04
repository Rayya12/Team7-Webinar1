// Helper Function

import { google } from "googleapis";

export async function sendGmail(to: string, subject: string, html: string) {
  const oAuth2 = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID!,
    process.env.GMAIL_CLIENT_SECRET!,
    process.env.GMAIL_REDIRECT_URI!
  );
  oAuth2.setCredentials({
    access_token: process.env.GMAIL_ACCESS_TOKEN,
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  const gmail = google.gmail({ version: "v1", auth: oAuth2 });
  const raw =
    `From: ${process.env.GMAIL_SENDER}\r\n` +
    `To: ${to}\r\n` +
    `Subject: ${subject}\r\n` +
    `MIME-Version: 1.0\r\n` +
    `Content-Type: text/html; charset=UTF-8\r\n\r\n` +
    html;

  const encoded = Buffer.from(raw).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const res = await gmail.users.messages.send({ userId: "me", requestBody: { raw: encoded } });
  return { id: res.data.id! };
}
