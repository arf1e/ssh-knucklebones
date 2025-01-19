import React from 'react';
import chalk from 'chalk';
import { useNavigation } from '../../hooks/useNavigation';
import { Txt } from '../../components/Txt';
import { List } from '../../components/List';
import { Box } from '../../components/Box';

type RageQuitProps = {
  onQuit: () => void;
};

export const RageQuit: React.FC<RageQuitProps> = ({ onQuit }) => {
  const { goBack } = useNavigation();
  return (
    <Box>
      <Txt top={0}>{chalk.inverse('disconnect')}</Txt>
      <Txt top={2}>{chalk.bold('are you sure?')}</Txt>
      <List
        top={4}
        focused={true}
        options={[
          {
            label: 'no <esc>',
            onSelect: goBack,
          },
          {
            label: 'yeah',
            onSelect: onQuit,
          },
        ]}
      />
    </Box>
  );
};
