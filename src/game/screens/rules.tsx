import React from 'react';
import chalk from 'chalk';
import { Txt } from '../../components/Txt';
import { List } from '../../components/List';
import { Box } from '../../components/Box';

export const Rules = () => {
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
          if your column already has a piece of the same value, each piece adds
          its value multiplied by the amount of the same dice in the column to
          your score. so, two 6 pieces would give you 6*2 + 6*2 = 24 points. if
          your opponent has pieces of the same value in the same column, their
          pieces are removed from the column.
        </Txt>
        <Txt top={13}>{chalk.bold('3. winning and losing')}</Txt>
        <Txt top={14}>
          game session ends when one of the players has filled all their
          columns. player with the highest score wins.
        </Txt>
      </Box>
      <List top="99%" appendGoBackItem focused={true} options={[]} />
    </Box>
  );
};
