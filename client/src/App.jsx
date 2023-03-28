import Home from "./pages/Home.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage.jsx";
import BillPage from "./pages/BillPage.jsx";
import CustomersPage from "./pages/CustomersPage.jsx";
import StatisticsPage from "./pages/StatisticsPage.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const user = JSON.parse(localStorage.getItem("posAppUser"))
  const cart =useSelector(state => state.cart)
  useEffect(() => {
    localStorage.setItem("posAppCart",JSON.stringify(cart))
    
  }, [cart])
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home />:<Login />} />
          <Route path="/cart" element={user ? <CartPage />:<Login />} />
          <Route path="/bills" element={user ? <BillPage />:<Login />} />
          <Route path="/customers" element={user ? <CustomersPage />:<Login />} />
          <Route path="/statistics" element={user ? <StatisticsPage />:<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={user ?<ProductPage />:<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
