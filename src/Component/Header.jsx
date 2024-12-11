import React, { useContext } from "react";
import { AppContext } from "../Context/Context";

function Header() {
  const { Cartcount, SetCartcount } = useContext(AppContext);

  return (
    <header className="flex mr-auto font-semibold border-2 p-2 shadow-md text-2xl items-center justify-between">
      <div className="p-2 ml-10">
        <h2 className="cursor-pointer">Home test</h2>
      </div>

      <div>
        <ul className="flex gap-x-2">
          <li className="Navbar">Your Account</li>
          <li className="Navbar">Cart {Cartcount}</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
