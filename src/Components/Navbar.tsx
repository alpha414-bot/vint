// Sample React Component for Navbar

import { Link } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";

function Navbar() {
  const [showSideBarMenu, setShowSideBarMenu] = useState<boolean>(false);
  return (
    // Example of using TailwindCSS in the Navbar Component
    <>
      <nav className="flex items-center justify-between bg-gray-800 shadow-md w-full shadow-gray-700/50 px-4 py-2 md:px-10 md:py-3">
        <Link to="/">
          <p>Logo is here</p>
        </Link>
        <div className="flex items-center gap-4">
          <ul className="hidden md:inline-flex items-center space-x-4">
            <li>
              <Link
                to="/about"
                className="underline underline-offset-4 tracking-wide decoration-dotted hover:text-gray-100 font-medium"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="underline underline-offset-4 tracking-wide decoration-dotted hover:text-gray-100 font-medium"
              >
                Sign In/Sign Up
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-x-2">
            {/* Cart viewer */}
            <Button
              custom={true}
              className="relative inline-flex items-center px-1 py-1 rounded-full"
            >
              <svg
                className="w-10 h-10 md:w-8 md:h-8 text-white"
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
              <span className="inline-flex items-center justify-center w-4 h-4 ms-2 absolute top-0 right-0 text-xs font-medium text-gray-800 bg-white rounded-full">
                2
              </span>
            </Button>
            {/* Mobile: Toggle side bar menu */}
            <button
              className="block md:hidden"
              onClick={() => setShowSideBarMenu(!showSideBarMenu)}
            >
              <svg
                className="w-12 h-12 text-rose-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h10"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 right-0 bg-gray-700 bg-opacity-95 w-2/3 h-screen z-50 md:hidden ${
          showSideBarMenu ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-end p-4">
          {/* Close Side bar Menu */}
          <button className="group" onClick={()=>setShowSideBarMenu(false)}>
            <svg
              className="w-10 h-10 text-white group-hover:text-rose-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col items-start gap-7 mt-4">
          <li>
            <Link
              to="/about"
              className="px-4 underline underline-offset-4 tracking-wide decoration-dotted hover:text-gray-100 text-xl font-medium"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="px-4 underline underline-offset-4 tracking-wide decoration-dotted hover:text-gray-100 text-xl font-medium"
            >
              Sign In/Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
