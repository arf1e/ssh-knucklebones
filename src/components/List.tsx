import React from 'react';
import { PRIMARY_COLOR } from '../constants/terminal';
import { DetailedBlessedProps } from 'react-blessed';
import { Widgets } from 'blessed';
import get from 'lodash/get';
import { useNavigation } from '../hooks/useNavigation';

export type ListOption = {
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

  const onSelect = (payload: unknown & { content: string }) => {
    const label = get(payload, 'content');
    handleSelection(label);
  };

  return (
    <blessed-list
      vi
      keys
      bg="black"
      // @ts-expect-error blessed typings are wrong
      focused={focused}
      interactive={focused}
      items={options.map(({ label }) => label)}
      onSelect={onSelect}
      keyable
      onKeyPress={(_ch: string, key: { full: string }) => {
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
