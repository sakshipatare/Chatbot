import React from 'react';
import { NavLink } from 'react-router-dom';
// import { CreditCard } from 'lucide-react';

function Navbar() {
  return (
    <>
      <nav className="bg-blue-50 shadow-md border-b border-gray-300 px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2 ml-10">
          <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 text-blue-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3h9m-9 3h5.25M21 12c0 4.97-4.03 9-9 9-1.19 0-2.33-.23-3.38-.65L3 21l1.65-5.62A8.964 8.964 0 0 1 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9Z"
        />
      </svg>
          <span className="text-lg font-semibold text-gray-800">CHATBOT</span>
        </div>

        {/* Center: Navigation Links */}
        <ul className="flex space-x-8">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `text-blue-600 font-semibold  transition duration-200 hover:text-blue-900 ${
                  isActive ? 'border-b-4 border-blue-600 pb-1 hover:border-blue-900' : ''
                }`
              }
            >
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/chatbot"
              className={({ isActive }) =>
                `text-blue-600 font-semibold  transition duration-200 hover:text-blue-900 ${
                  isActive ? 'border-b-4 border-blue-600 pb-1 hover:border-blue-900' : ''
                }`
              }
            >
              Chatbot
            </NavLink>
          </li>
        </ul>

        {/* Right: Sign Out Button */}
        <div>
          <NavLink
            to="/"
            className="bg-blue-600 text-white font-semibold px-4 py-1.5 rounded hover:bg-blue-700 transition duration-200 mr-10"
          >
            Sign Out
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
