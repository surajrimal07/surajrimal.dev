export type Question = {
  content: string;
};

export function getQuestions(): Question[] {
  const contents: Question[] = [
    { content: 'What technologies do you specialize in?' },
    { content: 'When did you first experience the internet?' },
    { content: 'What was your first programming language?' },
    { content: 'What degree did you complete in 2024?' },
    { content: 'What inspired you to start this blog?' },
    { content: 'What was your first entrepreneurial venture?' },
    { content: 'What is your next academic goal?' },
    { content: 'What languages do you speak?' },
    { content: 'What was your first video game?' },
    { content: 'What is Tenpaisa?' },
    { content: 'What skills do you have in AI development?' },
    { content: 'What technology stack do you use for mobile apps?' },
  ];

  return contents;
}
