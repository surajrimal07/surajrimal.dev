'use server';

import { Telegraf } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';

import { clearChat, loadChat, saveChat } from '@/lib/chat';
import { Message as ChatMessage } from '@/types/chat';
import redis from '@/utils/redis';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
const channelId = process.env.TELEGRAM_CHANNEL_ID!;

let isRunning = false;

function isTextMessage(message: any): message is Message.TextMessage {
  return 'text' in message;
}
bot.on('message', async (ctx) => {
  if (
    'reply_to_message' in ctx.message &&
    isTextMessage(ctx.message.reply_to_message)
  ) {
    const [email] = ctx.message.reply_to_message.text.split(' says ');
    const newMessage: ChatMessage = {
      id: Date.now(),
      text: isTextMessage(ctx.message) ? ctx.message.text : '',
      sender: 'bot',
    };

    await redis.publish(`chat:${email}`, JSON.stringify(newMessage));

    await saveChat(email, newMessage);
  }
});

async function launchBot() {
  if (isRunning) {
    console.error('Bot is already running.');
    return;
  }

  isRunning = true;

  try {
    await bot.launch();
    console.log('Telegram Bot has been launched successfully.');
  } catch (error) {
    console.error('Failed to launch the bot:', error);
    isRunning = false;
  }

  process.on('SIGINT', async () => {
    await bot.stop('SIGINT');
    isRunning = false;
    console.log('Bot stopped gracefully.');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await bot.stop('SIGTERM');
    isRunning = false;
    console.log('Bot stopped gracefully.');
    process.exit(0);
  });
}

launchBot();

export async function sendMessage(email: string, message: string) {
  await bot.telegram.sendMessage(channelId, `${email} says ${message}`);
  const newMessage: ChatMessage = {
    id: Date.now(),
    text: message,
    sender: 'user',
  };
  await saveChat(email, newMessage);
}

export { clearChat, loadChat };
