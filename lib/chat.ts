'use server';
import type { Message } from '@/types/chat';
import { supabase } from '@/utils/supabase/client';
import { generateId } from 'ai';
import { localCache } from './cache';
import type { AIState, Conversation, ServerMessage } from './chat/type';
import { getCountryName } from './location';
import { hashIpAddress } from './session';

type DatabaseMessage = {
  id: number;
  text: string;
  sender: 'user' | 'ai' | 'author';
};

export async function saveChat(
  ipAddress: string,
  newMessage: Message,
): Promise<void> {
  const { data: existingData, error: fetchError } = await supabase
    .from('chat_messages')
    .select('messages')
    .eq('ip_address', location)
    .single();

  let messages: DatabaseMessage[] = [];

  if (fetchError && fetchError.code === 'PGRST116') {
    const { error: insertError } = await supabase.from('chat_messages').insert([
      {
        ip_address: ipAddress,
        messages: [
          {
            id: newMessage.id,
            text: newMessage.text,
            sender: newMessage.sender,
          },
        ],
      },
    ]);

    if (insertError) {
      console.error('Error inserting new chat:', insertError);
    }
    return;
  }

  if (existingData && Array.isArray(existingData.messages)) {
    messages = [...existingData.messages];
  }

  messages.push({
    id: newMessage.id,
    text: newMessage.text,
    sender: newMessage.sender,
  });

  const { error: updateError } = await supabase
    .from('chat_messages')
    .update({ messages })
    .eq('ip_address', ipAddress);

  if (updateError) {
    console.error('Error updating chat messages:', updateError);
  }
}

export async function loadChat(ipAddress: string): Promise<Message[]> {
  if (!ipAddress) return [];

  const { data, error } = await supabase
    .from('chat_messages')
    .select('messages')
    .eq('ip_address', ipAddress)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error loading chat messages:', error);
    return [];
  }

  if (!data || !Array.isArray(data.messages)) {
    return [];
  }

  return data.messages.map((message: DatabaseMessage) => ({
    id: message.id,
    text: message.text,
    sender: message.sender,
  }));
}

export async function clearChat(ipAddress: string): Promise<void> {
  const { error } = await supabase
    .from('chat_messages')
    .update({ messages: [] })
    .eq('ip_address', ipAddress);

  if (error) {
    console.error('Error clearing chat history:', error);
  }
}

export async function saveAIChat(state: AIState) {
  try {
    const { messages: chatMessages, location } = state;

    // Get the preview from the second-to-last message
    const previewMessage = chatMessages.at(-2)?.content || '';
    const preview = previewMessage.slice(0, 100);

    const city = await getCountryName(location);

    const hash = hashIpAddress(location);

    // Start transaction
    const { data: conversation, error: convError } = await supabase
      .from('ai_conversations')
      .upsert([
        {
          id: hash,
          preview: preview,
          location: city,
        },
      ])
      .select()
      .single();

    if (convError) throw convError;

    // Insert messages
    const messages = chatMessages.slice(-2).map((message) => ({
      id: generateId(),
      conversation_id: hash,
      role: message.role,
      content: message.content,
    }));

    const { data: savedMessages, error: msgError } = await supabase
      .from('ai_messages')
      .insert(messages)
      .select();

    if (msgError) throw msgError;

    return { conversation, messages: savedMessages };
  } catch (error) {
    console.error('Error saving chat:', error);
    throw error;
  }
}

export async function getChat(ipAddress: string): Promise<ServerMessage[]> {
  try {
    const { data, error } = await supabase
      .from('ai_messages')
      .select('id,role, content')
      .eq('conversation_id', ipAddress);

    if (error) {
      if (error.code === 'PGRST116') {
        return [];
      }
      console.error('Error fetching chat:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching chat:', error);
    return [];
  }
}

export async function getConversations(): Promise<Conversation[]> {
  try {
    const { data, error } = await supabase
      .from('ai_conversations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching conversations:', error);
    return [];
  }
}

//author information
//later swap with vector db
interface PersonalContent {
  about: string;
  education: string;
  experience: string;
  skills: string;
  projects: string;
  beliefs: string;
}

function formatContent(content: PersonalContent): string {
  return Object.entries(content)
    .map(([key, value]) => `${key}:\n${value}`)
    .join('\n\n');
}

export async function getPersonalContent(): Promise<string> {
  try {
    const cached = localCache.get('PERSONAL_CONTENT');
    if (cached) {
      return typeof cached === 'string'
        ? cached
        : formatContent(cached as PersonalContent);
    }

    const { data, error } = await supabase
      .from('personal_content')
      .select(`
        about,
        education,
        experience,
        skills,
        projects,
        beliefs
      `)
      .single();

    if (error) {
      return '';
    }

    const formattedContent = formatContent(data);
    localCache.set('PERSONAL_CONTENT', formattedContent);

    return formattedContent;
  } catch (error) {
    return '';
  }
}
