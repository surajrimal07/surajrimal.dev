import { ReactionType } from '@/types/reaction';

export const reactions: {
  title: string;
  defaultImage: string;
  animatedImage: string;
  disabledImage: string;
  type: ReactionType;
}[] = [
  {
    title: 'Claps',
    defaultImage: '/static/emojis/clapping-hands.png',
    animatedImage: '/static/emojis/clapping-hands-animated.png',
    disabledImage: '/static/emojis/love-you-gesture.png',
    type: 'CLAPPING',
  },
  {
    title: 'Love',
    defaultImage: '/static/emojis/astonished-face.png',
    animatedImage: '/static/emojis/astonished-face-animated.png',
    disabledImage: '/static/emojis/star-struck.png',
    type: 'LOVE',
  },
  {
    title: 'Think',
    defaultImage: '/static/emojis/face-with-monocle.png',
    animatedImage: '/static/emojis/face-with-monocle-animated.png',
    disabledImage: '/static/emojis/nerd-face.png',
    type: 'THINK',
  },
  {
    title: 'Cry',
    defaultImage: '/static/emojis/crying.png',
    animatedImage: '/static/emojis/crying.webp',
    disabledImage: '/static/emojis/love-you-gesture.png',
    type: 'CRY',
  },
  {
    title: 'Vomit',
    defaultImage: '/static/emojis/waka.png',
    animatedImage: '/static/emojis/waka.webp',
    disabledImage: '/static/emojis/love-you-gesture.png',
    type: 'VOMIT',
  },
];
