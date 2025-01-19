import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import { NavigationProvider } from '../components/NavigationProvider';
import { Router } from './navigation/router';
import { Box } from '../components/Box';
import { CreateGameRoom, JoinGameRoom } from './engine/room-manager';
import { ErrorBoundary } from '../components/ErrorBoundary';

type AppProps = {
  onQuit: () => void;
  createGameRoom: CreateGameRoom;
  joinGameRoom: JoinGameRoom;
};

const App: React.FC<AppProps> = ({ onQuit, createGameRoom, joinGameRoom }) => {
  return (
    <Box width="100%" height="100%">
      <NavigationProvider>
        <Box left="center" top="center" width="80%" height="80%">
          <Router
            onQuit={onQuit}
            createGameRoom={createGameRoom}
            joinGameRoom={joinGameRoom}
          />
        </Box>
      </NavigationProvider>
    </Box>
  );
};

type renderBlessedAppFunctions = {
  onQuit: () => void;
  createGameRoom: CreateGameRoom;
  joinGameRoom: JoinGameRoom;
};

export const renderBlessedApp = (
  screen: blessed.Widgets.Screen,
  { onQuit, createGameRoom, joinGameRoom }: renderBlessedAppFunctions
) => {
  render(
    <ErrorBoundary>
      <App
        onQuit={onQuit}
        createGameRoom={createGameRoom}
        joinGameRoom={joinGameRoom}
      />
    </ErrorBoundary>,
    screen
  );
};
