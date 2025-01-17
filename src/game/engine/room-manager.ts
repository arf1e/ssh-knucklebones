import {
  GAME_STATE_END,
  Knucklebones,
  PLAYER_ONE,
  PLAYER_TWO,
  PlayerIdentifier,
} from '.';

export const rooms: Record<
  string,
  { game: Knucklebones; playersCount: number }
> = {};

export const TEST_GAME_ROOM_NAME = 'room-1';

export const CREATE_GAME_ROOM = 'create-room';
export const JOIN_GAME_ROOM = 'join-room';

export const createGameRoom = (): {
  roomName: string;
  game: Knucklebones;
  player: PlayerIdentifier;
} => {
  const number = Math.floor(Math.random() * 100);
  const roomName = number.toString();

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

const checkIfRoomIsAvailable = (roomName: string) => {
  const room = rooms[roomName];

  if (!room) return false;

  if (room.playersCount === 2) return false;

  if (room.game.state === GAME_STATE_END) return false;

  return true;
};

export const joinGameRoom = (
  roomName: string,
  onError?: (error: string) => void,
  createIfDoesNotExist?: boolean
):
  | { game: Knucklebones; player: PlayerIdentifier; roomName: string }
  | undefined => {
  if (!rooms[roomName]) {
    if (createIfDoesNotExist) {
      return createGameRoom();
    }

    onError?.('room does not exist');
    return;
  }

  const isRoomAvailable = checkIfRoomIsAvailable(roomName);

  if (!isRoomAvailable) {
    onError?.('room is full');
    return;
  }

  const { game, playersCount } = rooms[roomName];

  rooms[roomName].playersCount++;

  return {
    game,
    player: playersCount === 1 ? PLAYER_ONE : PLAYER_TWO,
    roomName,
  };
};

export const leaveGameRoom = (roomName: string) => {
  rooms[roomName].playersCount--;

  if (rooms[roomName].playersCount === 0) {
    delete rooms[roomName];
  }
};

export type JoinGameRoom = typeof joinGameRoom;
