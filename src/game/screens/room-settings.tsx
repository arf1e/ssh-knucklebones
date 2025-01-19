import React from 'react';
import { Box } from '../../components/Box';
import { ListMenu } from '../../components/ListMenu';
import { NavigationRoutes, useNavigation } from '../../hooks/useNavigation';
import { Txt } from '../../components/Txt';
import chalk from 'chalk';
import { Input } from '../../components/Input';
import { createGameRoom, joinGameRoom } from '../engine/room-manager';

export const JoinRoom = () => {
  const { goBack, navigate } = useNavigation();
  const [roomNumber, setRoomNumber] = React.useState('');
  const [error, setError] = React.useState('');

  const handleInput = (input: string) => {
    if (input.length === 0) {
      setRoomNumber('');
    }

    const validNumber = input.match(/^\d+$/);
    if (!validNumber) {
      return;
    }

    setRoomNumber(validNumber.join(''));
  };

  const handleSubmit = () => {
    setError('');
    if (roomNumber.length === 0) {
      return;
    }

    const joinGameRoomPayload = joinGameRoom(roomNumber, setError);

    if (!joinGameRoomPayload) {
      return;
    }

    const { game, player, roomName } = joinGameRoomPayload;
    console.log(game, player, roomName);
    navigate(NavigationRoutes.gameRoom, { game, player, roomName });
  };

  return (
    <Box>
      <Txt top={0}>{chalk.inverse('join room')}</Txt>
      <Txt top={2}>
        {chalk.bold('enter room number', chalk.bgRed('(up to 3 digits):'))}
      </Txt>
      <Box top={3} height={1}>
        <Box width={1} top={0} height={1} ch={chalk.bold('>')} />
        <Input
          top={0}
          left={2}
          focused
          value={roomNumber}
          maxLength={3}
          onChange={handleInput}
          onSubmit={() => handleSubmit()}
          onEscape={goBack}
        />
      </Box>
      <Box
        top={4}
        left={0}
        content={chalk.red(error)}
        width="100%"
        height={1}
        align="left"
      />
      <Box
        top={8}
        content={chalk.white('-', chalk.inverse(' ⏎ '), 'to submit')}
      />
      <Box
        top={10}
        content={chalk.white('-', chalk.inverse(' Esc '), 'to go back')}
      />
    </Box>
  );
};

export const RoomSettings: React.FC = () => {
  const { navigate } = useNavigation();

  const handleCreateRoom = () => {
    const createGameRoomPayload = createGameRoom();
    if (!createGameRoomPayload) {
      return;
    }

    const { game, player, roomName } = createGameRoomPayload;
    navigate(NavigationRoutes.gameRoom, { game, player, roomName });
  };

  return (
    <ListMenu
      title="play against real human being"
      appendGoBackItem
      options={[
        {
          label: 'create room',
          onSelect: handleCreateRoom,
        },
        {
          label: 'join room',
          onSelect: () => navigate(NavigationRoutes.joinRoom),
        },
      ]}
    />
  );
};
