import { Routes, Route } from "react-router-dom";
import { Initial } from "./Initial";
import { DynamicTable } from "./DynamicTable";

function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<Initial />} />
      <Route path="/" element={<Initial />} />
      <Route path="/home" element={<Initial />} />
      <Route path="/page/:category/list" element={<DynamicTable />} />
    </Routes>
  );
}

export default AppRoutes;
