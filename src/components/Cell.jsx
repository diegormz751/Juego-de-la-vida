import { Box } from '@chakra-ui/react';

const Cell = ({ isAlive, activateCell }) => {
  return (
    <Box
      backgroundColor={isAlive ? 'yellow.200' : 'blue.200'}
      border='1px solid black'
      onClick={activateCell}
    ></Box>
  );
};

export default Cell;
