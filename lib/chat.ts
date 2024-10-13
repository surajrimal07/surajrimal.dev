import { Message } from '@/types/chat';
import { supabase } from '@/utils/supabase/client';

type DatabaseMessage = {
  id: number;
  text: string;
  sender: 'user' | 'bot' | 'author';
};

export async function saveChat(
  email: string,
  newMessage: Message
): Promise<void> {
  const { data: existingData, error: fetchError } = await supabase
    .from('chat_messages')
    .select('messages')
    .eq('email', email)
    .single();

  let messages: DatabaseMessage[] = [];

  if (fetchError && fetchError.code === 'PGRST116') {
    const { error: insertError } = await supabase.from('chat_messages').insert([
      {
        email,
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
  } else if (fetchError) {
    console.error('Error fetching conversation:', fetchError);
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
    .eq('email', email);

  if (updateError) {
    console.error('Error updating chat messages:', updateError);
  }
}

export async function loadChat(email: string): Promise<Message[]> {
  if (!email) {
    return [];
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .select('messages')
    .eq('email', email)
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

export async function clearChat(email: string): Promise<void> {
  const { error } = await supabase
    .from('chat_messages')
    .update({ messages: [] })
    .eq('email', email);

  if (error) {
    console.error('Error clearing chat history:', error);
  }
}
