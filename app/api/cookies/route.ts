import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ONE_YEAR = 60 * 60 * 24 * 365;

export async function POST() {
  cookies().set('cookie_consent', 'accepted', {
    secure: true,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: ONE_YEAR,
    expires: new Date(Date.now() + ONE_YEAR * 1000),
  });

  return NextResponse.json({ message: 'Cookie consent accepted' });
}

export async function GET() {
  const cookieStore = cookies();
  const consentCookie = cookieStore.get('cookie_consent');

  const isConsentAccepted = consentCookie?.value === 'accepted';

  return NextResponse.json({
    consent: isConsentAccepted,
  });
}

export async function DELETE() {
  cookies().delete('cookie_consent');

  return NextResponse.json({
    message: 'Cookie consent cleared',
  });
}
