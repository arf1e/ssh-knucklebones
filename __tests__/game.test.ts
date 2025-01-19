import {
  GAME_STATE_END,
  GAME_STATE_P1_TURN,
  GAME_STATE_P2_TURN,
  Knucklebones,
  PLAYER_ONE,
  PLAYER_TWO,
} from '../src/game/engine';

describe('game state updates', () => {
  test('should switch turns', () => {
    const game = new Knucklebones();
    expect(game.state).toBe(GAME_STATE_P1_TURN);
    game.makeMove(PLAYER_ONE, 0);
    expect(game.state).toBe(GAME_STATE_P2_TURN);
  });

  test('should go to gameover when one of the players has no free cells', () => {
    const game = new Knucklebones();
    game.grid = {
      [PLAYER_ONE]: [
        [1, 1, null],
        [2, 2, 2],
        [3, 3, 3],
      ],
      [PLAYER_TWO]: [
        [4, null, null],
        [1, null, null],
        [5, 5, 5],
      ],
    };
    expect(game.state).toBe(GAME_STATE_P1_TURN);
    game.makeMove(PLAYER_ONE, 0);
    expect(game.state).toBe(GAME_STATE_END);

    const game2 = new Knucklebones();
    game2.grid = {
      [PLAYER_TWO]: [
        [1, 1, null],
        [2, 2, 2],
        [3, 3, 3],
      ],
      [PLAYER_ONE]: [
        [4, null, null],
        [1, null, null],
        [5, 5, 5],
      ],
    };
    game2.state = GAME_STATE_P2_TURN;
    game2.makeMove(PLAYER_TWO, 0);
    expect(game2.state).toBe(GAME_STATE_END);
  });
});

describe('putting dice', () => {
  test('should not allow to put a die on a full column', () => {
    const game = new Knucklebones();
    game.grid = {
      [PLAYER_ONE]: [
        [null, null, null],
        [1, 1, 1],
        [null, null, null],
      ],
      [PLAYER_TWO]: [
        [null, null, null],
        [null, null, null],
        [3, 3, 3],
      ],
    };
    expect(game.state).toBe(GAME_STATE_P1_TURN);
    game.makeMove(PLAYER_ONE, 1);
    expect(game.state).toBe(GAME_STATE_P1_TURN);
    expect(game.grid[PLAYER_ONE][1]).toEqual([1, 1, 1]);
    game.makeMove(PLAYER_ONE, 0);
    expect(game.state).toBe(GAME_STATE_P2_TURN);
    expect(game.grid[PLAYER_ONE][0]).not.toEqual([null, null, null]);
  });

  test("should not allow to put a die on opponent's turn", () => {
    const game = new Knucklebones();
    expect(game.state).toBe(GAME_STATE_P1_TURN);

    game.die = 1;

    expect(game.grid[PLAYER_ONE][0]).toEqual([null, null, null]);
    expect(game.grid[PLAYER_TWO][0]).toEqual([null, null, null]);

    game.makeMove(PLAYER_TWO, 0);

    expect(game.state).toBe(GAME_STATE_P1_TURN);

    expect(game.grid[PLAYER_TWO][0]).toEqual([null, null, null]);

    game.makeMove(PLAYER_ONE, 0);

    expect(game.state).toBe(GAME_STATE_P2_TURN);
    expect(game.grid[PLAYER_ONE][0]).not.toEqual([1, null, null]);
  });

  test('should not allow to put a die after gameover', () => {
    const game = new Knucklebones();
    game.grid = {
      [PLAYER_ONE]: [
        [1, 1, null],
        [2, 2, 2],
        [3, 3, 3],
      ],
      [PLAYER_TWO]: [
        [4, null, null],
        [1, null, null],
        [5, 5, 5],
      ],
    };
    expect(game.state).toBe(GAME_STATE_P1_TURN);
    game.makeMove(PLAYER_ONE, 0);

    expect(game.state).toBe(GAME_STATE_END);

    game.makeMove(PLAYER_TWO, 0);
    expect(game.state).toBe(GAME_STATE_END);

    game.makeMove(PLAYER_ONE, 0);
    expect(game.state).toBe(GAME_STATE_END);
  });
});

describe('score updates', () => {
  test('placing a die should update the score', () => {
    const game = new Knucklebones();
    game.die = 1;

    expect(game.scores[PLAYER_ONE]).toEqual([0, 0, 0]);
    expect(game.scores[PLAYER_TWO]).toEqual([0, 0, 0]);

    game.makeMove(PLAYER_ONE, 0);
    expect(game.scores[PLAYER_ONE]).toEqual([1, 0, 0]);

    game.die = 2;
    game.makeMove(PLAYER_TWO, 0);
    expect(game.scores[PLAYER_TWO]).toEqual([2, 0, 0]);
  });

  test('putting multiple dice of the same value should add combined score', () => {
    const game = new Knucklebones();
    game.grid = {
      [PLAYER_ONE]: [
        [1, null, null],
        [null, null, null],
        [null, null, null],
      ],
      [PLAYER_TWO]: [
        [null, null, null],
        [null, null, null],
        [2, null, null],
      ],
    };
    game._updateScores();
    expect(game.scores[PLAYER_ONE]).toEqual([1, 0, 0]);
    expect(game.scores[PLAYER_TWO]).toEqual([0, 0, 2]);

    game.die = 1;
    game.makeMove(PLAYER_ONE, 0);

    expect(game.scores[PLAYER_ONE]).toEqual([4, 0, 0]);

    game.die = 2;
    game.makeMove(PLAYER_TWO, 2);
    expect(game.scores[PLAYER_TWO]).toEqual([0, 0, 8]);

    game.die = 1;
    game.makeMove(PLAYER_ONE, 0);
    expect(game.scores[PLAYER_ONE]).toEqual([9, 0, 0]);

    game.die = 2;
    game.makeMove(PLAYER_TWO, 2);
    expect(game.scores[PLAYER_TWO]).toEqual([0, 0, 18]);
  });
});

describe('evicting matching opponent dice', () => {});
