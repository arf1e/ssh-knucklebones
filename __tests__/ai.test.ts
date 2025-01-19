import { Knucklebones, PLAYER_TWO, PLAYER_ONE } from '../src/game/engine';
import { generateHaterMove } from '../src/game/engine/ai/hater';
import { generateRandomBoiMove } from '../src/game/engine/ai/random-boi';

describe('random boi AI', () => {
  test('should pick a random available column', () => {
    const game = new Knucklebones();

    game.grid = {
      [PLAYER_ONE]: [
        [null, null, null],
        [null, null, null],
        [2, 2, 2],
      ],
      [PLAYER_TWO]: [
        [null, 2, 6],
        [4, 4, 4],
        [4, 3, null],
      ],
    };

    const move = generateRandomBoiMove(game);
    expect([0, 2]).toContain(move);

    game.grid = {
      [PLAYER_ONE]: [
        [null, null, null],
        [null, null, null],
        [5, 5, 5],
      ],
      [PLAYER_TWO]: [
        [3, 3, 3],
        [4, 4, 4],
        [5, null, 2],
      ],
    };

    const move2 = generateRandomBoiMove(game);
    expect(move2).toBe(2);
  });
});

describe('the hater AI', () => {
  test('should try to deal the highest loss to opponent', () => {
    const game = new Knucklebones();

    game.grid = {
      [PLAYER_ONE]: [
        [null, null, 1],
        [null, 1, 1],
        [1, 1, 1],
      ],
      [PLAYER_TWO]: [
        [null, null, null],
        [null, null, null],
        [null, null, 6],
      ],
    };

    game.die = 1;
    const move = generateHaterMove(game);
    expect(move).toBe(2);
  });

  test('if opponent has no matching dice, should pick random available column', () => {
    const game = new Knucklebones();

    game.grid = {
      [PLAYER_ONE]: [
        [null, null, null],
        [null, null, null],
        [1, 1, 1],
      ],
      [PLAYER_TWO]: [
        [null, null, null],
        [null, null, null],
        [2, 2, 2],
      ],
    };

    game.die = 2;
    const move = generateHaterMove(game);
    expect([0, 1]).toContain(move);
  });
});
