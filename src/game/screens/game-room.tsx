import { Box } from '../../components/Box';
import { DICE_COLUMN_WIDTH, DiceColumn } from '../../components/DiceColumn';
import { useNavigation } from '../../hooks/useNavigation';

export const GameRoom = () => {
  const { params } = useNavigation();

  return (
    <Box width="100%" height="100%">
      <Box width="100%" height="50%" top="0" content="current player field">
        <Box top="center" left="center" align="center">
          <Box left="center" top={0} width={17} bg="green">
            <DiceColumn top={0} left={0} column={[null, 5, 5]} />
            <DiceColumn top={0} left={6} column={[4, 5, 6]} />
            <DiceColumn top={0} left={12} column={[1, 1, 1]} hover />
          </Box>
        </Box>
      </Box>
      <Box width="100%" height={1} left={0} top="50%" align="center" ch="-" />
      <Box
        height={1}
        left="50%-7"
        top="50%"
        width={' status bar '.length}
        align="center"
        content=" status bar "
      />
      <Box
        width="100%"
        height="50%-1"
        top="50%+1"
        left="0"
        bg="blue"
        content="opponent field"
      />
    </Box>
  );
};
