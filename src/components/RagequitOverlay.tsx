import React from 'react';
import { Box } from './Box';
import { Txt } from './Txt';
import chalk from 'chalk';
import { List } from './List';

type RagequitOverlayProps = {
  onQuit: () => void;
  isVisible?: boolean;
  onHide: () => void;
  title?: string;
  description?: string;
};

export const RagequitOverlay: React.FC<RagequitOverlayProps> = ({
  onQuit,
  isVisible = false,
  onHide,
  title = 'ragequit',
  description = 'are you sure?',
}) => {
  if (!isVisible) return null;

  return (
    <Box
      width="100%"
      height="100%"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="black"
      border="line"
    >
      <Txt top={0}>{chalk.inverse(title)}</Txt>
      <Txt top={2}>{chalk.bold(description)}</Txt>

      <List
        top={4}
        focused={true}
        onEscapePress={onHide}
        options={[
          { label: 'yes', onSelect: onQuit },
          { label: 'no <esc>', onSelect: onHide },
        ]}
      />
    </Box>
  );
};
