import React from 'react';
import { Box } from '../../components/Box';
import { NavigationRoutes, useNavigation } from '../../hooks/useNavigation';
import { CreateGameRoom, JoinGameRoom } from '../engine/room-manager';
import { ChooseAILevel } from '../screens/choose-ai-level';
import { GameRoom, GameRoomScreen } from '../screens/game-room';
import { RageQuit } from '../screens/ragequit';
import { Rules } from '../screens/rules';
import { PLAYER_ONE } from '../engine';
import { join } from 'path';

type RouterProps = {
  onQuit: () => void;
  createGameRoom: CreateGameRoom;
  joinGameRoom: JoinGameRoom;
};

export const Router: React.FC<RouterProps> = ({
  onQuit,
  createGameRoom,
  joinGameRoom,
}) => {
  const {
    route: { path },
  } = useNavigation();

  return (
    <Box>
      {path === NavigationRoutes.mainMenu && (
        <GameRoom joinGameRoom={joinGameRoom} />
      )}
      {path === NavigationRoutes.rules && <Rules />}
      {path === NavigationRoutes.ragequit && <RageQuit onQuit={onQuit} />}
      {path === NavigationRoutes.aiLevel && <ChooseAILevel />}
    </Box>
  );
};
