import { Routes, Route } from "react-router-dom";
import Initial from "./Initial";
import { DynamicPage } from "./DynamicPage";
import { DynamicTable } from "./DynamicTable";

function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<Initial />} />
      <Route path="/" element={<Initial />} />
      <Route path="/home" element={<Initial />} />
      <Route path="/page/:category/:idKey" element={<DynamicPage />} />
      <Route path="/page/:category" element={<DynamicPage />} />
      <Route path="/page/:category/list" element={<DynamicTable />} />
    </Routes>
  );
}

export default AppRoutes;
