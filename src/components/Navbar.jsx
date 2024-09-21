import React from "react";
import logo from '../assets/logo.webp';


const Navbar = () => {
  return (
    <div>
      <nav className="bg-purple-500 text-white flex justify-around w-full">

        <div className="logo p-5 font-bold text-xl flex gap-3">

          <div className="logo w-7 h-7">
            <img src={logo} alt="" />
          </div>

          <span>MyTask</span>
        </div>

        <ul className="flex justify-center gap-10 font-semibold">
          <li className="hover:bg-purple-800 p-5 cursor-pointer">Home</li>
          <li className="hover:bg-purple-800 p-5 cursor-pointer">About</li>
          <li className="hover:bg-purple-800 p-5 cursor-pointer">Tasks</li>
          <li className="hover:bg-purple-800 p-5 cursor-pointer">Help</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
