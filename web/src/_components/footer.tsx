import { assets } from "../assets/assets";
import { TbBrandInstagram, TbBrandTiktok, TbBrandWhatsapp, TbMail, TbPhone } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="bg-charcol text-cream">
      <div className="my-10 mt-10 text-sm px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] p-10">
        <div className="flex items-center justify-between">
          <img src={assets.butterfly_logo} alt="logo" className="mb-2 w-37" />
          <div className="px-4">
            <ul className="flex items-center gap-3">
              <li>
                <a
                  href="https://www.tiktok.com/@butterflynivagalli"
                  className="hover:text-[#f268bd] text-cream"
                  target="_blank"
                >
                  <TbBrandTiktok className="h-8 w-8" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/9779817170333"
                  target="_blank"
                  className="hover:text-[#f268bd] text-cream"
                >
                  <TbBrandWhatsapp className="h-8 w-8" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f268bd] text-cream">
                  <TbBrandInstagram className="h-8 w-8" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="text-gray-600 my-6" />

        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr] gap-14">
          <div>
            <p className="text-xl font-medium mb-2">Quick Links</p>
            <ul className="flex flex-col gap-2">
              <NavLink
                className={({ isActive }) =>
                  `text-md underline hover:text-[#f268bd] text-cream ${
                    isActive ? " text-cream font-semibold" : "text-cream"
                  }`
                }
                to="/"
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-md underline hover:text-[#f268bd] text-cream ${
                    isActive ? " text-cream font-semibold" : "text-cream"
                  }`
                }
                to="/collection"
              >
                <li>Collection</li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-md underline hover:text-[#f268bd] text-cream ${
                    isActive ? " text-cream font-semibold" : "text-cream"
                  }`
                }
                to="/exchange-policy"
              >
                <li>Exchange Policy</li>
              </NavLink>
            </ul>
          </div>

          <div>
            <p className="text-xl font-medium mb-2">Contact</p>
            <ul className="flex flex-col gap-2">
              <li>Nivagalli, Pokhara</li>
              <li className="flex items-center space-x-1">
                <TbPhone /> <span>9817170333</span>
              </li>
              <li className="flex items-center space-x-1">
                {" "}
                <TbMail />
                <span>mhdjasim8@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div>
        <hr className="text-gray-800" />
        <p className="py-5 text-sm text-center">
          ©Copyright ButterflyFashion - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
