import { useState } from "react";
function App() {
  const [menu, setmenu] = useState(["Shopping", "About", "Amount", "Cart"]);
  const [picture, Setpicture] = useState([
    "Shopping",
    "About",
    "Amount",
    "Cart",
    "Test",
  ]);
  return (
    <>
      <header className="flex gap-x-10 border-2 p-2 shadow-md md:max-xl:grid sm:max-md:grid  sm:text-3xl ">
        <div className="p-2 md:max-xl:p-2 ">Home</div>
        <div>
          <ul className=" flex md:max-xl:grid sm:max-md:grid">
            {menu.map((item, i) => {
              return (
                <li className="mt-2 hover:bg-blue-300 p-2" key={i}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </header>
      <main>
        <div className="flex justify-center">
          {picture.map((photo, i) => {
            return (
              <div
                key={i}
                className=" image border-2 w-[140px] h-[140px] mx-2 mt-4"
              >
                {photo}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
