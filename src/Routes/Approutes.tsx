import CartPage from "@/Pages/CartPage";
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

        

      </Routes>
    );
};

export default AppRoutes;