import { Row } from "read-excel-file";
import { GenerativeDictionaryType } from "src/types";

export const summUpValuesByDescription = (
  data: Row[],
  descCellName: string,
  valuesCellName: string
) => {
  const summaries: GenerativeDictionaryType<any> = {};

  data.forEach((item: GenerativeDictionaryType<any>) => {
    if (!summaries[item[descCellName]]) {
      summaries[item[descCellName]] = { label: item[descCellName], value: 0 };
    }

    summaries[item[descCellName]].value += item[valuesCellName];
  });

  // Convert the summaries object into an array of its values
  return Object.values(summaries);
};
