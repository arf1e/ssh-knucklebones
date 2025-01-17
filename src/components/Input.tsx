import React from 'react';
import { Widgets } from 'blessed';
import { DetailedBlessedProps } from 'react-blessed';
import { Box } from './Box';
import { useAnimatedSymbol } from '../hooks/useAnimatedSymbol';
import chalk from 'chalk';
import omit from 'lodash/omit';

type InputProps = {
  value: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onBlur?: () => void;
  onEscape?: () => void;
  maxLength?: number;
  focused?: boolean;
} & Omit<DetailedBlessedProps<Widgets.BoxElement>, 'focused'>;

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onSubmit,
  onBlur,
  onEscape,
  maxLength,
  focused,
  ...boxProps
}) => {
  const animatedSymbol = useAnimatedSymbol('block', 500);
  const block = focused ? chalk.red(animatedSymbol) : '';

  const handleKeyPress = (ch: string, full: string) => {
    if (full === 'return') {
      onSubmit?.(value);
      return;
    }

    if (full === 'backspace') {
      onChange?.(value.slice(0, -1));
      return;
    }

    if (['escape', 'tab', 'C-c'].includes(full)) {
      if (full === 'escape') {
        onEscape?.();
        return;
      }

      onBlur?.();
      return;
    }

    if (maxLength && value.length === maxLength) {
      return;
    }

    onChange?.(value.slice(0, maxLength ? maxLength - 1 : undefined) + ch);
  };

  return (
    <Box
      {...omit(boxProps, ['focused'])}
      // @ts-expect-error blessed typings are wrong
      focused={focused}
      keyable
      keys
      content={`${value}${block}`}
      onKeypress={(ch, key) => handleKeyPress(ch, key.full)}
    />
  );
};
