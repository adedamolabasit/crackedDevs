import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Map } from "./page/BaseMap/Map";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Map />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
