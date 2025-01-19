import React from 'react';
import chalk from 'chalk';
import { Txt } from '../../components/Txt';
import { List } from '../../components/List';
import { NavigationRoutes, useNavigation } from '../../hooks/useNavigation';
import { Box } from '../../components/Box';
import { Knucklebones } from '../engine';

export const ChooseAILevel = () => {
  const { navigate } = useNavigation();

  return (
    <Box>
      <Txt top={0}>{chalk.inverse('how tuff you want your ai to be?')}</Txt>
      <List
        top={2}
        focused={true}
        appendGoBackItem
        options={[
          {
            label: 'random boi',
            onSelect: () =>
              navigate(NavigationRoutes.gameRoom, {
                game: new Knucklebones('random-boi'),
                player: 'p1',
                roomName: 'random-boi AI',
              }),
          },
        ]}
      />
    </Box>
  );
};
