import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import DataPage from "./pages/DataPage";
import DataWorkspace from "./pages/DataWorkspace";
import Insight from "./pages/Insight";
import QuickActions from "./pages/QuickActions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="data" element={<DataPage />} />
          <Route path="data/workspace" element={<DataWorkspace />} />
          <Route path="insight" element={<Insight />} />
          <Route path="actions" element={<QuickActions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
