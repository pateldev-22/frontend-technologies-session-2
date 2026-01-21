import CartPage from "@/Pages/CartPage";
import Checkout from "@/Pages/Checkout";
import HomePage from "@/Pages/HomePage";
import { Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/cart"
        element={
          <CartPage />
        }
      />
      <Route
        path="/"
        element={
            <HomePage />
        }
        />

        <Route
        path="/checkout-page"
        element={
            <Checkout />
        }
        />
        

      </Routes>
    );
};

export default AppRoutes;