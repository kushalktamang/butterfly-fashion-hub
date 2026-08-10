import { NavLink } from "react-router-dom";
import assets from "../assets/assets.ts";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r border-pink-100">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {/* -------------for adding items-------------- */}
        <NavLink
          to="/add"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <img src={assets.add_icon} alt="Add Icon" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        {/* -------------for listing items------------- */}
        <NavLink
          to="/list"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <img src={assets.order_icon} alt="List Icon" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        {/* -------------for ordering----------- */}
        <NavLink
          to="/orders"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <img src={assets.order_icon} alt="Orders Icon" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
