import { Routes, Route } from "react-router-dom";
import { Initial } from "./Initial";
import { InitialTwo } from "./InitialTwo";

function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<Initial />} />
      <Route path="/" element={<Initial />} />
      <Route path="/home" element={<Initial />} />
      <Route path="/page/:category/list" element={<InitialTwo />} />
    </Routes>
  );
}

export default AppRoutes;
