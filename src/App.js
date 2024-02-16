import "./App.css";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { SideBar } from "./component/Sidebar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Test from "./component/test/Test";
import QlNhanVien from "./component/pages/QlNhanVien";
import CRUD from "./component/pages/CRUD";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <SideBar />
          <Routes>
            <Route path="/" element={<Navigate to="/nhan-vien" />} />
            <Route path="/home" element={<Test />} />
            <Route path="/about" element={<About id={1} abc={5} />} />
            <Route path="/crud" element={<CRUD />} />
            <Route path="/nhan-vien" element={<QlNhanVien />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
