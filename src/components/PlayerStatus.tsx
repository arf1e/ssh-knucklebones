import React, { useMemo } from 'react';
import {
  GameState,
  Knucklebones,
  PLAYER_ONE,
  PLAYER_TWO,
  PlayerIdentifier,
} from '../game/engine';
import { Box } from './Box';
import { DetailedBlessedProps } from 'react-blessed';
import { Widgets } from 'blessed';
import chalk from 'chalk';
import { Die, DIE_HEIGHT, DIE_WIDTH } from './Die';

type PlayerStatusProps = {
  player: PlayerIdentifier;
  isCurrentPlayer: boolean;
  gameState: GameState;
  die: Knucklebones['die'];
  playerName?: string;
} & DetailedBlessedProps<Widgets.BoxElement>;

const colorWrapper = {
  [PLAYER_ONE]: chalk.bgRed,
  [PLAYER_TWO]: chalk.bgBlue,
};

export const PlayerStatus: React.FC<PlayerStatusProps> = ({
  player,
  isCurrentPlayer,
  gameState,
  die,
  playerName = player,
  ...boxProps
}) => {
  const coordinates = useMemo(() => {
    if (player === PLAYER_ONE) {
      return { left: 0, top: 0 };
    }

    return { right: 0, bottom: 0 };
  }, []);

  return (
    <Box {...boxProps} {...coordinates}>
      <Box width="100%" top="10%">
        <Box
          width="100%"
          top="50%-5"
          align="center"
          content={chalk.bold(
            '~',
            playerName,
            ...(isCurrentPlayer ? [colorWrapper[player]('(you)')] : []),
            '~'
          )}
        />
      </Box>
      <Box width="100%" top="50%-3">
        <Box
          width="100%"
          top={1}
          align="center"
          content={
            gameState === player ? 'Piece to place:' : 'Piece will appear here'
          }
        />
        {gameState === player && (
          <Box width="100%" top={2} height={DIE_HEIGHT} align="center">
            <Die
              value={die}
              color="white"
              left={`50%-${Math.ceil(DIE_WIDTH / 2)}`}
              align="center"
              top={0}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
