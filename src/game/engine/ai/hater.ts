import sortBy from 'lodash/sortBy';
import { Knucklebones, PLAYER_ONE } from '..';
import { getAvailableColumnIndices } from './utils';
import { generateRandomBoiMove } from './random-boi';

export const HATER_AI_NAME = 'the-hater';

/**
 * The Hater attempts to make a move that will cause the opponent to lose the biggest amount of points. Fallbacks to random boi if the opponent has no matching dice.
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

  const opponentHasMatchingDice = accordingOpponentColumns.some((column) =>
    column.dice.includes(die)
  );

  if (!opponentHasMatchingDice) {
    return generateRandomBoiMove(game);
  }

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

  const { columnIndex } =
    sortedAccordingOpponentColumns[sortedAccordingOpponentColumns.length - 1];

  return columnIndex;
};
