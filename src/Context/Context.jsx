import React from "react";
import { useState, createContext } from "react";
import Header from "../Component/Header";
import Cart from "../Component/Cart";

export const AppContext = createContext("");

const Context = () => {
  const [Cartcount, SetCartcount] = useState(0);
  const [itemTotal, SetitemTotal] = useState(0);
  const [Select, SetSelect] = useState([]);
  const [items, setItems] = useState([]);
  return (
    <AppContext.Provider
      value={{
        Cartcount,
        SetCartcount,
        itemTotal,
        SetitemTotal,
        Select,
        SetSelect,
        items,
        setItems,
      }}
    >
      <Header />
      <main className="flex justify-center">
        <div className="grid justify-center flex-wrap  md:w-[1280px] h-full border-2 rounded-md border-black md:m-10 m-2 md:p-4 p-2">
          <Cart />
        </div>
      </main>
    </AppContext.Provider>
  );
};
export default Context;
