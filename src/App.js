import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManualList from "./features/manual/ManualList";
import ManualDetail from "./features/manual/ManualDetail";
import FAQList from "./features/faq/FAQList";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ManualList />} />
          <Route path="/manual/:id" element={<ManualDetail />} />
          <Route path="/faq" element={<FAQList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
