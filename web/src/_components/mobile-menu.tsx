import { ArrowLeft, Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const MobileMenu = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Menu
        className="md:hidden w-8 h-8 sm:w-7 md:w-7 lg:w-7 cursor-pointer text-gray-700"
        role="button"
        aria-label="mobiel menu"
        onClick={() => {
          setVisible(true);
        }}
      />

      {visible && (
        <div
          className="fixed inset-0 z-40 lg:hidden transition-opacity duration-300"
          role="button"
          aria-label="closing mobile menu"
          onClick={() => {
            setVisible(false);
          }}
        >
          {/* sidebar for smaller screens */}
          <div
            className={`fixed lg:hidden top-0 right-0 bottom-0 w-3/4 bg-white z-50 transform transition-transform duration-500 ease-in-out`}
          >
            <div className="flex flex-col text-gray-700">
              {/* icon for the back button */}
              <div
                className="flex items-center gap-1 p-3 cursor-pointer"
                role="button"
                aria-label="close mobile menu"
                onClick={() => {
                  setVisible(false);
                }}
              >
                <ArrowLeft className="icons text-pink-500" />
                <p className="text-pink-500">Back</p>
              </div>

              {/* navlinks for mobile version or menu */}
              <NavLink
                to={"/"}
                onClick={() => {
                  setVisible(false);
                }}
                className={({ isActive }) =>
                  ` py-1 pl-9  text-lg ${isActive ? " text-gray-700 font-semibold" : "text-gray-700"}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/collection"}
                onClick={() => {
                  setVisible(false);
                }}
                className={({ isActive }) =>
                  ` py-1 pl-9  text-lg ${isActive ? " text-gray-700 font-semibold" : "text-gray-700"}`
                }
              >
                Collection
              </NavLink>
              <NavLink
                to={"/exchange-policy"}
                onClick={() => {
                  setVisible(false);
                }}
                className={({ isActive }) =>
                  ` py-1 pl-9 text-lg ${isActive ? " text-gray-700 font-semibold" : "text-gray-700"}`
                }
              >
                Exchange Policy
              </NavLink>
              <NavLink
                to={"/contact-us"}
                onClick={() => {
                  setVisible(false);
                }}
                className={({ isActive }) =>
                  ` py-1 pl-9 text-lg ${isActive ? " text-gray-700 font-semibold" : "text-gray-700"}`
                }
              >
                Contact Us
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
