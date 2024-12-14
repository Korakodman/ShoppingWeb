import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../Context/Context";
import { FaCartShopping } from "react-icons/fa6";

function Header() {
  const { Cartcount, SetCartcount } = useContext(AppContext);
  const { itemTotal, SetitemTotal } = useContext(AppContext);
  const { Select, SetSelect } = useContext(AppContext);
  const { items, setItems } = useContext(AppContext);
  const [Delete, setDelete] = useState();

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
  let emptyCart = "ไม่มีสินค้าในตะกร้า กรุณาเลือกซื้อสินค้า";
  const DeleteButton = (itemToDelete) => {
    if (!itemToDelete) return;
    const itemIndex = Select.findIndex((item) => item.id === itemToDelete.id);
    if (itemIndex === -1) {
      return;
    }
    // ลบสินค้าที่เลือกออกจาก Select
    const updatedItems = [...Select];
    updatedItems.splice(itemIndex, 1);
    SetSelect(updatedItems);

    // อัปเดตจำนวนสินค้าและราคารวม
    SetCartcount((prevCount) => Math.max(prevCount - 1, 0));
    SetitemTotal((prevTotal) => Math.max(prevTotal - itemToDelete.price, 0));
  };
  return (
    <header className=" top-0 sticky flex mr-auto font-semibold border-2 p-4 shadow-md text-2xl items-center justify-between bg-[#50ADBF]">
      <div className="p-2 ml-10">
        <h2 className="cursor-pointer">Home</h2>
      </div>

      <div>
        <ul className="flex gap-x-2">
          <li className="Navbar">Your Account</li>
          <button
            className="Navbar justify-center flex "
            onClick={() => OpendialogTotal()}
          >
            <FaCartShopping className=" w-10 mt-1" /> {Cartcount}
          </button>
        </ul>
        <dialog
          className=" w-fit h-fit p-4 rounded-md"
          ref={dialogTotal}
          onClick={Clickclose}
        >
          <div className="p-2">
            สินค้าทั้งหมด : {Cartcount}
            <br></br>
            ราคารวม : {convertToBaht(itemTotal)} บาท
            <div className=" text-red-500"> {Cartcount ? "" : emptyCart}</div>
          </div>

          <div>
            {Select.map((item, index) => {
              return (
                <div key={index} className=" flex border border-black m-2">
                  <div className="flex">
                    <img
                      src={item.image}
                      className=" w-[125px] h-[125px] p-2"
                    ></img>
                    <div className="p-2">
                      <p className=" overflow-hidden whitespace-nowrap  text-ellipsis w-[250px] ">
                        {item.title}
                      </p>
                      <p>{convertToBaht(item.price)} บาท</p>
                    </div>
                  </div>

                  <div className="">
                    <button
                      onClick={() => DeleteButton(item)}
                      className=" text-lg  bg-red-200 hover:bg-red-500 mt-16 px-4 py-2 mr-2 rounded-md"
                    >
                      ลบ
                    </button>
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
