import React from 'react';
import { PRIMARY_COLOR } from '../constants/terminal';
import { DetailedBlessedProps } from 'react-blessed';
import { Widgets } from 'blessed';
import get from 'lodash/get';
import { useNavigation } from '../hooks/useNavigation';

type ListOption = {
  label: string;
  onSelect?: () => void;
};

type ListProps = {
  focused: boolean;
  options: ListOption[];
} & Omit<DetailedBlessedProps<Widgets.ListElement>, 'focused'>;

export const List: React.FC<ListProps> = ({
  focused = false,
  options,
  ...blessedProps
}) => {
  const { goBack } = useNavigation();

  const handleSelection = (label: string) => {
    const option = options.find(
      ({ label: optionLabel }) => label === optionLabel
    );
    if (!option) return;

    option.onSelect?.();
  };

  return (
    <list
      vi
      keys
      bg="black"
      // @ts-ignore
      focused={focused}
      interactive={focused}
      items={options.map(({ label }) => label)}
      // @ts-ignore
      onSelect={(payload: unknown & { content: string }) => {
        const label = get(payload, 'content');
        handleSelection(label);
      }}
      //@ts-ignore
      keyable
      onKeypress={(ch, key) => {
        if (key.full === 'escape') {
          goBack();
        }
      }}
      style={{
        selected: {
          bg: PRIMARY_COLOR,
          bold: true,
        },
        bg: 'black',
      }}
      {...blessedProps}
    />
  );
};
