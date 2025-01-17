import React, { useMemo } from 'react';
import {
  GAME_STATE_END,
  GameState,
  Knucklebones,
  PLAYER_ONE,
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
  totalScore: number;
  winner?: Knucklebones['winner'];
} & DetailedBlessedProps<Widgets.BoxElement>;

export const PlayerStatus: React.FC<PlayerStatusProps> = ({
  player,
  isCurrentPlayer,
  gameState,
  die,
  playerName = player,
  totalScore,
  winner,
  ...boxProps
}) => {
  const coordinates = useMemo(() => {
    if (player === PLAYER_ONE) {
      return { left: 0, top: 0 };
    }

    return { right: 0, bottom: 0 };
  }, []);

  const showResult = gameState === GAME_STATE_END && isCurrentPlayer;
  const resultText = useMemo(() => {
    if (winner === player) {
      return chalk.bold(chalk.bgRed('you win!'));
    }

    if (!winner) {
      return chalk.bold('draw');
    }

    return chalk.bold(chalk.bgBlue('you lose!'));
  }, [winner]);

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
            ...(isCurrentPlayer ? [chalk.bgRed('(you)')] : []),
            '~'
          )}
        />
      </Box>
      <Box
        width="100%"
        top="50%-2"
        align="center"
        content={chalk.bold(totalScore)}
      />
      {gameState !== GAME_STATE_END && (
        <Box width="100%" top="50%-1">
          <Box
            width="100%"
            top={1}
            align="center"
            content={
              gameState === player
                ? 'Piece to place:'
                : 'Piece will appear here'
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
      )}
      {showResult && (
        <Box width="100%" top="50%-1">
          <Box width="100%" top={1} align="center" content={resultText} />
        </Box>
      )}
    </Box>
  );
};
