import "./App.css";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { SideBar } from "./component/Sidebar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./component/pages/Home";
import About from "./component/pages/About";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <SideBar />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
