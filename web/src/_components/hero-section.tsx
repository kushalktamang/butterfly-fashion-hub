import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <>
      <section className="flex flex-col-reverse sm:flex-row ">
        {/* left side of the hero section */}
        <div className="w-full sm:1/2 flex items-center justify-center py-10 sm:py-0">
          <div className="text-charcol">
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-0.5 bg-pink-500"></p>
              <p className="font-medium text-sm sm:text-base">
                OUR BESTSELLERS
              </p>
            </div>
            <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">
              Latest Arrivals
            </h1>
            <div className="flex items-center gap-2">
              <NavLink to={"/collection"}>
                <p className="font-medium text-sm sm:text-base">SHOP NOW</p>
              </NavLink>
              <p className="w-8 md:w-11 h-0.5 bg-pink-500"></p>
            </div>
          </div>
        </div>

        {/* right side of the hero section */}
        <img src={assets.hero_img} className="w-full sm:w-1/2" />
      </section>
    </>
  );
};

export default Hero;