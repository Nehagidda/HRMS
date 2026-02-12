import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/login-page";
import { DashboardLayout } from "./components/dashboard-layout";
import { DashboardHome } from "./pages/dashboard-home";
import { CreateJDPage } from "./pages/create-jd-page";
import { ExcelAnalysisPage } from "./pages/excel-analysis-page";
import { JobsPage } from "./pages/jobs-page";
import { CandidatesPage } from "./pages/candidates-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "create-jd", Component: CreateJDPage },
      { path: "excel-analysis", Component: ExcelAnalysisPage },
      { path: "jobs", Component: JobsPage },
      { path: "candidates", Component: CandidatesPage },
    ],
  },
]);
