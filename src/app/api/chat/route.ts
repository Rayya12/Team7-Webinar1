import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { z } from 'zod';
import { sendGmail } from '@/lib/gmail';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json(
    
  );

  const result = streamText({
    system: `anda adalah chatbot yang bisa kirim email ke email yang user minta. minta email, subject, dan isi email dari user. kirim email tersebut menggunakan tool yang sudah disediakan`,
    model: google('gemini-2.5-flash'),
    messages: convertToModelMessages(messages),
    tools:{
      sendEmail: {
        description: "kirim email hasil review ke kandidat",
        inputSchema: z.object({
          to: z.string().email().describe("alamat email tujuan"),
          subject: z.string().describe("subjek email"),
          html: z.string().describe("isi email dalam format HTML")
        }),
        execute: async ({ to, subject, html }) => {
          const { id } = await sendGmail(to, subject, html);
          return { ok: true, messageId: id };
        },
      },
    },
  });

  return result.toUIMessageStreamResponse();
}