import { Box } from '../../components/Box';
import { NavigationRoutes, useNavigation } from '../../hooks/useNavigation';
import { ChooseAILevel } from '../screens/choose-ai-level';
import { GameRoom } from '../screens/game-room';
import { MainMenu } from '../screens/main-menu';
import { RageQuit } from '../screens/ragequit';
import { Rules } from '../screens/rules';

type RouterProps = {
  onQuit: () => void;
};

export const Router: React.FC<RouterProps> = ({ onQuit }) => {
  const {
    route: { path },
  } = useNavigation();

  return (
    <Box>
      {path === NavigationRoutes.mainMenu && <GameRoom />}
      {path === NavigationRoutes.rules && <Rules />}
      {path === NavigationRoutes.ragequit && <RageQuit onQuit={onQuit} />}
      {path === NavigationRoutes.aiLevel && <ChooseAILevel />}
    </Box>
  );
};
