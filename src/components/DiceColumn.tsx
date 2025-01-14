import React from 'react';
import { Widgets } from 'blessed';
import { DetailedBlessedProps } from 'react-blessed';
import { Box } from './Box';
import { Die, DIE_HEIGHT, DIE_WIDTH, DiePlaceholder } from './Die';
import { useEffect, useMemo, useState } from 'react';
import chalk from 'chalk';
import { DiceColumnState, MaybeDie } from '../game/engine';

export const DICE_COLUMN_WIDTH = DIE_WIDTH + 2;

type DiceColumnProps = {
  column: DiceColumnState;
  reverse?: boolean;
  hover?: boolean;
  color: 'red' | 'blue';
} & DetailedBlessedProps<Widgets.BoxElement>;

const ComboAwareDie: React.FC<{
  index: number;
  value: MaybeDie;
  column: DiceColumnState;
}> = ({ index, value, column }) => {
  const color = useMemo(() => {
    if (!value) return 'white';

    const combo = column.filter((v) => v === value).length;
    if (combo === 2) return 'yellow';
    if (combo === 3) return 'blue';

    return 'white';
  }, []);

  const top = useMemo(() => DIE_HEIGHT * index, [index]);

  return value ? (
    <Die value={value} top={DIE_HEIGHT * index} color={color} />
  ) : (
    <DiePlaceholder top={top} />
  );
};

const hoverPointerFrames = ['-', '\\', '|', '/'];

const colorWrapperMapper = {
  red: chalk.bgRed,
  blue: chalk.bgBlue,
};

const HoverPointer: React.FC<{ top: number; color: 'red' | 'blue' }> = ({
  top,
  color,
}) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const getNextFrame = () => {
      const nextFrame =
        frame + 1 > hoverPointerFrames.length - 1 ? 0 : frame + 1;
      setFrame(nextFrame);
    };

    const interval = setInterval(() => {
      getNextFrame();
    }, 120);

    return () => clearInterval(interval);
  }, [frame]);

  const ch = useMemo(() => hoverPointerFrames[frame], [frame]);
  const colorWrapper = useMemo(() => colorWrapperMapper[color], [color]);

  return (
    <>
      <Box
        top={top}
        height={1}
        left={0}
        width={DIE_WIDTH}
        content={colorWrapper(' ', chalk.white(ch), ' ')}
      />
    </>
  );
};

export const DiceColumn: React.FC<DiceColumnProps> = ({
  column,
  color,
  reverse = false,
  hover = false,
  ...boxProps
}) => {
  return (
    <Box {...boxProps} width={DICE_COLUMN_WIDTH}>
      {column.map((value, index) => (
        <ComboAwareDie
          key={value ? `${value}-${index}` : `${index}-placeholder`}
          index={index}
          value={value}
          column={column}
        />
      ))}
      {hover && (
        <>
          <HoverPointer top={DIE_HEIGHT * 3} color={color} />
        </>
      )}
    </Box>
  );
};
