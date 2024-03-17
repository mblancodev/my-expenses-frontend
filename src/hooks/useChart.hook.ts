import { RootState } from "src/app/store";
import { useSelector } from "react-redux";
import { generateColors } from "src/helpers/generateColors.helper";
import { summUpValuesByDescription } from "src/helpers/summUpValuesByDescription.helper";

export const useChart = () => {
  const expensesArray = useSelector((state: RootState) => state.expenses.list);
  const valuesCellName = useSelector(
    (state: RootState) => state.fileHeaders.valuesCellName
  );
  const descriptionCellName = useSelector(
    (state: RootState) => state.fileHeaders.descCellName
  );

  const labels = expensesArray.reduce((acc, curr) => {
    if (!acc.includes(curr[descriptionCellName])) {
      acc.push(curr[descriptionCellName]);
    }
    return acc;
  }, []);

  const data = summUpValuesByDescription(
    expensesArray,
    descriptionCellName,
    valuesCellName
  );

  const chartConfig = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: generateColors(labels.length),
      },
    ],
  };

  return {
    chartConfig,
  };
};
