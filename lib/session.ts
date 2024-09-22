import { createHash } from 'crypto';

import type { NextApiRequest } from 'next';

export const getSessionId = (req: NextApiRequest) => {
  const ipAddress = req.headers['x-forwarded-for'] || 'localhost';
  const currentSessionId = createHash('md5')
    .update(ipAddress + process.env.SALT_IP_ADDRESS!, 'utf-8')
    .digest('hex');

  return currentSessionId;
};
