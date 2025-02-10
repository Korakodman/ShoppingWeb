import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context/Context";
import Dialog from "./Dialog";

function Cart() {
  const [search, setSearch] = useState("");
  const { items, setItems } = useContext(AppContext); // สร้าง state สำหรับเก็บข้อมูลสินค้า
  const [loading, setLoading] = useState(true); // สถานะการโหลดข้อมูล
  const { Cartcount, SetCartcount } = useContext(AppContext);
  const { itemTotal, SetitemTotal } = useContext(AppContext);
  const { Select, SetSelect } = useContext(AppContext);
  const [selectedItem, SetSelectedItem] = useState(null);

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
  const AddCart = (item) => {
    SetitemTotal((prevTotal) => prevTotal + item.price);
    SetCartcount((prevcount) => prevcount + 1);
    SetSelect((prevSelect) => [...prevSelect, item]);
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
    if (dialog.current) {
      dialog.current.showModal();

      SetImage(item.image);
      SetName(item.title);
      SetPrice(item.price);
      SetSelectedItem(item);
    } else {
      console.error();
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

  return (
    <>
      {/* แบบฟอร์มค้นหา */}
      <div>
        <div className="container flex justify-center mt-4">
          <form>
            <label className="p-2 font-semibold text-2xl">ค้นหา</label>
            <input
              type="search"
              className="border border-2 focus:outline-none px-2 py-3 md:w-[300px] text-lg"
              placeholder="ค้นหาสินค้า"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // อัปเดตค่า search
            />
          </form>
        </div>
      </div>

      {/* แสดงสถานะการโหลด */}
      {loading && <p className=" text-2xl mt-10">Loading...</p>}

      {/* แสดงรายการสินค้าหลังจากกรอง */}
      <div className=" grid grid-cols-3 md:flex justify-center flex-wrap">
        {!loading &&
          filteredPictures.map((item) => (
            <div
              key={item.id}
              className="image border-2 md:w-[200px] md:h-[360px] w-[100px]  mx-2 mt-4 shadow-md bg-gray-200 md:p-2 p-1 "
            >
              <img
                src={item.image}
                alt={item.title}
                className="md:w-full md:h-[170px] w-[80px] h-[80px] object-fill mt-4 cursor-pointer"
              />
              <div className="p-2">
                <div className=" grid px-2 py-4 content-center">
                  <h2 className="md:text-xl text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.title}
                  </h2>
                  <h4 className="md:text-base text-xs flex mt-1 text-blue-400">
                    {convertToBaht(item.price)} บาท
                  </h4>
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-orange-300 p-2 md:w-[100%] w-[80px] text-sm hover:bg-orange-500 shadow-md"
                    onClick={() => Modal(item)}
                  >
                    ดูข้อมูลเพิ่มเติม
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Dialog
        ref={dialog}
        Clickclose={Clickclose}
        AddCartForm={AddCartForm}
        image={image}
        Name={Name}
        Price={Price}
        AddCart={() => AddCart(selectedItem)}
      />
      {/* แสดงข้อความหากไม่มีสินค้าตรงกับคำค้นหา */}
      {!loading && filteredPictures.length === 0 && (
        <p className=" text-xl mt-2">ไม่มีสินค้าที่คุณต้องการ</p>
      )}
    </>
  );
}

export default Cart;
