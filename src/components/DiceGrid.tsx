import React from 'react';
import { DetailedBlessedProps } from 'react-blessed';
import { DICE_COLUMN_WIDTH, DiceColumn } from './DiceColumn';
import { Widgets } from 'blessed';
import { Box } from './Box';
import { GameBoard } from '../game/engine';
import { controls } from '../constants/controls';

type DiceGridProps = {
  columns: GameBoard;
  controllable?: boolean;
  onSelectColumn?: (columnIndex: number) => void;
  color?: 'red' | 'white';
  hoveredIndex: number;
  onMovePointer?: (columnIndex: number) => void;
  scores: number[];
} & DetailedBlessedProps<Widgets.BoxElement>;

export const DiceGrid: React.FC<DiceGridProps> = ({
  columns,
  controllable = false,
  onSelectColumn,
  color = 'red',
  hoveredIndex,
  onMovePointer,
  scores = [0, 0, 0],
  ...boxProps
}) => {
  const handleKeyPress = (ch: string, full: string) => {
    if (full === controls.standard.left || ch === controls.vim.left) {
      if (hoveredIndex > 0) {
        onMovePointer?.(hoveredIndex - 1);
        return;
      }
      onMovePointer?.(columns.length - 1);
    }

    if (full === controls.standard.right || ch === controls.vim.right) {
      if (hoveredIndex < columns.length - 1) {
        onMovePointer?.(hoveredIndex + 1);
        return;
      }
      onMovePointer?.(0);
    }

    if (full === 'return') {
      onSelectColumn?.(hoveredIndex);
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
          hover={index === hoveredIndex}
          score={scores[index]}
        />
      ))}
    </Box>
  );
};
