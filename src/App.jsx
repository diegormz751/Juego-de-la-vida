import { Box, Button, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useInterval } from '@chakra-ui/react';
import Cell from './components/Cell';

const App = () => {
  const nRows = 50;
  const nCols = 50;

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < nRows; i++) {
      rows.push(Array.from(Array(nCols), () => false));
    }
    return rows;
  });

  const activateCell = (row, col) => {
    const newGrid = grid.map((rows, i) =>
      rows.map((col2, j) => (i === row && j === col ? !col2 : col2))
    );
    setGrid(newGrid);
  };

  const startGame = () => {
    const newGrid = grid.map((rows, i) =>
      rows.map((col2, j) => {
        const neighbors = [
          grid[i - 1]?.[j - 1],
          grid[i - 1]?.[j],
          grid[i - 1]?.[j + 1],
          grid[i]?.[j - 1],
          grid[i]?.[j + 1],
          grid[i + 1]?.[j - 1],
          grid[i + 1]?.[j],
          grid[i + 1]?.[j + 1],
        ];
        const aliveNeighbors = neighbors.filter((n) => n).length;
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
          return false;
        }
        if (aliveNeighbors === 3) {
          return true;
        }
        return col2;
      })
    );
    setGrid(newGrid);
  };

  const clearGrid = () => {
    const newGrid = grid.map((rows) => rows.map((col2) => false));
    setGrid(newGrid);
  };

  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      startGame();
    },
    isRunning ? 100 : null
  );

  return (
    <VStack>
      <Box></Box>
      <HStack>
        <Button
          colorScheme='teal'
          onClick={() => {
            setIsRunning(!isRunning);
          }}
        >
          {isRunning ? 'Pausar' : 'Jugar'}
        </Button>
        {isRunning ? null : (
          <Button colorScheme='teal' onClick={clearGrid}>
            Reiniciar
          </Button>
        )}
      </HStack>
      <SimpleGrid columns={nCols} spacing={0} w='90vw' h='90vh'>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <Cell
              key={`${i}-${k}`}
              isAlive={col}
              activateCell={() => activateCell(i, k)}
            />
          ))
        )}
      </SimpleGrid>
    </VStack>
  );
};

export default App;
