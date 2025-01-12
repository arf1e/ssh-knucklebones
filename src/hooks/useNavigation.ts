import React from 'react';

export enum NavigationRoutes {
  mainMenu = '/',
  rules = '/rules',
  ragequit = '/ragequit',
  aiLevel = '/ai-level',
  createOrJoinRoom = '/create-or-join-room',
  lobby = '/lobby',
  gameRoom = '/game-room',
}

export const NavigationContext = React.createContext<{
  route: { path: NavigationRoutes; params?: Record<string, unknown> };
  navigate: (route: NavigationRoutes, params?: Record<string, unknown>) => void;
  params: Record<string, unknown>;
  goBack: () => void;
}>({
  route: { path: NavigationRoutes.mainMenu, params: {} },
  params: {},
  navigate: () => {},
  goBack: () => {},
});

export const useNavigation = () => {
  const { route, navigate, goBack, params } =
    React.useContext(NavigationContext);

  return { route, navigate, goBack, params };
};
