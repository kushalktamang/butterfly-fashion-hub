import { useEffect, useState } from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { Outlet } from "react-router-dom";

export default function App() {
  const [token, setToken] = useState<string>(() => localStorage.getItem("token") ?? "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div className="bg-cream min-h-screen shadow">
      <Navbar setToken={setToken} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 text-gray-700 text-base">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
