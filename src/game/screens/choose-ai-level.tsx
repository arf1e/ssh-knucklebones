import React from 'react';
import chalk from 'chalk';
import { Txt } from '../../components/Txt';
import { List } from '../../components/List';
import { NavigationRoutes, useNavigation } from '../../hooks/useNavigation';
import { Box } from '../../components/Box';
import { Knucklebones } from '../engine';
import { RANDOM_BOI_AI_NAME } from '../engine/ai/random-boi';
import { HATER_AI_NAME } from '../engine/ai/hater';

const getAiRoomName = (aiName: string) => `${aiName} AI`;

export const ChooseAILevel = () => {
  const { navigate } = useNavigation();

  return (
    <Box>
      <Txt top={0}>{chalk.inverse('choose your ai opponent')}</Txt>
      <List
        top={2}
        focused={true}
        appendGoBackItem
        options={[
          {
            label: 'random boi (makes random moves)',
            onSelect: () =>
              navigate(NavigationRoutes.gameRoom, {
                game: new Knucklebones(RANDOM_BOI_AI_NAME),
                player: 'p1',
                roomName: getAiRoomName(RANDOM_BOI_AI_NAME),
              }),
          },
          {
            label: 'the hater (tries to evict your dice)',
            onSelect: () =>
              navigate(NavigationRoutes.gameRoom, {
                game: new Knucklebones(HATER_AI_NAME),
                player: 'p1',
                roomName: getAiRoomName(HATER_AI_NAME),
              }),
          },
        ]}
      />
    </Box>
  );
};
