import React, { useState } from "react";

function Header() {
  const [menu, setMenu] = useState(["Shopping", "About", "Amount", "Cart"]);
  return (
    <header className="grid mr-auto font-semibold border-2 p-2 shadow-md text-3xl">
      <div className="p-4 md:max-xl:p-2 ">Home</div>
      <div>
        <ul className="">
          {menu.map((item, i) => (
            <li className="mt-2 hover:bg-blue-300 p-4 rounded-md" key={i}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
