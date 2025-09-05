import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
  const code = new URL(req.url).searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const oAuth2 = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID!,
    process.env.GMAIL_CLIENT_SECRET!,
    process.env.GMAIL_REDIRECT_URI!
  );

  // Bagian ini juga perlu diperbaiki, jika ada
  // Pastikan Anda menggunakan objek oAuth2 yang benar
  const { tokens } = await oAuth2.getToken(code);

  console.log("GMAIL TOKENS (copy to .env for DEV)", tokens);

  const res = NextResponse.redirect(new URL("/", req.url));
  return res;
}