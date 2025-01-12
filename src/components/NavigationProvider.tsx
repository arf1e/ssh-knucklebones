import React, { PropsWithChildren } from 'react';
import { NavigationContext, NavigationRoutes } from '../hooks/useNavigation';

type NavigationHistoryEntry = {
  path: NavigationRoutes;
  params: Record<string, unknown>;
};

export const NavigationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [route, setRoute] = React.useState<NavigationHistoryEntry>({
    path: NavigationRoutes.mainMenu,
    params: {},
  });
  const [history = [], setHistory] = React.useState<NavigationHistoryEntry[]>(
    []
  );

  const navigate = (
    nextPath: NavigationRoutes,
    nextParams: Record<string, unknown> = {}
  ) => {
    history.push(route);
    setRoute({ path: nextPath, params: nextParams });
  };

  const goBack = () => {
    if (history.length > 0) {
      const historyCopy = [...history];
      if (historyCopy.length === 0) {
        return;
      }

      const previousRoute = historyCopy.pop();
      setHistory(historyCopy);
      setRoute(
        previousRoute ?? { path: NavigationRoutes.mainMenu, params: {} }
      );
    }
  };

  const params = route.params;

  return (
    <NavigationContext.Provider value={{ route, navigate, goBack, params }}>
      {children}
    </NavigationContext.Provider>
  );
};
