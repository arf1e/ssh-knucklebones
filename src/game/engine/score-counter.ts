import countBy from 'lodash/countBy';
import { DiceColumnState } from '.';

export const calculateColumnScore = (column: DiceColumnState) => {
  const placedDice = column.filter((die) => die !== null);
  const occurences = countBy(placedDice);
  let totalSum = 0;
  for (const [value, count] of Object.entries(occurences)) {
    const combinedValue = parseInt(value) * Math.pow(count, 2);
    totalSum += combinedValue;
  }
  return totalSum;
};
