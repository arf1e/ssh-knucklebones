import React from 'react';
import { PRIMARY_COLOR } from '../constants/terminal';
import { DetailedBlessedProps } from 'react-blessed';
import { Widgets } from 'blessed';
import get from 'lodash/get';
import { useNavigation } from '../hooks/useNavigation';

export type ListOption = {
  label: string;
  onHover?: () => void;
  onSelect?: () => void;
};

type ListProps = {
  focused: boolean;
  options: ListOption[];
  onEscapePress?: () => void;
  appendGoBackItem?: boolean;
} & Omit<DetailedBlessedProps<Widgets.ListElement>, 'focused'>;

export const List: React.FC<ListProps> = ({
  focused = false,
  options,
  onEscapePress,
  appendGoBackItem = false,
  ...blessedProps
}) => {
  const { goBack } = useNavigation();

  const handleEscape = () => {
    if (onEscapePress) {
      onEscapePress();
      return;
    }

    goBack();
  };

  const handleSelection = (label: string) => {
    const option = options.find(
      ({ label: optionLabel }) => label === optionLabel
    );
    if (!option) return;

    option.onSelect?.();
  };

  const onSelect = (payload: unknown & { content: string }) => {
    const label = get(payload, 'content');

    if (label === 'go back <esc>') {
      goBack();
      return;
    }

    handleSelection(label);
  };

  const listItems = appendGoBackItem
    ? [...options, { label: 'go back <esc>' }]
    : options;

  return (
    <>
      <blessed-list
        vi
        keys
        bg="black"
        // @ts-expect-error blessed typings are wrong
        focused={focused}
        interactive={focused}
        items={listItems.map(({ label }) => label)}
        onSelect={onSelect}
        keyable
        onKeypress={(_ch: string, key: { full: string }) => {
          if (key.full === 'escape') {
            handleEscape();
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
    </>
  );
};
