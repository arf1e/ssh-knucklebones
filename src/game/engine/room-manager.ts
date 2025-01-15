import { Knucklebones, PLAYER_ONE, PLAYER_TWO, PlayerIdentifier } from '.';

export const rooms: Record<
  string,
  { game: Knucklebones; playersCount: number }
> = {};

export const TEST_GAME_ROOM_NAME = 'room-1';

export const createGameRoom = (): {
  roomName: string;
  game: Knucklebones;
  player: PlayerIdentifier;
} => {
  const number = Math.floor(Math.random() * 100);
  const roomName = `room-1`;

  if (rooms[roomName]) {
    return createGameRoom();
  }

  const game = new Knucklebones({ isServerSide: true });
  rooms[roomName] = { game, playersCount: 0 };

  return {
    roomName,
    game,
    player: PLAYER_ONE,
  };
};

export type CreateGameRoom = typeof createGameRoom;

export const joinGameRoom = (
  roomName: string
): { game: Knucklebones; player: PlayerIdentifier } => {
  if (!rooms[roomName]) {
    return createGameRoom();
  }

  const { game, playersCount } = rooms[roomName];

  rooms[roomName].playersCount++;

  return {
    game,
    player: playersCount === 1 ? PLAYER_ONE : PLAYER_TWO,
  };
};

export type JoinGameRoom = typeof joinGameRoom;
