// Sample React Component for Navbar

import { Link } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  return (
    // Example of using TailwindCSS in the Navbar Component
    <nav className="flex items-center justify-between bg-gray-800 shadow-md w-full shadow-gray-700/50 px-10 py-3">
      <Link to="/">
        <p>Logo is here</p>
      </Link>
      <div className="flex items-center gap-4">
        <ul className="inline-flex items-center space-x-4">
          <li className="hover:text-gray-100 font-medium">About</li>
          <li>
            <Link to="/login" className="underline underline-offset-4 tracking-wide decoration-dotted">Sign In/Sign Up</Link>
          </li>
        </ul>
        <div>
          <Button
            custom={true}
            className="relative inline-flex items-center px-1 py-1 rounded-full"
          >
            <svg
              className="w-7 h-7 text-gray-800 dark:text-white"
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
            <span className="inline-flex items-center justify-center w-4 h-4 ms-2 absolute top-0 -right-1 text-xs font-medium text-blue-800 bg-blue-200 rounded-full">
              2
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
