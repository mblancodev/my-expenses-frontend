import { Pie } from "react-chartjs-2";
import { ChartProps } from "./types";
import { defaultOptions } from "./config";

export const PieChart = ({ data }: ChartProps) => {
  return (
    <Pie
      data={data}
      // @ts-expect-error
      options={defaultOptions}
    />
  );
};
