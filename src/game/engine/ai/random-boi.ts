import { Knucklebones } from '..';
import { getAvailableColumnIndices } from './utils';

export const RANDOM_BOI_AI_NAME = 'random-boi';

/**
 * Random Boi picks a random available column and puts his piece there.
 */
export const generateRandomBoiMove = (game: Knucklebones): number => {
  const availableColumnIndices = getAvailableColumnIndices(game);
  const randomColumnIndex = Math.floor(
    Math.random() * availableColumnIndices.length
  );
  return availableColumnIndices[randomColumnIndex];
};
