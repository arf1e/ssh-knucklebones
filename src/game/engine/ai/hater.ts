import sortBy from 'lodash/sortBy';
import { Knucklebones, PLAYER_ONE } from '..';
import { getAvailableColumnIndices } from './utils';

/**
 * The Hater attempts to make a move that will cause the opponent to lose the biggest amount of points.
 */
export const generateHaterMove = (game: Knucklebones): number => {
  const availableColumnIndices = getAvailableColumnIndices(game);

  const { die } = game;
  const accordingOpponentColumns = availableColumnIndices.map(
    (columnIndex) => ({
      dice: game.grid[PLAYER_ONE][columnIndex],
      columnIndex,
    })
  );

  const sortedAccordingOpponentColumns = sortBy(
    accordingOpponentColumns,
    (column) =>
      column.dice.reduce<number>((acc, value) => {
        if (value === die) {
          return acc + 1;
        }

        return acc;
      }, 0)
  );

  const columnIndex = sortedAccordingOpponentColumns[0].columnIndex;

  return columnIndex;
};
