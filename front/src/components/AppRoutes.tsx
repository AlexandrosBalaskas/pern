import { Routes, Route } from "react-router-dom";
import { Initial } from "./Initial";
import { InitialTwo } from "./InitialTwo";
import { HashRouter as Router } from "react-router-dom";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Initial />} />
        <Route path="/" element={<Initial />} />
        <Route path="/home" element={<Initial />} />
        <Route path="/page/:category/list" element={<InitialTwo />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
