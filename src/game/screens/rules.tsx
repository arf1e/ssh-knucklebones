import chalk from 'chalk';
import { useNavigation } from '../../hooks/useNavigation';
import { Txt } from '../../components/Txt';
import { List } from '../../components/List';
import { Box } from '../../components/Box';

export const Rules = () => {
  const { goBack } = useNavigation();

  return (
    <Box>
      <Box width={70}>
        <Txt top={0}>{chalk.inverse('rules')}</Txt>
        <Txt top={2}>{chalk.bold('1. making moves')}</Txt>
        <Txt top={3}>
          in knucklebones, players take turns rolling dice and placing it in
          either one of three columns on their field.
        </Txt>
        <Txt top={6}>{chalk.bold('2. making moves the smart way')}</Txt>
        <Txt top={7}>
          if your column already has a piece of the same value, the values
          multiply and the total gets added to your score. if your opponent's
          column has a piece of the same value, their piece(s) are removed from
          the column.
        </Txt>
        <Txt top={12}>{chalk.bold('3. winning and losing')}</Txt>
        <Txt top={13}>
          game session ends when one of the players has filled all their
          columns. player with the highest score wins.
        </Txt>
      </Box>
      <List
        top="99%"
        focused={true}
        options={[
          {
            label: 'go back <enter or esc>',
            onSelect: () => goBack(),
          },
        ]}
      />
    </Box>
  );
};
