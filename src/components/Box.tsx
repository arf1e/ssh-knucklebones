import React from 'react';
import { Widgets } from 'blessed';
import { DetailedBlessedProps } from 'react-blessed';

export const Box: React.FC<DetailedBlessedProps<Widgets.BoxElement>> = ({
  ...boxProps
}) => <blessed-box bg={boxProps.bg || 'black'} {...boxProps} />;
