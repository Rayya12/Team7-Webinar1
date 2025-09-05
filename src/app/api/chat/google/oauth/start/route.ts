import { NextRequest, NextResponse } from "next/server"; //ini kasih tambahan "NextRequest"
import { google } from "googleapis"; // Perhatikan penamaannya

export async function GET(req: NextRequest) { //ini juga tambahan "NextRequest"
  const oAuth2Client = new google.auth.OAuth2( //ini harusnya "oAuth2Client" bukan "oAuth2"
    process.env.GMAIL_CLIENT_ID!,
    process.env.GMAIL_CLIENT_SECRET!,
    process.env.GMAIL_REDIRECT_URI!
  );

  const url = oAuth2Client.generateAuthUrl({ //ini juga harusnya "oAuth2Client" bukan "oAuth2"
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/gmail.send"],
  });

  return NextResponse.redirect(url);
}