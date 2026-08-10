import { useEffect, useState } from "react";
import Navbar from "./_components/navbar";

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
    <div>
      <Navbar setToken={setToken} />
    </div>
  );
}
