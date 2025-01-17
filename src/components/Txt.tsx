import React from 'react';
import { BlessedIntrinsicElements } from 'react-blessed';

type TxtProps = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
  children: string;
} & BlessedIntrinsicElements['textbox'];

export const Txt: React.FC<TxtProps> = ({ children, ...textProps }) => {
  return <blessed-textbox {...textProps}>{children}</blessed-textbox>;
};
