import Chat from '@/components/chat/chat';
import { getQuestions } from '@/data/questions';
import { AI } from '@/lib/chat/actions';
import { generateId } from 'ai';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export default async function Home() {
  const headersList = await headers();
  const location = headersList.get('x-forwarded-for') || '121.0.0.1';

  const questions = getQuestions();

  return (
    <main className="relative flex h-[100dvh] w-screen bg-background text-foreground">
      <AI initialAIState={{ messages: [], id: generateId(), location }}>
        <Chat questions={questions} />
      </AI>
    </main>
  );
}
