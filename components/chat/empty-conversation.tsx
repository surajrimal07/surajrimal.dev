import type { Question } from '@/types/chat';
import { motion } from 'framer-motion';
import { IconSurajAI } from '../icons/icons';
import Dazzle from './dazzle';
import { ExampleQuestions } from './example-questions';

type EmptyConversationProps = {
  questions: Question[];
  addMessage: (input: string) => Promise<void>;
};

export function EmptyConversation({
  questions,
  addMessage,
}: EmptyConversationProps) {
  return (
    <motion.div
      className="flex h-full flex-col items-center justify-center gap-1"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
      transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.3 }}
    >
      <IconSurajAI className="size-12" />
      <Dazzle text="Suraj's " accent="AI." />
      <ExampleQuestions questions={questions} addMessage={addMessage} />
    </motion.div>
  );
}
