// Sample React Component for Navbar

import { useCartProducts } from "@/Services/Hook";
import { verifyAccount } from "@/Services/Query";
import { auth } from "@/firebase-config";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";
import OutsideClick from "./OutsideClick";

function Navbar() {
  const [showSideBarMenu, setShowSideBarMenu] = useState<boolean>(false);
  const { data: CartProducts } = useCartProducts() as { data: CartMetaItem[] };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const sidebarVariants = {
    closed: { x: "100%", opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      {/* Verification Banner */}
      <AnimatePresence>
        {auth.currentUser &&
          !auth.currentUser?.isAnonymous &&
          !auth.currentUser?.emailVerified && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 relative z-50 text-center space-x-2"
            >
              <span className="text-base font-medium text-white">
                Verify your account to unlock new exciting features
              </span>
              <Button
                onClick={() => {
                  verifyAccount();
                }}
                className="px-4 py-0.5 text-sm bg-white text-red-600 hover:bg-red-50"
              >
                Verify Now
              </Button>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Main Navigation */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-50 glass border-b border-red-200/30 px-3 py-3 md:px-10 md:py-4"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <motion.div variants={itemVariants}>
            <Link to="/" className="flex items-center space-x-2">
              <Logo type="navbar-logo" />
              <span className="text-xl font-bold text-red-600 hidden sm:block">
                Pretium Concept
              </span>
            </Link>
          </motion.div>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <motion.ul
              variants={navVariants}
              className="hidden md:inline-flex items-center space-x-6"
            >
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                ...(auth.currentUser?.uid && !auth.currentUser.isAnonymous
                  ? [{ to: "/user/carts", label: "My Account" }]
                  : [{ to: "/login", label: "Sign In" }]
                ),
                { to: "/privacy-policy", label: "Privacy" },
                // { to: "/refund-policy", label: "Refund Policy" },
                // { to: "/terms-conditions", label: "Terms" },
              ].map((item) => (
                <motion.li key={item.to} variants={itemVariants}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative font-medium text-gray-700 hover:text-red-600 transition-all duration-300 ${isActive ? "text-red-600" : ""
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>

            <div className="flex items-center gap-x-2">
              {/* Cart Icon */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <Link
                  to="/user/carts"
                  className="relative inline-flex items-center p-2 rounded-full glass hover:glass-dark transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6 text-red-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <AnimatePresence>
                    {CartProducts?.length > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full"
                      >
                        {CartProducts?.length}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
                className="block md:hidden p-2 rounded-lg glass hover:glass-dark"
                onClick={() => setShowSideBarMenu(!showSideBarMenu)}
              >
                <motion.svg
                  animate={{ rotate: showSideBarMenu ? 90 : 0 }}
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </motion.svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {showSideBarMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 z-40 md:hidden"
                onClick={() => setShowSideBarMenu(false)}
              />
              <motion.div
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed top-0 right-0 h-full w-80 glass-dark z-50 md:hidden"
              >
                <OutsideClick
                  outsideClick={() => setShowSideBarMenu(false)}
                  className="h-full"
                >
                  <div className="flex items-center justify-between p-6 border-b border-red-200">
                    <h2 className="text-xl font-bold text-red-600">Menu</h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowSideBarMenu(false)}
                      className="p-2 rounded-full hover:bg-red-100"
                    >
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  </div>

                  <motion.ul
                    className="flex flex-col space-y-2 p-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {[
                      { to: "/", label: "Home" },
                      { to: "/about", label: "About" },
                      ...(auth.currentUser?.uid && !auth.currentUser.isAnonymous
                        ? [{ to: "/user/carts", label: "My Account" }]
                        : [{ to: "/login", label: "Sign In" }]
                      ),
                      { to: "/privacy-policy", label: "Privacy Policy" },
                      { to: "/refund-policy", label: "Refund Policy" },
                      { to: "/terms-conditions", label: "Terms & Conditions" },
                    ].map((item) => (
                      <motion.li
                        key={item.to}
                        variants={{
                          hidden: { x: 50, opacity: 0 },
                          visible: { x: 0, opacity: 1 }
                        }}
                      >
                        <NavLink
                          to={item.to}
                          onClick={() => setShowSideBarMenu(false)}
                          className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive
                              ? "bg-red-100 text-red-700 border-l-4 border-red-600"
                              : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </motion.li>
                    ))}
                  </motion.ul>
                </OutsideClick>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

export default Navbar;
