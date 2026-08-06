import { Outlet } from "react-router-dom";
import Navbar from "./_components/navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
