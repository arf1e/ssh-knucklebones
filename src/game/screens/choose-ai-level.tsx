import chalk from 'chalk';
import { Txt } from '../../components/Txt';
import { List } from '../../components/List';
import { useNavigation } from '../../hooks/useNavigation';
import { Box } from '../../components/Box';

export const ChooseAILevel = () => {
  const { goBack, navigate } = useNavigation();

  return (
    <Box>
      <Txt top={0}>{chalk.inverse('how tuff you want your ai to be?')}</Txt>
      <List
        top={2}
        focused={true}
        options={[
          {
            label: 'easy',
            onSelect: () => {},
          },
          {
            label: 'medium',
            onSelect: () => {},
          },
          {
            label: 'hard',
            onSelect: () => {},
          },
          {
            label: 'go back <esc>',
            onSelect: goBack,
          },
        ]}
      />
    </Box>
  );
};
