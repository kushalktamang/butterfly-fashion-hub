import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./_components/navbar";
import FooterSection from "./_components/footer";
import { useEffect } from "react";
import SearchBar from "./_components/searchbar";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return (
    <div>
      <Navbar />
      <SearchBar />
      <Outlet />
      <FooterSection />
    </div>
  );
}
