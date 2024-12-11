import React from "react";
import { useState, createContext } from "react";
import Header from "../Component/Header";
import Cart from "../Component/Cart";

export const AppContext = createContext("");

const Context = () => {
  const [Cartcount, SetCartcount] = useState(0);
  const [itemTotal, SetitemTotal] = useState(0);
  const [Select, SetSeletct] = useState([]);
  return (
    <AppContext.Provider
      value={{
        Cartcount,
        SetCartcount,
        itemTotal,
        SetitemTotal,
        Select,
        SetSeletct,
      }}
    >
      <Header />
      <main className="flex justify-center">
        <div className="flex justify-center flex-wrap w-[1280px] h-full border-2 rounded-md border-black m-10 p-4">
          <Cart />
        </div>
      </main>
    </AppContext.Provider>
  );
};
export default Context;