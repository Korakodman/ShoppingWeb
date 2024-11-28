import { useState } from "react";
import Header from "./Component/Header";
import Cart from "./Component/Cart";
function App() {
  // กรองรายการสินค้าตามคำค้นหา

  return (
    <>
      <Header />

      <main className="flex justify-center">
        <div className="flex justify-center flex-wrap w-[1280px] h-full border-2 border-black">
          <Cart />
        </div>
      </main>
    </>
  );
}

export default App;
