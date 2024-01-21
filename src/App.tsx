import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Map } from "./page/BaseMap/Map";
import { DashboardProvider } from "./context/DashboardContext";

function App() {
  return (
    <div className="App">
      <DashboardProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Map />} />
          </Routes>
        </Router>
      </DashboardProvider>
    </div>
  );
}

export default App;
