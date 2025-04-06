import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import DishDetails from "./pages/DishDetails.tsx";
import { Root } from "./components/Root.tsx";
import Register from "./pages/Register.tsx";
import Checkout from "./pages/Checkout.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          {" "}
          <Route index element={<Home />} />
          <Route path="/dishes/:id" element={<DishDetails id={""} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
