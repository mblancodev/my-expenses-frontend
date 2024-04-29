import { DashboardPage } from "src/pages/DashboardPage";
import { TimelineRange } from "src/pages/TimelineRange";
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
  {
    exact: true,
    path: "/test",
    element: (
      <div className="my-4 py-12">
        <div className="container mx-auto">
          <TimelineRange />
        </div>
      </div>
    ),
  },
];
