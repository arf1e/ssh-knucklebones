import { useEffect, useState } from 'react';

type AnimatableSymbol = 'line' | 'dot';

const framesMapper: Record<AnimatableSymbol, string[]> = {
  line: ['-', '\\', '|', '/'],
  dot: ['·', '•', '●', '•'],
};

export const useAnimatedSymbol = (
  symbol: AnimatableSymbol,
  updateInterval = 120
) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const getNextFrame = () => {
      const lastFrameIndex = framesMapper[symbol].length - 1;
      const nextFrame = frame + 1 > lastFrameIndex ? 0 : frame + 1;
      setFrame(nextFrame);
    };

    const interval = setInterval(() => {
      getNextFrame();
    }, updateInterval);

    return () => clearInterval(interval);
  }, [frame]);

  return framesMapper[symbol][frame];
};
