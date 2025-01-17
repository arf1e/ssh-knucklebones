import React from 'react';
import chalk from 'chalk';
import { NavigationRoutes, useNavigation } from '../../hooks/useNavigation';
import { List } from '../../components/List';
import { Box } from '../../components/Box';
import { Txt } from '../../components/Txt';

export const MainMenu = () => {
  const { navigate } = useNavigation();

  return (
    <Box>
      <Txt>{chalk.inverse('knucklebones')}</Txt>
      <List
        top={2}
        focused={true}
        options={[
          {
            label: 'play against real human being',
            onSelect: () => navigate(NavigationRoutes.roomSettings),
          },
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
