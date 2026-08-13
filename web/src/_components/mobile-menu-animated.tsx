import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import { assets } from "../assets/assets";

const links = [
  { title: "Home", href: "/" },
  { title: "Collection", href: "/collection" },
  { title: "Exchange Policy", href: "/exchange-policy" },
  { title: "Contact Us", href: "/contact-us" },
  { title: "Instagram", href: "https://www.instagram.com/butterflyfashion.hub/" },
  { title: "TikTok", href: "https://www.tiktok.com/@butterflynivagalli" },
];

interface MobileNavLinkProps {
  title: string;
  href: string;
  onNavigate: () => void;
}

const menuVars: Variants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0, 0.39, 0] as const,
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const containerVars: Variants = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

const linkVars: Variants = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1] as const,
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1] as const,
      duration: 0.7,
    },
  },
};

const MobileNavLink = ({ title, href, onNavigate }: MobileNavLinkProps) => {
  return (
    <motion.div variants={linkVars} className="text-4xl sm:text-5xl uppercase text-charcol">
      <NavLink
        to={href}
        onClick={onNavigate}
        className={({ isActive }) => (isActive ? "text-pink-500 font-semibold" : "text-charcol")}
      >
        {title}
      </NavLink>
    </motion.div>
  );
};

const MobileMenuAnimated = () => {
  const [visible, setVisible] = useState(false);
  const close = () => {
    setVisible(false);
  };

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
      <AnimatePresence>
        {visible && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-cream text-charcol p-10 z-50"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between">
                <Link to={"/"}>
                  <img
                    src={assets.butterfly_logo}
                    alt="butterfly fashion hub logo"
                    aria-label="butterfly fashion hub logo"
                    className="w-40 cursor-pointer"
                  />
                </Link>

                <div
                  className="flex items-center gap-1 cursor-pointer text-pink-500"
                  role="button"
                  aria-label="close mobile menu"
                  onClick={close}
                >
                  <X className="icons text-charcol" />
                </div>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center items-start gap-4"
              >
                {links.map((link) => (
                  <div className="overflow-hidden" key={link.title}>
                    <MobileNavLink title={link.title} href={link.href} onNavigate={close} />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenuAnimated;
