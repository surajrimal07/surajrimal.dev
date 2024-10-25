import { useCallback } from 'react';

interface PlaySoundProps {
  filePath: string;
  volume?: number;
  loop?: boolean;
}

const usePlaySound = ({
  filePath,
  volume = 1.0,
  loop = false,
}: PlaySoundProps) => {
  const playSound = useCallback(() => {
    const audio = new Audio(filePath);
    audio.volume = volume;
    audio.loop = loop;
    audio.play();
  }, [filePath, volume, loop]);

  return { playSound };
};

export default usePlaySound;
