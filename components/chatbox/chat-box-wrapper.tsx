'use server';

import { headers } from 'next/headers';
import ChatBox from './ChatBox';

const ChatBoxWrapper = async (): Promise<JSX.Element> => {
  const header = await headers();
  const ipAddress = (header.get('x-forwarded-for') ?? '127.0.0.2').split(
    ',',
  )[0];

  return <ChatBox ipAddress={ipAddress} />;
};

export default ChatBoxWrapper;
