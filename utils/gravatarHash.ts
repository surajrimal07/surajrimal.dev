import crypto from 'crypto';

export function gravatarURL(email: string) {
  const hash = crypto
    .createHash('md5')
    .update(email.trim().toLowerCase())
    .digest('hex');
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=identicon`;
  return gravatarUrl;
}
