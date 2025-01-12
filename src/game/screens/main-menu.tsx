import chalk from 'chalk';
import { NavigationRoutes, useNavigation } from '../../hooks/useNavigation';
import { List } from '../../components/List';
import { Box } from '../../components/Box';

export const MainMenu = () => {
  const { navigate } = useNavigation();

  return (
    <Box>
      <text>{chalk.inverse('knucklebones')}</text>
      <List
        top={2}
        focused={true}
        options={[
          { label: 'play against real human being' },
          {
            label: 'play against soulless ai',
            onSelect: () => navigate(NavigationRoutes.aiLevel),
          },
          {
            label: 'read game rules',
            onSelect: () => navigate(NavigationRoutes.rules),
          },
          {
            label: 'disconnect',
            onSelect: () => navigate(NavigationRoutes.ragequit),
          },
        ]}
      />
    </Box>
  );
};
