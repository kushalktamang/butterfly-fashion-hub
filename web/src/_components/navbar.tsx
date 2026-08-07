import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { assets } from "../assets/assets";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    console.log({ current, previous });
    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      animate={{
        y: hidden ? -140 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-0 z-50 p-2 bg-cream"
    >
      <nav className="sticky z-50 p-4 sm:px-6 h-16 flex items-center justify-between text-charcol">
        {/* butterfly fashion hub official logo */}
        <Link to={"/"}>
          <img
            src={assets.logo}
            alt="butterfly fashion hub logo"
            aria-label="butterfly fashion hub logo"
            className="w-40 cursor-pointer"
          />
        </Link>

        {/* navbar navlinks to navigate */}
        <ul className="nav-links">
          <li>
            <NavLink to={"/"} className="nav-li">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to={"/collection"} className="nav-li">
              Collection
            </NavLink>
          </li>

          <li>
            <NavLink to={"/exchange-policy"} className="nav-li">
              Exchange Policy
            </NavLink>
          </li>

          <li>
            <NavLink to={"/contact-us"} className="nav-li">
              Contact Us
            </NavLink>
          </li>
        </ul>

        {/* clickable icons */}
        <div className="flex gap-2 mr-5">
          {/* search icons for easy searcing */}
          <Search
            className="icons"
            role="button"
            aria-label="for searching products"
            // onClick={handleSearchClick}
          />

          {/* cart icons for the page cart */}
          <NavLink to={"/cart"} className="relative">
            <ShoppingCart className="icons" role="button" aria-label="cart items" />
            {/*{cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 min-w-5 h-5 px-1 rounded-full bg-pink-500 text-white text-[11px] leading-5 text-center font-semibold">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}*/}
          </NavLink>

          <MobileMenu />
        </div>
      </nav>
    </motion.div>
  );
}
