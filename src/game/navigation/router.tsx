import React from 'react';
import { Box } from '../../components/Box';
import { NavigationRoutes, useNavigation } from '../../hooks/useNavigation';
import { CreateGameRoom, JoinGameRoom } from '../engine/room-manager';
import { ChooseAILevel } from '../screens/choose-ai-level';
import { RageQuit } from '../screens/ragequit';
import { Rules } from '../screens/rules';
import { MainMenu } from '../screens/main-menu';
import { JoinRoom, RoomSettings } from '../screens/room-settings';
import { GameRoom } from '../screens/game-room';

type RouterProps = {
  onQuit: () => void;
  createGameRoom: CreateGameRoom;
  joinGameRoom: JoinGameRoom;
};

export const Router: React.FC<RouterProps> = ({ onQuit }) => {
  const {
    route: { path },
  } = useNavigation();

  return (
    <Box>
      {path === NavigationRoutes.mainMenu && <MainMenu />}
      {path === NavigationRoutes.rules && <Rules />}
      {path === NavigationRoutes.ragequit && <RageQuit onQuit={onQuit} />}
      {path === NavigationRoutes.aiLevel && <ChooseAILevel />}
      {path === NavigationRoutes.roomSettings && <RoomSettings />}
      {path === NavigationRoutes.joinRoom && <JoinRoom />}
      {path === NavigationRoutes.gameRoom && <GameRoom />}
    </Box>
  );
};
