import { Knucklebones } from '..';

export const getAvailableColumnIndices = (game: Knucklebones): number[] => {
  const columns = game.grid['p2'];
  const availableColumns = [];

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.includes(null)) {
      availableColumns.push(i);
    }
  }

  return availableColumns;
};
