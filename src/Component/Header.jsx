import React, { useContext, useRef } from "react";
import { AppContext } from "../Context/Context";

function Header() {
  const { Cartcount, SetCartcount } = useContext(AppContext);
  const { itemTotal, SetitemTotal } = useContext(AppContext);
  const { Select, SetSeletct } = useContext(AppContext);
  const dialogTotal = useRef();
  const OpendialogTotal = () => {
    dialogTotal.current.showModal();
  };
  const CloseModal = () => {
    dialogTotal.current.close();
  };
  const Clickclose = (e) => {
    if (e.target === dialogTotal.current) {
      CloseModal();
    }
  };
  const convertToBaht = (usd) => {
    const exchangeRate = 35; // อัตราแลกเปลี่ยน (USD -> THB)
    const baht = usd * exchangeRate;
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(baht);
  };
  let emptyCart = "Nothing Here Go Shopping";
  return (
    <header className=" top-0 sticky flex mr-auto font-semibold border-2 p-2 shadow-md text-2xl items-center justify-between bg-[#50ADBF]">
      <div className="p-2 ml-10">
        <h2 className="cursor-pointer">Home</h2>
      </div>

      <div>
        <ul className="flex gap-x-2">
          <li className="Navbar">Your Account</li>
          <button className="Navbar" onClick={() => OpendialogTotal()}>
            Cart {Cartcount}
          </button>
        </ul>
        <dialog
          className=" w-fit h-fit p-4 rounded-md"
          ref={dialogTotal}
          onClick={Clickclose}
        >
          <div className="p-2">
            Total : {Cartcount}
            <br></br>
            Amount : {convertToBaht(itemTotal)} Bath
            <div className=" text-red-500"> {Cartcount ? "" : emptyCart}</div>
          </div>

          <div>
            {Select.map((item, index) => {
              return (
                <div key={index} className="flex border border-black m-2">
                  <div>
                    <img
                      src={item.image}
                      className=" w-[125px] h-[125px] p-2"
                    ></img>
                  </div>
                  <div className="p-2">
                    <p className=" overflow-hidden whitespace-nowrap  text-ellipsis w-[250px] ">
                      {item.title}
                    </p>
                    <p>{convertToBaht(item.price)} Bath</p>
                  </div>
                </div>
              );
            })}
          </div>
        </dialog>
      </div>
    </header>
  );
}

export default Header;
