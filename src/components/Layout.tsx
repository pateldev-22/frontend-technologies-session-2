import { Outlet } from "react-router-dom";
import Navbar from "./navbar"

export function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>Footer Content</footer>
    </div>
  );
}