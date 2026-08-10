import assets from "../assets/assets.ts";

export interface NavbarProps {
  setToken: (token: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.butterfly_logo} alt="store_logo" className="w-45" />
      <button
        onClick={() => {
          setToken("");
        }}
        className="bg-charcol hover:bg-pink-500 text-b text-cream font-bold px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xl sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
