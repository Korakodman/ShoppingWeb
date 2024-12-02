import React, { useState, useEffect } from "react";
import axios from "axios";

function Cart() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]); // สร้าง state สำหรับเก็บข้อมูลสินค้า
  const [loading, setLoading] = useState(true); // สถานะการโหลดข้อมูล

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
      {loading && <p>Loading...</p>}

      {/* แสดงรายการสินค้าหลังจากกรอง */}
      {!loading &&
        filteredPictures.map((item) => (
          <div
            key={item.id}
            className="image border-2 w-[300px] h-[360px] mx-2 mt-4 shadow-md bg-gray-200 p-2 "
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[200px] object-fill mt-4"
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
                >
                  Click More Info
                </button>
              </div>
            </div>
          </div>
        ))}

      {/* แสดงข้อความหากไม่มีสินค้าตรงกับคำค้นหา */}
      {!loading && filteredPictures.length === 0 && <p>No items found.</p>}
    </>
  );
}

export default Cart;
