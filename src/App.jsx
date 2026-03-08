import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManualPage from "./features/manual/pages/ManualPage";
import ManualDetail from "./features/manual/components/ManualDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ManualPage />} />
          <Route path="/manual/:id" element={<ManualDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
