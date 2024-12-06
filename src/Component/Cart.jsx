import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context/Context";

function Cart() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]); // สร้าง state สำหรับเก็บข้อมูลสินค้า
  const [loading, setLoading] = useState(true); // สถานะการโหลดข้อมูล
  const { Cartcount, SetCartcount } = useContext(AppContext);
  const dialog = useRef();
  const [image, SetImage] = useState();
  const [Name, SetName] = useState();
  const [Price, SetPrice] = useState();

  const CloseModal = () => {
    dialog.current.close();
  };
  const Clickclose = (e) => {
    if (e.target === dialog.current) {
      CloseModal();
    }
  };
  const AddCartForm = (e) => {
    e.preventDefault();
  };
  const AddCart = () => {
    SetCartcount((prev) => parseInt(prev) + 1);
    CloseModal();
  };
  // ดึงข้อมูลจาก API
  useEffect(() => {
    axios("https://fakestoreapi.com/products?limit=20")
      .then((res) => {
        setItems(res.data); // บันทึกข้อมูลสินค้าใน state
        setLoading(false); // หยุดสถานะการโหลด
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false); // หยุดสถานะการโหลดเมื่อเกิดข้อผิดพลาด
      });
  }, []); // เรียก API ครั้งเดียวตอนโหลดคอมโพเนนต์

  // กรองข้อมูลสินค้าตามคำค้นหา
  const filteredPictures = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  const Modal = (item) => {
    dialog.current.showModal();
    SetImage(item.image);
    SetName(item.title);
    SetPrice(item.price);
  };
  return (
    <>
      {/* แบบฟอร์มค้นหา */}
      <div className="container flex justify-center mt-4">
        <form>
          <label className="p-2 font-semibold text-2xl">Search</label>
          <input
            type="search"
            className="border border-2 focus:outline-none px-2 py-3 w-[300px] text-lg"
            placeholder="Search Something You Want"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // อัปเดตค่า search
          />
        </form>
      </div>

      {/* แสดงสถานะการโหลด */}
      {loading && <p className=" text-2xl mt-10">Loading...</p>}

      {/* แสดงรายการสินค้าหลังจากกรอง */}
      {!loading &&
        filteredPictures.map((item) => (
          <div
            key={item.id}
            className="image border-2 w-[200px] h-[360px] mx-2 mt-4 shadow-md bg-gray-200 p-2 "
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[170px] object-fill mt-4 cursor-pointer"
            />
            <div className="p-2">
              <div className="flex px-2 py-4 content-center">
                <h2 className="text-xl text-ellipsis overflow-hidden whitespace-nowrap">
                  {item.title}
                </h2>
                <h4 className="text-lg flex ml-5 text-blue-400">
                  ${item.price}
                </h4>
              </div>
              <div>
                <button
                  type="button"
                  className="bg-orange-300 p-2 w-[100%] hover:bg-orange-500 shadow-md"
                  onClick={() => Modal(item)}
                >
                  Click More Info
                </button>
              </div>
            </div>
            <dialog
              ref={dialog}
              onClick={Clickclose}
              className=" w-[750px] h-[300px] p-3 rounded-md  "
            >
              <form
                action=""
                onSubmit={AddCartForm}
                className=" items-center flex"
              >
                <div>
                  <img
                    src={image}
                    className=" w-[250px] h-[250px] border-2 object-fill rounded-md"
                  ></img>
                </div>
                <div className="p-2 border-black border-4 w-[500px] m-4 grid rounded-md">
                  <div className=" p-2">
                    <header className=" font-extralight text-3xl">
                      {Name}
                    </header>
                    <p className=" font-semibold text-2xl mt-2 text-end">
                      Price : <span className=" text-red-500">{Price} </span>
                      Bath
                    </p>
                  </div>
                  <div className=" text-end mt-2 text-xl">
                    <button
                      className=" bg-blue-300 p-2 font-semibold hover:bg-blue-500 rounded-sm"
                      onClick={AddCart}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </form>
            </dialog>
          </div>
        ))}

      {/* แสดงข้อความหากไม่มีสินค้าตรงกับคำค้นหา */}
      {!loading && filteredPictures.length === 0 && <p>No items found.</p>}
    </>
  );
}

export default Cart;
