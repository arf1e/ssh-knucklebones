import { Widgets } from 'blessed';
import chalk from 'chalk';
import { DetailedBlessedProps } from 'react-blessed';
import { Box } from './Box';

export const DIE_HEIGHT = 3;
export const DIE_WIDTH = 5;

type DieColor = 'white' | 'yellow' | 'blue';

type DieProps = {
  value: number;
  color?: DieColor;
} & DetailedBlessedProps<Widgets.BoxElement>;

const getChalkWrapper = (color: DieColor) => {
  return {
    white: chalk.white,
    yellow: chalk.yellow,
    blue: chalk.cyan,
  }[color];
};

export const Die: React.FC<DieProps> = ({
  value,
  color = 'white',
  ...boxProps
}) => {
  const chalkWrapper = getChalkWrapper(color);
  return (
    <Box
      {...boxProps}
      height={DIE_HEIGHT}
      width={DIE_WIDTH}
      border={{ type: 'line', fg: 1, bg: 0 }}
      style={{ border: { fg: color } }}
      align="center"
      content={chalkWrapper(chalk.bold(value.toString()))}
    />
  );
};

export const DiePlaceholder: React.FC<
  DetailedBlessedProps<Widgets.BoxElement>
> = ({ ...boxProps }) => {
  return (
    <box
      height={DIE_HEIGHT}
      width={DIE_WIDTH}
      border={{ type: 'line', fg: 0, bg: 0 }}
      align="center"
      {...boxProps}
      content={'·'}
    />
  );
};
