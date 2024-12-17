'use server';

import { Telegraf } from 'telegraf';
import type { Message } from 'telegraf/typings/core/types/typegram';

import { clearChat, loadChat, saveChat } from '@/lib/chat';
import type { Message as ChatMessage } from '@/types/chat';
import { supabase } from '@/utils/supabase/client';

const botToken = process.env.TELEGRAM_BOT_TOKEN!;
const channelId = process.env.TELEGRAM_CHANNEL_ID!;

// Initialize bot globally
let bot: Telegraf | null = null;
let isRunning = false;

function isTextMessage(message: any): message is Message.TextMessage {
  return 'text' in message;
}

// Initialize bot function
export async function initBot() {
  if (!botToken) {
    throw new Error('TELEGRAM_BOT_TOKEN is not defined');
  }

  bot = new Telegraf(botToken);
  await bot.launch();
}

export async function launchBot() {
  if (isRunning || bot) {
    console.log('Bot is already running');
    return;
  }

  try {
    if (!bot) {
      bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

      bot.on('message', async (ctx) => {
        await updateAuthorStatus();

        if (
          'reply_to_message' in ctx.message &&
          isTextMessage(ctx.message.reply_to_message)
        ) {
          const [email] = ctx.message.reply_to_message.text.split(' says ');
          const newMessage: ChatMessage = {
            id: Date.now(),
            text: isTextMessage(ctx.message) ? ctx.message.text : '',
            sender: 'author',
          };

          await saveChat(email, newMessage);
        }
      });
    }

    await bot.launch();
    isRunning = true;
    console.log('Telegram Bot has been launched successfully.');

    process.once('SIGINT', () => bot?.stop('SIGINT'));
    process.once('SIGTERM', () => bot?.stop('SIGTERM'));
  } catch (error) {
    console.error('Failed to launch the bot:', error);
    isRunning = false;
    bot = null;
  }
}

export async function stopBot() {
  if (bot && isRunning) {
    await bot.stop();
    isRunning = false;
    bot = null;
    console.log('Bot stopped');
  }
}

// Send message with error handling
export async function sendMessage(email: string, message: string) {
  if (!bot) {
    await initBot();
  }

  try {
    if (bot) {
      await bot.telegram.sendMessage(channelId, `${email} says ${message}`);
    } else {
      console.error('Bot is not initialized');
    }
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
  }
}

async function updateAuthorStatus() {
  try {
    await supabase
      .from('author_status')
      .update({ last_active: new Date().toISOString() })
      .eq('id', 'author');
  } catch (error) {
    console.error('Failed to update author status:', error);
  }
}

// Cleanup on exit
process.once('SIGINT', () => bot?.stop('SIGINT'));
process.once('SIGTERM', () => bot?.stop('SIGTERM'));

export { clearChat, loadChat, updateAuthorStatus };
