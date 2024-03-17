import { Row } from "read-excel-file";
import { isValidDate } from "src/helpers/checkIsValidDate.helper";
import { transformToArrayOfObjects } from "src/helpers/transformToArrayOfObjects.helper";

export const useExcelDataRead = (data: Row[]) => {
  const [headers, ...values] = data;
  const valuesCellIndex = values[0].findIndex(
    (t) => !isNaN(parseFloat(t as string))
  );
  const expenses = transformToArrayOfObjects(data);
  const dateCellIndex = values[0].findIndex((t) => isValidDate(`${t}`));

  return {
    headers,
    expenses,
    dateCellIndex,
    valuesCellIndex,
  };
};
