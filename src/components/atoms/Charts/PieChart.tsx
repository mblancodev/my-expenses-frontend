import { Pie } from "react-chartjs-2";
import { ChartProps } from "./types";

export const PieChart = ({ data }: ChartProps) => {
  return (
    <Pie
      data={{
        labels: [], // Use the descriptions array
        datasets: [
          {
            data: [], // Use the expenses array
            backgroundColor: [
              // Add colors for each segment
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#cc65fe",
              // Add more colors as needed
            ],
          },
        ],
      }}
    />
  );
};
