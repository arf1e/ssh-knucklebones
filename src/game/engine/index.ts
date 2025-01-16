import findLastIndex from 'lodash/findLastIndex';
import { calculateColumnScore } from './score-counter';

export const COLUMN_SIZE = 3;

export type MaybeDie = number | null;
export type DiceColumnState = [MaybeDie, MaybeDie, MaybeDie];

export type GameState =
  | typeof GAME_STATE_P1_TURN
  | typeof GAME_STATE_P2_TURN
  | typeof GAME_STATE_END;

export const PLAYER_ONE = 'p1';
export const PLAYER_TWO = 'p2';

export type PlayerIdentifier = typeof PLAYER_ONE | typeof PLAYER_TWO;

export type Listener = (gameState: Knucklebones) => void;

export type Scores = {
  [PLAYER_ONE]: [number, number, number];
  [PLAYER_TWO]: [number, number, number];
};

export type GameBoard = [DiceColumnState, DiceColumnState, DiceColumnState];

type GameGrid = {
  [PLAYER_ONE]: GameBoard;
  [PLAYER_TWO]: GameBoard;
};

export const rollDie = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

export const GAME_STATE_P1_TURN = PLAYER_ONE;
export const GAME_STATE_P2_TURN = PLAYER_TWO;
export const GAME_STATE_END = 'end';

const composeEmptyColumn = (): DiceColumnState => [null, null, null];

const composeEmptyBoard = (): GameBoard => [
  composeEmptyColumn(),
  composeEmptyColumn(),
  composeEmptyColumn(),
];

const composeInitialGrid = (): {
  [PLAYER_ONE]: GameBoard;
  [PLAYER_TWO]: GameBoard;
} => {
  return {
    [PLAYER_ONE]: composeEmptyBoard(),
    [PLAYER_TWO]: composeEmptyBoard(),
  };
};

const composeInitialScores = (): {
  [PLAYER_ONE]: [number, number, number];
  [PLAYER_TWO]: [number, number, number];
} => ({
  [PLAYER_ONE]: [0, 0, 0],
  [PLAYER_TWO]: [0, 0, 0],
});

export class Knucklebones {
  isServerSide: boolean;
  turn: number = 0;
  state: GameState = GAME_STATE_P1_TURN;
  die: number = rollDie();
  scores: Scores = composeInitialScores();
  grid: GameGrid = composeInitialGrid();
  listeners: Listener[] = [];
  hoveredColumns: {
    [PLAYER_ONE]: number;
    [PLAYER_TWO]: number;
  } = {
    [PLAYER_ONE]: 0,
    [PLAYER_TWO]: 0,
  };

  constructor(params?: { dieValue?: number; isServerSide?: boolean }) {
    if (params?.dieValue) {
      this.die = params.dieValue;
    }
    this.isServerSide = params?.isServerSide ?? false;
  }

  addListener(listener: Listener) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this));
  }

  focusColumn(player: PlayerIdentifier, columnIndex: number) {
    this.hoveredColumns[player] = columnIndex;
    this.notifyListeners();
  }

  _isColumnFull(columnIndex: number, player: PlayerIdentifier) {
    const column = this.grid[player][columnIndex];
    return column.filter((die) => die !== null).length === COLUMN_SIZE;
  }

  _evictMatchingOpponentDice(columnIndex: number) {
    const placedDieValue = this.die;
    const otherPlayer: PlayerIdentifier =
      this.state === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
    const matchingOpponentColumn = this.grid[otherPlayer][columnIndex];
    const indicesToEvict = [];

    for (let i = 0; i < COLUMN_SIZE; i++) {
      const value = matchingOpponentColumn[i];
      if (value === placedDieValue) {
        indicesToEvict.push(i);
      }
    }

    indicesToEvict.forEach((index) => {
      matchingOpponentColumn[index] = null;
    });
  }

  _rollDie() {
    this.die = rollDie();
    this.notifyListeners();
  }

  _updateScores() {
    const players: PlayerIdentifier[] = [PLAYER_ONE, PLAYER_TWO];
    for (const player of players) {
      const board = this.grid[player as PlayerIdentifier];
      board.forEach((column, columnIndex) => {
        this.scores[player][columnIndex] = calculateColumnScore(column);
      });
    }
  }

  _checkForGameEnd() {
    const players: PlayerIdentifier[] = [PLAYER_ONE, PLAYER_TWO];

    for (const player of players) {
      const playerHasNoFreeCells =
        this.grid[player].flat().filter((die) => die === null).length === 0;

      if (playerHasNoFreeCells) return true;
    }

    return false;
  }

  _switchTurn() {
    this.turn++;
    this._updateScores();
    this.notifyListeners();
    const isGameEnd = this._checkForGameEnd();

    if (isGameEnd) {
      this.state = GAME_STATE_END;
      this.notifyListeners();
      return this;
    }

    this._rollDie();
    this.notifyListeners();

    const newState = this.state === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
    this.state = newState;
    this.notifyListeners();
  }

  makeMove = (player: PlayerIdentifier, columnIndex: number) => {
    if (this.state !== player) {
      return this;
    }

    if (this._isColumnFull(columnIndex, player)) {
      return this;
    }

    const column = this.grid[player][columnIndex];

    const insertIndex = findLastIndex(column, (die) => die === null);
    column[insertIndex] = this.die;

    this._evictMatchingOpponentDice(columnIndex);
    this._switchTurn();
  };
}
