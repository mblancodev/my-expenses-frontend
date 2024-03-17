import { DashboardPage } from "src/pages/DashboardPage";
import { ResultsTablePage } from "src/pages/ResultsTablePage";

export const routes = [
  {
    path: "/",
    exact: true,
    element: <DashboardPage />,
  },
  {
    exact: true,
    path: "/results",
    element: <ResultsTablePage />,
  },
];
