import { RootState } from "src/app/store";
import { useSelector } from "react-redux";
import { generateColors } from "src/helpers/generateColors.helper";
import { summUpValuesByDescription } from "src/helpers/summUpValuesByDescription.helper";
import { DictionaryType, GenerativeDictionaryType } from "src/types";

export const useChart = () => {
  const expensesArray = useSelector((state: RootState) => state.expenses.list);
  const valuesCellName = useSelector(
    (state: RootState) => state.fileHeaders.valuesCellName
  );
  const descriptionCellName = useSelector(
    (state: RootState) => state.fileHeaders.descCellName
  );
  const data = summUpValuesByDescription(
    expensesArray,
    descriptionCellName,
    valuesCellName
  );

  const minValuesSorted = data.sort((a, b) => a.value - b.value);
  const fiveSmallestValues = minValuesSorted.slice(0, 5);

  const greatestValuesSorted = data.sort((a, b) => b.value - a.value);
  const fiveGreatestValues = greatestValuesSorted.slice(0, 5);

  const getLabelsFromData = (arr: Array<{ label: string; value: number }>) => {
    return arr.reduce((acc, curr) => {
      if (!acc.includes(curr.label)) {
        acc.push(curr.label);
      }
      return acc;
    }, [] as string[]);
  };

  const createChartConfig = (data: number[], labels: string[]) => ({
    labels,
    datasets: [
      {
        data: data,
        backgroundColor: generateColors(labels.length),
      },
    ],
  });

  return {
    minValuesSorted,
    createChartConfig,
    getLabelsFromData,
    greatestValuesSorted,
    minValues: fiveSmallestValues,
    maxValues: fiveGreatestValues,
  };
};
