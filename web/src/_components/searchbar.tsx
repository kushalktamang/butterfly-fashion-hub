import { TbSearch, TbX } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { useShopContext } from "../hooks/use-shop-context";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useShopContext();
  const location = useLocation();

  if (location.pathname !== "/collection" || !showSearch) {
    return null;
  }

  return (
    <div className="bg-cream border-pink-100 px-4 sm:px-8 py-3">
      <div className="max-w-3xl mx-auto flex items-center gap-2 bg-white border border-pink-200 rounded-full px-3 sm:px-4 py-2">
        <TbSearch className="w-5 h-5 text-pink-500 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search products..."
          className="w-full bg-transparent outline-none text-sm sm:text-base text-gray-700 placeholder:text-gray-400"
        />
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setShowSearch(false);
          }}
          className="shrink-0 text-gray-600 hover:text-pink-600"
          aria-label="Close search"
        >
          <TbX className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
