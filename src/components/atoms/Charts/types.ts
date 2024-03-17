export type ChartDatasetType = {
  data: number[];
  backgroundColor: string[];
};

export type ChartProps = {
  data: {
    labels: string[];
    datasets: Array<ChartDatasetType>;
  };
};
