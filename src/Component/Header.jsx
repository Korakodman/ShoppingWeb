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
      <div className="p-2 md:ml-10 ml-0">
        <h2 className="cursor-pointer">Home</h2>
      </div>

      <div>
        <ul className="flex gap-x-2 text-2xl ">
          <li className="Navbar">Your Account</li>
          <button
            className="Navbar justify-center flex "
            onClick={() => OpendialogTotal()}
          >
            <FaCartShopping className=" w-10 mt-1" /> {Cartcount}
          </button>
        </ul>
        <dialog
          className=" md:w-fit md:h-fit  w-[420px]  p-4 rounded-md"
          ref={dialogTotal}
          onClick={Clickclose}
        >
          <div className="p-2 text-lg">
            สินค้าทั้งหมด : {Cartcount}
            <br></br>
            ราคารวม : {convertToBaht(itemTotal)} บาท
            <div className=" text-red-500"> {Cartcount ? "" : emptyCart}</div>
          </div>

          <div>
            {Select.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" md:flex grid border border-black m-2"
                >
                  <div className="flex">
                    <img
                      src={item.image}
                      className=" md:w-[125px] md:h-[125px] w-[100px] h-[100px] p-2"
                    ></img>
                    <div className="p-2">
                      <p className=" overflow-hidden whitespace-nowrap   text-ellipsis  md:w-[250px] w-[150px] text-base md:text-lg">
                        {item.title}
                      </p>
                      <p className="text-xl md:text-xl">
                        {convertToBaht(item.price)} บาท
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => DeleteButton(item)}
                      className=" text-lg  bg-red-200 hover:bg-red-500 md:mt-16 mt-0 mr-2 px-4 mb-2 py-2 md:mr-2 rounded-md"
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
