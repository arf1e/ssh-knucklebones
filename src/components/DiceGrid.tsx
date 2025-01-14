import React from 'react';
import { DetailedBlessedProps } from 'react-blessed';
import { DICE_COLUMN_WIDTH, DiceColumn } from './DiceColumn';
import { Widgets } from 'blessed';
import { Box } from './Box';
import { useState } from 'react';
import { GameBoard } from '../game/engine';

type DiceGridProps = {
  columns: GameBoard;
  controllable?: boolean;
  onSelectColumn?: (columnIndex: number) => void;
  color?: 'red' | 'blue';
} & DetailedBlessedProps<Widgets.BoxElement>;

export const DiceGrid: React.FC<DiceGridProps> = ({
  columns,
  controllable = false,
  onSelectColumn,
  color = 'red',
  ...boxProps
}) => {
  const [focusedColumn, setFocusedColumn] = useState<number>(0);

  const handleKeyPress = (ch: string, full: string) => {
    if (full === 'left' || ch === 'h') {
      if (focusedColumn > 0) {
        setFocusedColumn(focusedColumn - 1);
        return;
      }

      setFocusedColumn(columns.length - 1);
    }

    if (full === 'right' || ch === 'l') {
      if (focusedColumn < columns.length - 1) {
        setFocusedColumn(focusedColumn + 1);
        return;
      }

      setFocusedColumn(0);
    }

    if (full === 'return') {
      onSelectColumn?.(focusedColumn);
    }
  };

  return (
    <Box
      {...boxProps}
      keyable={controllable}
      // @ts-expect-error blessed typings are wrong
      focused={controllable}
      onKeypress={(ch, key) => handleKeyPress(ch, key.full)}
      width={DICE_COLUMN_WIDTH * columns.length}
    >
      {columns.map((column, index) => (
        <DiceColumn
          top={0}
          left={index * DICE_COLUMN_WIDTH}
          key={index}
          column={column}
          color={color}
          hover={controllable && index === focusedColumn}
        />
      ))}
    </Box>
  );
};
