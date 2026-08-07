import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import { useEffect } from "react";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
