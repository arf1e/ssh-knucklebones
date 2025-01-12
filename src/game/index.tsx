import blessed from 'blessed';
import { render } from 'react-blessed';
import { NavigationProvider } from '../components/NavigationProvider';
import { Router } from './navigation/router';
import { Box } from '../components/Box';

type AppProps = {
  onQuit: () => void;
};

const App: React.FC<AppProps> = ({ onQuit }) => {
  return (
    <Box width="100%" height="100%">
      <NavigationProvider>
        <Box left="center" top="center" width="80%" height="80%">
          <Router onQuit={onQuit} />
        </Box>
      </NavigationProvider>
    </Box>
  );
};

export const renderBlessedApp = (
  screen: blessed.Widgets.Screen,
  onQuit: () => void
) => {
  render(<App onQuit={onQuit} />, screen);
};
