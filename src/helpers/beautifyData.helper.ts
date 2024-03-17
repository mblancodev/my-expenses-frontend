import { formatAmount } from "./formatAmount.helper";
import { formatDate } from "./formatDate.helper";

export function beautifyData(
  data: any[],
  valuesCellName: string,
  dateCellName: string
) {
  const f = JSON.parse(JSON.stringify(data)).map((t: any) => {
    t[valuesCellName] = formatAmount(t[valuesCellName] as number);
    t[dateCellName] = formatDate(t[dateCellName] as string);
    return t;
  });
  return f;
}
