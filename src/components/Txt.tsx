import { BlessedIntrinsicElements } from 'react-blessed';

type TxtProps = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
  children: string;
} & BlessedIntrinsicElements['element'];

export const Txt: React.FC<TxtProps> = ({ children, ...textProps }) => {
  // @ts-ignore
  return <text {...textProps}>{children}</text>;
};
