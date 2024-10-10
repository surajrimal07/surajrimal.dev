import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  cookies().set('cookie_consent', 'accepted', {
    secure: true,
    httpOnly: true,
    path: '/',
  });

  return NextResponse.json({ message: 'Cookie consent accepted' });
}

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const consentCookie = cookieStore.get('cookie_consent');

  const isConsentAccepted = consentCookie?.value === 'accepted';

  return NextResponse.json({
    consent: isConsentAccepted,
  });
}
