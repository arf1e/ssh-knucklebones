import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '../../components/Box';
import { DiceGrid } from '../../components/DiceGrid';
import {
  GAME_STATE_P1_TURN,
  GAME_STATE_P2_TURN,
  Knucklebones,
  PLAYER_ONE,
  PLAYER_TWO,
  PlayerIdentifier,
} from '../engine';
import { join } from 'lodash';
import {
  JoinGameRoom,
  joinGameRoom,
  TEST_GAME_ROOM_NAME,
} from '../engine/room-manager';

const Field: React.FC<{
  game: Knucklebones;
  frame: number;
  player: PlayerIdentifier;
}> = ({ game, frame, player }) => {
  const { die, state, grid, makeMove } = game;
  return (
    <Box width="100%" height="100%">
      <DiceGrid
        top="15%"
        left="center"
        controllable={state === GAME_STATE_P1_TURN && player === PLAYER_ONE}
        columns={grid[PLAYER_ONE]}
        onSelectColumn={(columnIndex) => makeMove(PLAYER_ONE, columnIndex)}
      />
      <Box width="100%" height={1} left={0} top="50%" align="center" ch="-" />
      <Box
        height={1}
        left="0"
        top="50%"
        align="center"
        content={`Current die value: ${die}. You are ${player}. Frame: ${frame}`}
      />
      <Box width="100%" height="50%-1" top="50%+1" left="0">
        <DiceGrid
          top="center"
          left="center"
          color="blue"
          columns={grid[PLAYER_TWO]}
          controllable={state === GAME_STATE_P2_TURN && player === PLAYER_TWO}
          onSelectColumn={(columnIndex) => makeMove(PLAYER_TWO, columnIndex)}
        />
      </Box>
    </Box>
  );
};

type GameRoomProps = {
  joinGameRoom: JoinGameRoom;
};

export const GameRoom: React.FC<GameRoomProps> = () => {
  const [frame, setFrame] = useState(0);
  const [game, setGame] = useState<Knucklebones | null>(null);
  const [state, setState] = useState<Knucklebones['state'] | null>(null);
  const [player, setPlayer] = useState<PlayerIdentifier | null>(null);

  const syncGameState = (game: Knucklebones) => {
    setGame(game);
    setState(game.state);
    setFrame(game.turn);
  };

  useEffect(() => {
    const { game, player } = joinGameRoom(TEST_GAME_ROOM_NAME);
    setPlayer(player);
    game.addListener(syncGameState);
    syncGameState(game);
  }, []);

  if (!game) return null;
  if (!game.state) return null;
  if (!player) return null;
  if (!state) return null;

  return (
    <Box>
      <Field
        key={`${game.die}-${frame}`}
        frame={frame}
        game={game}
        player={player}
      />
    </Box>
  );
};
