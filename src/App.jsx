import { useState } from "react";
function App() {
  const [menu, setmenu] = useState(["Shopping", "About", "Amount", "Cart"]);
  const [picture, Setpicture] = useState([
    {
      name: "Pen",
      ul: "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      amount: Math.floor(Math.random() * 999),
    },
    {
      name: "Pen",
      ul: "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      amount: Math.floor(Math.random() * 999),
    },
    {
      name: "Pen",
      ul: "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      amount: Math.floor(Math.random() * 999),
    },
    {
      name: "Pen",
      ul: "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      amount: Math.floor(Math.random() * 999),
    },
    {
      name: "Pen",
      ul: "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      amount: Math.floor(Math.random() * 999),
    },
    {
      name: "Pen",
      ul: "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      amount: Math.floor(Math.random() * 999),
    },
  ]);
  return (
    <>
      <header className="grid mr-auto  font-semibold border-2 p-2 shadow-md text-3xl">
        <div className="p-4 md:max-xl:p-2 ">Home</div>
        <div>
          <ul className="">
            {menu.map((item, i) => {
              return (
                <li className="mt-2 hover:bg-blue-300 p-4 rounded-md " key={i}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </header>
      <main className=" flex justify-center">
        <div className="flex justify-center flex-wrap w-[1280px] h-full border-2 border-black">
          {picture.map((photo, i) => {
            return (
              <div
                key={i}
                className=" image border-2 w-[200px] h-[260px] mx-2 mt-4 shadow-md bg-gray-200 p-2"
              >
                <img src={photo.ul} className=""></img>
                <div className="p-2">
                  <div className=" flex p-2 content-center">
                    <h2 className="text-xl">{photo.name}</h2>
                    <h4 className="text-lg flex ml-5 text-blue-400">
                      ${photo.amount} Bath
                    </h4>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="bg-orange-300 p-2 w-[100%] hover:bg-orange-500"
                    >
                      Add Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
