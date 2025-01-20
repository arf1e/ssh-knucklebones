import React, { useEffect, useMemo, useState } from 'react';
import sum from 'lodash/sum';
import { Box } from '../../components/Box';
import { DiceGrid } from '../../components/DiceGrid';
import {
  GAME_STATE_END,
  GAME_STATE_P1_TURN,
  GAME_STATE_P2_TURN,
  Knucklebones,
  PLAYER_ONE,
  PLAYER_TWO,
  PlayerIdentifier,
} from '../engine';
import { JoinGameRoom, leaveGameRoom } from '../engine/room-manager';
import { PlayerStatus } from '../../components/PlayerStatus';
import chalk from 'chalk';
import { Txt } from '../../components/Txt';
import { useNavigation } from '../../hooks/useNavigation';
import { RagequitOverlay } from '../../components/RagequitOverlay';

const CURRENT_PLAYER_TURN = chalk.bgRedBright(chalk.bold('your turn!'));
const OPPONENT_TURN = chalk.inverse("opponent's turn");
const GAME_OVER = chalk.bgBlueBright(chalk.bold('game over'));

const Field: React.FC<{
  game: Knucklebones;
  frame: number;
  player: PlayerIdentifier;
  roomName?: string;
  hoveredP1Column?: number;
  hoveredP2Column?: number;
  onEscapePress: () => void;
}> = ({ game, player, onEscapePress }) => {
  const { die, state, grid, makeMove, hoveredColumns, scores } = game;
  const readableState = useMemo(() => {
    if ([GAME_STATE_P1_TURN, GAME_STATE_P2_TURN].includes(state)) {
      const baseText = state === player ? CURRENT_PLAYER_TURN : OPPONENT_TURN;
      return ` ${baseText} `;
    }
    return ` ${GAME_OVER} `;
  }, [state]);

  const onMovePointer = (columnIndex: number) => {
    game.focusColumn(player, columnIndex);
  };

  return (
    <Box width="100%" height="100%">
      <Box width="100%" height="50%" top={0}>
        <PlayerStatus
          totalScore={sum(scores[PLAYER_ONE])}
          player={PLAYER_ONE}
          isCurrentPlayer={player === PLAYER_ONE}
          gameState={state}
          winner={game.winner}
          die={die}
          top={0}
          left={0}
          width="25%"
          playerName="player one"
        />
      </Box>
      <DiceGrid
        top={2}
        left="center"
        controllable={player === PLAYER_ONE}
        color={player === PLAYER_ONE ? 'red' : 'white'}
        columns={grid[PLAYER_ONE]}
        scores={scores[PLAYER_ONE]}
        onSelectColumn={(columnIndex) => makeMove(PLAYER_ONE, columnIndex)}
        {...(player === PLAYER_ONE && { onMovePointer })}
        hoveredIndex={hoveredColumns[PLAYER_ONE]}
        onEscapePress={onEscapePress}
      />
      <Box
        width="60%"
        height={1}
        left="center"
        top="50%"
        align="center"
        ch="–"
      />
      {readableState && (
        <Box
          top="50%"
          height={1}
          left={`50%-${Math.floor(readableState.length / 2)}`}
          width={readableState.length}
          align="center"
          content={readableState}
        />
      )}
      <Box width="100%" height="50%-1" top="50%+1" left="0">
        <DiceGrid
          top="center"
          left="center"
          color={player === PLAYER_TWO ? 'red' : 'white'}
          columns={grid[PLAYER_TWO]}
          controllable={player === PLAYER_TWO}
          scores={scores[PLAYER_TWO]}
          onSelectColumn={(columnIndex) => makeMove(PLAYER_TWO, columnIndex)}
          {...(player === PLAYER_TWO && { onMovePointer })}
          hoveredIndex={hoveredColumns[PLAYER_TWO]}
          onEscapePress={onEscapePress}
        />
        <PlayerStatus
          totalScore={sum(scores[PLAYER_TWO])}
          player={PLAYER_TWO}
          isCurrentPlayer={player === PLAYER_TWO}
          gameState={state}
          die={die}
          top={0}
          winner={game.winner}
          right={0}
          width="25%"
          playerName="player two"
        />
      </Box>
    </Box>
  );
};

export const GameRoom: React.FC = () => {
  const { params, goBack } = useNavigation();

  const [frame, setFrame] = useState(0);
  const [game, setGame] = useState<Knucklebones | null>(null);

  const [state, setState] = useState<Knucklebones['state'] | null>(null);
  const [player, setPlayer] = useState<PlayerIdentifier | null>(null);

  const [hoveredP1Column, setHoveredP1Column] = useState<number>(0);
  const [hoveredP2Column, setHoveredP2Column] = useState<number>(0);

  const [isRagequitOverlayVisible, setIsRagequitOverlayVisible] =
    useState(false);

  const syncGameState = (game: Knucklebones) => {
    setGame(game);
    setState(game.state);
    setHoveredP1Column(game.hoveredColumns[PLAYER_ONE]);
    setHoveredP2Column(game.hoveredColumns[PLAYER_TWO]);
    setFrame(game.turn);
  };

  useEffect(() => {
    const joinGameRoomPayload = params as ReturnType<JoinGameRoom>;
    if (!joinGameRoomPayload) return;

    const { game, player } = joinGameRoomPayload;

    setPlayer(player);
    game.addListener(syncGameState);
    syncGameState(game);
  }, []);

  if (!game) return null;
  if (!game.state) return null;
  if (!player) return null;
  if (!state) return null;
  const helperText = chalk.white(
    chalk.bold('controls:'),
    chalk.inverse(' ← → '),
    'or',
    chalk.inverse(' h l '),
    'to move;',
    chalk.inverse(' ⏎ '),
    'to place piece;',
    chalk.inverse(' Esc '),
    'to quit'
  );

  const onEscapePress = () => {
    if (state === GAME_STATE_END) {
      goBack();
      return;
    }

    setIsRagequitOverlayVisible(true);
  };

  return (
    <Box>
      {!isRagequitOverlayVisible && (
        <>
          <Box top={0} left={undefined} right={0} width="100%" height={1}>
            <Txt top={0} width="80%" align="center">
              {helperText}
            </Txt>

            <Box
              top={0}
              right={0}
              width="20%"
              height={1}
              align="center"
              content={
                params.roomName
                  ? chalk.white(
                      chalk.bold('room:'),
                      chalk.inverse(` ${params.roomName as string} `)
                    )
                  : ''
              }
            />
          </Box>
          <Box top={1} left={0} width="100%" height={1} ch="–" />
          <Box top={2}>
            <Field
              key={`${game.die}-${frame}`}
              frame={frame}
              game={game}
              player={player}
              hoveredP2Column={hoveredP2Column}
              hoveredP1Column={hoveredP1Column}
              onEscapePress={onEscapePress}
            />
          </Box>
        </>
      )}
      <RagequitOverlay
        isVisible={isRagequitOverlayVisible}
        description="are you sure? the game is not over yet"
        onHide={() => setIsRagequitOverlayVisible(false)}
        onQuit={() => {
          setIsRagequitOverlayVisible(false);
          leaveGameRoom(params.roomName as string);
          goBack();
        }}
      />
    </Box>
  );
};
