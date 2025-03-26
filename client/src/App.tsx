import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import DishDetails from "./pages/DishDetails.tsx";
import { Root } from "./components/Root.tsx";
//import About from './pages/About';
//import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          {" "}
          <Route index element={<Home />} />
          <Route path="/dishes/:id" element={<DishDetails id={""} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
