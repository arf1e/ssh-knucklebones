import chalk from 'chalk';
import { PLAYER_ONE, PLAYER_TWO } from '../game/engine';

export const colors = {
  [PLAYER_ONE]: {
    text: {
      bg: chalk.bgRed,
      fg: chalk.red,
    },
    base: 'red',
  },
  [PLAYER_TWO]: {
    text: {
      bg: chalk.bgBlue,
      fg: chalk.blue,
    },
    base: 'blue',
  },
  red: {
    text: {
      bg: chalk.bgRed,
      fg: chalk.red,
    },
    base: 'red',
  },
  blue: {
    text: {
      bg: chalk.bgBlue,
      fg: chalk.blue,
    },
    base: 'blue',
  },
  white: {
    text: {
      bg: chalk.inverse,
      fg: chalk.white,
    },
    base: 'white',
  },
};
