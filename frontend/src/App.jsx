import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import DataPage from './pages/DataPage';
import DataWorkspace from './pages/DataWorkspace';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All pages nested inside this Route will automatically inherit the MainLayout (Sidebar) */}
        <Route path="/" element={<MainLayout />}>
          
          <Route index element={<Dashboard />} />       {/* Default Home Route: / */}
          <Route path="data" element={<DataPage />} />  {/* Data Extraction Route: /data */}
          <Route path="data/workspace" element={<DataWorkspace />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}