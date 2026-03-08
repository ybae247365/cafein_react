import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManualPage from "./features/manual/pages/ManualPage";
import ManualDetail from "./features/manual/components/ManualDetail";
import FaqPage from "./features/manual/pages/FaqPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ManualPage />} />
          <Route path="/manual/:id" element={<ManualDetail />} />
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
