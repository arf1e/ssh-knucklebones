import React from 'react';
import chalk from 'chalk';
import { Box } from './Box';
import { List, ListOption } from './List';
import { Txt } from './Txt';

type ListMenuProps = {
  options: ListOption[];
  title: string;
};

export const ListMenu: React.FC<ListMenuProps> = ({ options, title }) => {
  return (
    <Box>
      <Txt>{chalk.inverse(title)}</Txt>
      <List top={2} focused={true} options={options} />
    </Box>
  );
};
